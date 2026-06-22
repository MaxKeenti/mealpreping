import { mealPrepData } from '$lib/data';
import type {
	Appliance,
	Meal,
	MealPrepData,
	MealType,
	PlanFallback,
	PlannedMeal,
	UserProfile,
	WeeklyPlan
} from '$lib/data';
import { calculatePortionScale } from './portions';
import { isGeneratedSnack } from './snacks';
import { calculateNutritionTargets } from './targets';
import { getFood, getMeal, nutritionForMeal, rawFoodAmountsForMeal } from './units';

export interface GeneratePlanOptions {
	seed?: number;
	generatedAt?: string;
	calorieBump?: number;
	data?: MealPrepData;
	dislikedFoodIds?: string[];
	maxPrepMinutes?: number;
	microwaveOnly?: boolean;
	leftoversMode?: boolean;
}

interface GeneratorConstraints {
	dislikedFoodIds: string[];
	maxPrepMinutes?: number;
	microwaveOnly: boolean;
	leftoversMode: boolean;
	weekdayAppliances: Appliance[];
}

interface MealChoice {
	meal?: Meal;
	isFallback: boolean;
	reason?: string;
}

const defaultPrepOrderByBudget: Record<UserProfile['budgetDial'], string[]> = {
	tight: [
		'cooked-rice',
		'cooked-lentils',
		'cooked-black-beans',
		'roasted-chicken',
		'roasted-potatoes',
		'salsa-roja',
		'chipotle-crema',
		'boiled-eggs'
	],
	normal: [
		'cooked-rice',
		'cooked-lentils',
		'roasted-chicken',
		'roasted-potatoes',
		'salsa-roja',
		'chipotle-crema',
		'cooked-black-beans',
		'boiled-eggs'
	],
	comfortable: [
		'cooked-rice',
		'roasted-chicken',
		'roasted-potatoes',
		'cooked-lentils',
		'salsa-roja',
		'chipotle-crema',
		'cooked-black-beans',
		'boiled-eggs'
	]
};

export function generateWeeklyPlan(profile: UserProfile, options: GeneratePlanOptions = {}): WeeklyPlan {
	const data = options.data ?? mealPrepData;
	const seed = options.seed ?? Date.now();
	const targets = calculateNutritionTargets(profile, { calorieBump: options.calorieBump });
	const constraints = normalizeConstraints(profile, options);
	const prepSet = selectPrepSet(profile, data, {
		dislikedFoodIds: constraints.dislikedFoodIds,
		maxPrepMinutes: constraints.maxPrepMinutes
	});
	const mealSlots = slotsForProfile(profile);
	const rng = createSeededRandom(seed);
	const placement = placeMeals(profile, data, prepSet, mealSlots, rng, constraints);
	const baseMeals = placement.meals;
	const averageDailyCalories = averageDailyNutrition(data, baseMeals).calories;
	const portionMultiplier = calculatePortionScale({ calories: averageDailyCalories }, targets) * profile.portionMultiplier;

	const meals = baseMeals.map((meal) => {
		const template = getMeal(data, meal.mealId);
		const nutrition = nutritionForMeal(data, template, portionMultiplier);

		return {
			...meal,
			portionMultiplier: roundMultiplier(portionMultiplier),
			calories: nutrition.calories,
			protein: nutrition.protein
		};
	});

	return {
		seed,
		generatedAt: options.generatedAt ?? new Date().toISOString(),
		prepSet,
		meals,
		targets,
		fallbacks: placement.fallbacks
	};
}

