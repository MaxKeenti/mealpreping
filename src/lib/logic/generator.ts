import { mealPrepData } from '$lib/data';
import type { Meal, MealPrepData, MealType, PlannedMeal, UserProfile, WeeklyPlan } from '$lib/data';
import { calculatePortionScale } from './portions';
import { calculateNutritionTargets } from './targets';
import { getMeal, nutritionForMeal } from './units';

export interface GeneratePlanOptions {
	seed?: number;
	generatedAt?: string;
	calorieBump?: number;
	data?: MealPrepData;
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
	const prepSet = selectPrepSet(profile, data);
	const mealSlots = slotsForProfile(profile);
	const rng = createSeededRandom(seed);
	const baseMeals = placeMeals(profile, data, prepSet, mealSlots, rng);
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
		targets
	};
}

export function selectPrepSet(profile: UserProfile, data: MealPrepData = mealPrepData): string[] {
	const availableAppliances = new Set(profile.weekendAppliances);
	const availablePrepIds = new Set(
		data.prepComponents
			.filter((component) => availableAppliances.has(component.appliance))
			.map((component) => component.id)
	);

	return defaultPrepOrderByBudget[profile.budgetDial].filter((prepId) => availablePrepIds.has(prepId));
}

export function slotsForProfile(profile: Pick<UserProfile, 'mealsPerDay' | 'includeSnacks' | 'goal'>): MealType[] {
	const mealSlots: MealType[] = ['breakfast', 'lunch', 'dinner'].slice(
		0,
		Math.max(1, Math.min(3, profile.mealsPerDay))
	) as MealType[];
	const snackCount = profile.includeSnacks ? (profile.goal === 'gain' ? 2 : 1) : 0;

	return [...mealSlots, ...Array<MealType>(snackCount).fill('snack')];
}

export function canAssembleMeal(profile: UserProfile, meal: Meal, prepSet: string[]): boolean {
	const weekdayAppliances = new Set(profile.weekdayAppliances);
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

function placeMeals(
	profile: UserProfile,
	data: MealPrepData,
	prepSet: string[],
	mealSlots: MealType[],
	rng: () => number
): PlannedMeal[] {
	const candidates = data.meals.filter((meal) => canAssembleMeal(profile, meal, prepSet));
	const plannedMeals: PlannedMeal[] = [];

	for (let day = 0; day < 7; day += 1) {
		for (let slotIndex = 0; slotIndex < mealSlots.length; slotIndex += 1) {
			const slot = mealSlots[slotIndex];
			const previousMeal = plannedMeals.find((meal) => meal.day === day - 1 && meal.slotIndex === slotIndex);
			const meal = chooseMealForSlot(candidates, slot, previousMeal?.mealId, rng);

			plannedMeals.push({
				mealId: meal.id,
				day,
				slot,
				slotIndex,
				portionMultiplier: 1,
				calories: 0,
				protein: 0
			});
		}
	}

	return plannedMeals;
}

function chooseMealForSlot(
	candidates: Meal[],
	slot: MealType,
	previousMealId: string | undefined,
	rng: () => number
): Meal {
	const slotCandidates = candidates
		.filter((meal) => meal.mealType === slot && !meal.isEmergency)
		.sort((left, right) => left.id.localeCompare(right.id));
	const pool = slotCandidates.length > 0 ? slotCandidates : candidates.filter((meal) => meal.mealType === slot);
	const variedPool = pool.length > 1 ? pool.filter((meal) => meal.id !== previousMealId) : pool;

	if (variedPool.length === 0) {
		throw new Error(`No meal candidates available for ${slot}`);
	}

	return variedPool[Math.floor(rng() * variedPool.length)];
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
