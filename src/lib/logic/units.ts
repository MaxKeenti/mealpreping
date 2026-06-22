import type {
	FoodItem,
	Locale,
	Meal,
	MealPrepData,
	Nutrition,
	PrepComponent,
	PrepIngredient
} from '$lib/data';

export interface FoodAmount {
	foodId: string;
	grams: number;
}

export function getFood(data: MealPrepData, foodId: string): FoodItem {
	const food = data.foods.find((item) => item.id === foodId);

	if (!food) {
		throw new Error(`Unknown food id: ${foodId}`);
	}

	return food;
}

export function getPrepComponent(data: MealPrepData, prepId: string): PrepComponent {
	const component = data.prepComponents.find((item) => item.id === prepId);

	if (!component) {
		throw new Error(`Unknown prep component id: ${prepId}`);
	}

	return component;
}

export function getMeal(data: MealPrepData, mealId: string): Meal {
	const meal = data.meals.find((item) => item.id === mealId);

	if (!meal) {
		throw new Error(`Unknown meal id: ${mealId}`);
	}

	return meal;
}

export function nutritionForFood(food: FoodItem, grams: number): Nutrition {
	return {
		calories: (food.caloriesPer100g * grams) / 100,
		protein: (food.proteinPer100g * grams) / 100
	};
}

export function addNutrition(left: Nutrition, right: Nutrition): Nutrition {
	return {
		calories: left.calories + right.calories,
		protein: left.protein + right.protein
	};
}

export function scaleNutrition(nutrition: Nutrition, multiplier: number): Nutrition {
	return {
		calories: nutrition.calories * multiplier,
		protein: nutrition.protein * multiplier
	};
}

export function totalRawGrams(prep: PrepComponent): number {
	return prep.ingredients.reduce((total, ingredient) => total + ingredient.rawGrams, 0);
}

export function totalCookedGrams(prep: PrepComponent): number {
	return totalRawGrams(prep) * prep.yieldFactor;
}

export function prepIngredientAmountsForCookedGrams(
	prep: PrepComponent,
	cookedGrams: number
): PrepIngredient[] {
	const cookedTotal = totalCookedGrams(prep);

	if (cookedTotal <= 0) {
		throw new Error(`Prep component ${prep.id} has no cooked yield`);
	}

	const scale = cookedGrams / cookedTotal;
	return prep.ingredients.map((ingredient) => ({
		foodId: ingredient.foodId,
		rawGrams: ingredient.rawGrams * scale
	}));
}

export function nutritionForPrepServing(
	data: MealPrepData,
	prep: PrepComponent,
	cookedGrams: number
): Nutrition {
	return prepIngredientAmountsForCookedGrams(prep, cookedGrams).reduce<Nutrition>(
		(total, ingredient) => addNutrition(total, nutritionForFood(getFood(data, ingredient.foodId), ingredient.rawGrams)),
		{ calories: 0, protein: 0 }
	);
}

export function nutritionForMeal(data: MealPrepData, meal: Meal, portionMultiplier = 1): Nutrition {
	const nutrition = meal.components.reduce<Nutrition>((total, component) => {
		const grams = component.grams * portionMultiplier;

		if (component.ref.kind === 'food') {
			return addNutrition(total, nutritionForFood(getFood(data, component.ref.foodId), grams));
		}

		return addNutrition(
			total,
			nutritionForPrepServing(data, getPrepComponent(data, component.ref.prepId), grams)
		);
	}, { calories: 0, protein: 0 });

	return {
		calories: Math.round(nutrition.calories),
		protein: Math.round(nutrition.protein)
	};
}

export function rawFoodAmountsForMeal(
	data: MealPrepData,
	meal: Meal,
	portionMultiplier = 1
): FoodAmount[] {
	return meal.components.flatMap((component) => {
		const grams = component.grams * portionMultiplier;

		if (component.ref.kind === 'food') {
			return [{ foodId: component.ref.foodId, grams }];
		}

		const prep = getPrepComponent(data, component.ref.prepId);
		return prepIngredientAmountsForCookedGrams(prep, grams).map((ingredient) => ({
			foodId: ingredient.foodId,
			grams: ingredient.rawGrams
		}));
	});
}

export function combineFoodAmounts(amounts: FoodAmount[]): FoodAmount[] {
	const totals = new Map<string, number>();

	for (const amount of amounts) {
		totals.set(amount.foodId, (totals.get(amount.foodId) ?? 0) + amount.grams);
	}

	return [...totals.entries()].map(([foodId, grams]) => ({ foodId, grams }));
}

export function formatGrams(grams: number, locale: Locale = 'en'): string {
	if (grams >= 1000) {
		const kg = grams / 1000;
		return `${formatNumber(kg, kg >= 10 ? 0 : 1, locale)} kg`;
	}

	if (grams >= 100) {
		return `${Math.round(grams / 10) * 10} g`;
	}

	return `${Math.round(grams / 5) * 5} g`;
}

export function formatFoodAmount(food: FoodItem, grams: number, locale: Locale = 'en'): string {
	if (!food.householdUnit) {
		return formatGrams(grams, locale);
	}

	const units = grams / food.householdUnit.gramsPerUnit;
	const maxFriendlyUnits = ['piece', 'slice'].includes(food.householdUnit.label) ? 80 : 24;

	if (units >= 0.75 && units <= maxFriendlyUnits) {
		const roundedUnits = units >= 5 ? Math.round(units) : Math.round(units * 2) / 2;
		const label = pluralize(food.householdUnit.label, roundedUnits, locale);
		return `${formatNumber(roundedUnits, roundedUnits % 1 === 0 ? 0 : 1, locale)} ${label}`;
	}

	return formatGrams(grams, locale);
}

export function formatNumber(value: number, fractionDigits: number, locale: Locale = 'en'): string {
	return value.toLocaleString(locale === 'es' ? 'es-MX' : 'en-US', {
		minimumFractionDigits: 0,
		maximumFractionDigits: fractionDigits
	});
}

function pluralize(label: string, amount: number, locale: Locale): string {
	if (locale === 'es') {
		const labels: Record<string, [string, string]> = {
			piece: ['pieza', 'piezas'],
			cup: ['taza', 'tazas'],
			tbsp: ['cucharada', 'cucharadas'],
			tsp: ['cucharadita', 'cucharaditas'],
			slice: ['rebanada', 'rebanadas'],
			scoop: ['medida', 'medidas']
		};
		const translated = labels[label] ?? [label, `${label}s`];
		return amount === 1 ? translated[0] : translated[1];
	}

	if (amount === 1) {
		return label;
	}

	if (label === 'slice') {
		return 'slices';
	}

	if (label === 'piece') {
		return 'pieces';
	}

	return `${label}s`;
}