export function selectPrepSet(
	profile: UserProfile,
	data: MealPrepData = mealPrepData,
	options: Pick<GeneratePlanOptions, 'dislikedFoodIds' | 'maxPrepMinutes'> = {}
): string[] {
	const availableAppliances = new Set(profile.weekendAppliances);
	const dislikedFoodIds = new Set(options.dislikedFoodIds ?? profile.dislikedFoodIds ?? []);
	const availablePrepIds = new Set(
		data.prepComponents
			.filter((component) => availableAppliances.has(component.appliance))
			.filter((component) => ![...dislikedFoodIds].some((foodId) => prepUsesFood(component, foodId)))
			.map((component) => component.id)
	);

	const prepSet = defaultPrepOrderByBudget[profile.budgetDial].filter((prepId) => availablePrepIds.has(prepId));
	const maxPrepMinutes = options.maxPrepMinutes ?? profile.maxPrepMinutes;

	if (maxPrepMinutes == null || maxPrepMinutes < 0) {
		return prepSet;
	}

	while (prepSetMinutes(prepSet, data) > maxPrepMinutes && prepSet.length > 0) {
		prepSet.pop();
	}

	return prepSet;
}

export function slotsForProfile(profile: Pick<UserProfile, 'mealsPerDay' | 'includeSnacks' | 'goal'>): MealType[] {
	const mealSlots: MealType[] = ['breakfast', 'lunch', 'dinner'].slice(
		0,
		Math.max(1, Math.min(3, profile.mealsPerDay))
	) as MealType[];
	const snackCount = profile.includeSnacks ? (profile.goal === 'gain' ? 2 : 1) : 0;

	return [...mealSlots, ...Array<MealType>(snackCount).fill('snack')];
}

export function canAssembleMeal(
	profile: UserProfile,
	meal: Meal,
	prepSet: string[],
	options: { weekdayAppliances?: Appliance[]; microwaveOnly?: boolean } = {}
): boolean {
	const effectiveWeekdayAppliances =
		options.weekdayAppliances ?? (options.microwaveOnly ? (['microwave'] as Appliance[]) : profile.weekdayAppliances);
	const weekdayAppliances = new Set(effectiveWeekdayAppliances);
	const availablePrep = new Set(prepSet);
	const hasWeekdayAppliances = meal.weekdayAppliances.every((appliance) => weekdayAppliances.has(appliance));
	const hasPrep = requiredPrepIds(meal).every((prepId) => availablePrep.has(prepId));

	return hasWeekdayAppliances && hasPrep;
}

export function requiredPrepIds(meal: Meal): string[] {
	return [
		...new Set(
			meal.components
				.filter((component) => component.ref.kind === 'prep')
				.map((component) => (component.ref.kind === 'prep' ? component.ref.prepId : ''))
		)
	].filter(Boolean);
}

export function mealUsesFood(data: MealPrepData, meal: Meal, foodId: string): boolean {
	return meal.components.some((component) => {
		const ref = component.ref;

		if (ref.kind === 'food') {
			return ref.foodId === foodId;
		}

		const prep = data.prepComponents.find((candidate) => candidate.id === ref.prepId);
		return prep ? prepUsesFood(prep, foodId) : false;
	});
}

export function prepSetMinutes(prepSet: string[], data: MealPrepData = mealPrepData): number {
	return prepSet.reduce((total, prepId) => {
		const prep = data.prepComponents.find((component) => component.id === prepId);
		return total + (prep?.prepMinutes ?? 0);
	}, 0);
}

function placeMeals(
	profile: UserProfile,
	data: MealPrepData,
	prepSet: string[],
	mealSlots: MealType[],
	rng: () => number,
	constraints: GeneratorConstraints
): { meals: PlannedMeal[]; fallbacks: PlanFallback[] } {
	const allowedMeals = data.meals.filter((meal) =>
		constraints.dislikedFoodIds.every((foodId) => !mealUsesFood(data, meal, foodId))
	);
	const candidates = allowedMeals.filter((meal) =>
		canAssembleMeal(profile, meal, prepSet, { weekdayAppliances: constraints.weekdayAppliances })
	);
	const plannedMeals: PlannedMeal[] = [];
	const fallbacks: PlanFallback[] = [];

	if (constraints.leftoversMode) {
		for (let blockStart = 0; blockStart < 7; blockStart += 2) {
			const blockDays = blockStart === 6 ? [6] : [blockStart, blockStart + 1];

			for (let slotIndex = 0; slotIndex < mealSlots.length; slotIndex += 1) {
				const slot = mealSlots[slotIndex];
				const choice = chooseMealForSlot(candidates, allowedMeals, profile, data, slot, undefined, rng, prepSet, constraints);

				for (const day of blockDays) {
					if (!choice.meal) {
						fallbacks.push({ day, slot, slotIndex, reason: choice.reason ?? 'No compatible backup was available.' });
						continue;
					}

					plannedMeals.push(toPlannedMeal(choice.meal, day, slot, slotIndex, choice.isFallback));
					if (choice.isFallback) {
						fallbacks.push({ day, slot, slotIndex, reason: choice.reason ?? 'Used a backup meal.' });
					}
				}
			}
		}

		return { meals: plannedMeals, fallbacks };
	}

	for (let day = 0; day < 7; day += 1) {
		for (let slotIndex = 0; slotIndex < mealSlots.length; slotIndex += 1) {
			const slot = mealSlots[slotIndex];
			const previousMeal = plannedMeals.find((meal) => meal.day === day - 1 && meal.slotIndex === slotIndex);
			const choice = chooseMealForSlot(
				candidates,
				allowedMeals,
				profile,
				data,
				slot,
				previousMeal?.mealId,
				rng,
				prepSet,
				constraints
			);

			if (!choice.meal) {
				fallbacks.push({ day, slot, slotIndex, reason: choice.reason ?? 'No compatible backup was available.' });
				continue;
			}

			plannedMeals.push(toPlannedMeal(choice.meal, day, slot, slotIndex, choice.isFallback));
			if (choice.isFallback) {
				fallbacks.push({ day, slot, slotIndex, reason: choice.reason ?? 'Used a backup meal.' });
			}
		}
	}

	return { meals: plannedMeals, fallbacks };
}

function chooseMealForSlot(
	candidates: Meal[],
	allowedMeals: Meal[],
	profile: UserProfile,
	data: MealPrepData,
	slot: MealType,
	previousMealId: string | undefined,
	rng: () => number,
	prepSet: string[],
	constraints: GeneratorConstraints
): MealChoice {
	const slotCandidates = candidates
		.filter((meal) => meal.mealType === slot && !meal.isEmergency)
		.sort((left, right) => left.id.localeCompare(right.id));
	const variedPool = slotCandidates.length > 1 ? slotCandidates.filter((meal) => meal.id !== previousMealId) : slotCandidates;

	if (variedPool.length === 0) {
		const fallbackPool = allowedMeals
			.filter((meal) => meal.mealType === slot)
			.filter((meal) => meal.isEmergency || meal.weekendPrepRequired === false || requiredPrepIds(meal).length === 0)
			.filter((meal) => canAssembleMeal(profile, meal, prepSet, { weekdayAppliances: constraints.weekdayAppliances }))
			.sort((left, right) => left.id.localeCompare(right.id));
		const fallbackWithoutPrevious =
			fallbackPool.length > 1 ? fallbackPool.filter((meal) => meal.id !== previousMealId) : fallbackPool;
		const variedFallbackPool = fallbackWithoutPrevious.length > 0 ? fallbackWithoutPrevious : fallbackPool;

		return {
			meal: weightedMealChoice(variedFallbackPool, profile, data, rng),
			isFallback: variedFallbackPool.length > 0,
			reason:
				variedFallbackPool.length > 0
					? 'Constraints were tight, so a no-prep or emergency meal was used.'
					: `No meal candidates available for ${slot}.`
		};
	}

	return {
		meal: weightedMealChoice(variedPool, profile, data, rng),
		isFallback: false
	};
}

function weightedMealChoice(candidates: Meal[], profile: UserProfile, data: MealPrepData, rng: () => number): Meal | undefined {
	if (candidates.length === 0) {
		return undefined;
	}

	const weighted = candidates.map((meal) => ({ meal, weight: mealSelectionWeight(meal, profile, data) }));
	const totalWeight = weighted.reduce((total, entry) => total + entry.weight, 0);
	let ticket = rng() * totalWeight;

	for (const entry of weighted) {
		ticket -= entry.weight;
		if (ticket <= 0) {
			return entry.meal;
		}
	}

	return weighted.at(-1)?.meal;
}

function mealSelectionWeight(meal: Meal, profile: UserProfile, data: MealPrepData): number {
	if (meal.mealType !== 'snack') {
		return 1;
	}

	const calories = nutritionForMeal(data, meal).calories;
	const appetiteFactor =
		profile.appetite === 'insatiable' || profile.appetite === 'high' || profile.goal === 'gain'
			? Math.max(0.7, Math.min(1.8, calories / 300))
			: profile.appetite === 'low' || profile.goal === 'cut'
				? Math.max(0.55, Math.min(1.25, 320 / Math.max(1, calories)))
				: 1;
	const averageCostTier = averageMealCostTier(meal, data);
	const budgetFactor =
		profile.budgetDial === 'tight'
			? Math.max(0.6, 1.35 - (averageCostTier - 1) * 0.3)
			: profile.budgetDial === 'comfortable'
				? 0.85 + averageCostTier * 0.18
				: 1;
	const generatedSnackFactor = isGeneratedSnack(meal) ? 1.15 : 1;

	return Math.max(0.1, appetiteFactor * budgetFactor * generatedSnackFactor);
}

function averageMealCostTier(meal: Meal, data: MealPrepData): number {
	const amounts = rawFoodAmountsForMeal(data, meal);
	if (amounts.length === 0) {
		return 1;
	}

	const totalGrams = amounts.reduce((total, amount) => total + amount.grams, 0);
	const weightedCostTier = amounts.reduce((total, amount) => {
		const food = getFood(data, amount.foodId);
		return total + food.costTier * amount.grams;
	}, 0);

	return weightedCostTier / Math.max(1, totalGrams);
}

function toPlannedMeal(
	meal: Meal,
	day: number,
	slot: MealType,
	slotIndex: number,
	isFallback: boolean
): PlannedMeal {
	return {
		mealId: meal.id,
		day,
		slot,
		slotIndex,
		portionMultiplier: 1,
		calories: 0,
		protein: 0,
		...(isFallback ? { isFallback: true } : {})
	};
}

function averageDailyNutrition(data: MealPrepData, meals: PlannedMeal[]) {
	const dailyCalories = new Map<number, number>();

	for (const meal of meals) {
		const nutrition = nutritionForMeal(data, getMeal(data, meal.mealId));
		dailyCalories.set(meal.day, (dailyCalories.get(meal.day) ?? 0) + nutrition.calories);
	}

	const totalCalories = [...dailyCalories.values()].reduce((total, calories) => total + calories, 0);

	return {
		calories: totalCalories / Math.max(1, dailyCalories.size)
	};
}

function createSeededRandom(seed: number): () => number {
	let state = seed >>> 0;

	return () => {
		state += 0x6d2b79f5;
		let value = state;
		value = Math.imul(value ^ (value >>> 15), value | 1);
		value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
		return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
	};
}

function roundMultiplier(multiplier: number): number {
	return Math.round(multiplier * 100) / 100;
}

function normalizeConstraints(profile: UserProfile, options: GeneratePlanOptions): GeneratorConstraints {
	const microwaveOnly = options.microwaveOnly ?? false;

	return {
		dislikedFoodIds: options.dislikedFoodIds ?? profile.dislikedFoodIds ?? [],
		maxPrepMinutes: options.maxPrepMinutes ?? profile.maxPrepMinutes,
		microwaveOnly,
		leftoversMode: options.leftoversMode ?? false,
		weekdayAppliances: microwaveOnly ? ['microwave'] : profile.weekdayAppliances
	};
}

function prepUsesFood(prep: { ingredients: { foodId: string }[] }, foodId: string): boolean {
	return prep.ingredients.some((ingredient) => ingredient.foodId === foodId);
}
