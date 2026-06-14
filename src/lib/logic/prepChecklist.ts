import { applianceLabels, appliances, mealPrepData } from '$lib/data';
import type { Appliance, MealPrepData, WeeklyPlan } from '$lib/data';
import { formatFoodAmount, getFood, getMeal, getPrepComponent, prepIngredientAmountsForCookedGrams } from './units';

export interface PrepChecklistIngredient {
	foodId: string;
	name: string;
	grams: number;
	friendlyAmount: string;
}

export interface PrepChecklistItem {
	prepId: string;
	name: string;
	appliance: Appliance;
	cookedGrams: number;
	rawIngredients: PrepChecklistIngredient[];
	storageNotes?: string;
}

export interface PrepChecklistGroup {
	appliance: Appliance;
	label: string;
	items: PrepChecklistItem[];
}

export function buildPrepChecklist(plan: WeeklyPlan, data: MealPrepData = mealPrepData): PrepChecklistGroup[] {
	const cookedTotals = new Map<string, number>();

	for (const plannedMeal of plan.meals) {
		const meal = getMeal(data, plannedMeal.mealId);

		for (const component of meal.components) {
			if (component.ref.kind === 'prep') {
				cookedTotals.set(
					component.ref.prepId,
					(cookedTotals.get(component.ref.prepId) ?? 0) + component.grams * plannedMeal.portionMultiplier
				);
			}
		}
	}

	const items = [...cookedTotals.entries()].map(([prepId, cookedGrams]) => {
		const prep = getPrepComponent(data, prepId);

		return {
			prepId,
			name: prep.name,
			appliance: prep.appliance,
			cookedGrams: Math.round(cookedGrams),
			rawIngredients: prepIngredientAmountsForCookedGrams(prep, cookedGrams).map((ingredient) => {
				const food = getFood(data, ingredient.foodId);

				return {
					foodId: ingredient.foodId,
					name: food.name,
					grams: Math.round(ingredient.rawGrams),
					friendlyAmount: formatFoodAmount(food, ingredient.rawGrams)
				};
			}),
			storageNotes: prep.storageNotes
		};
	});

	return appliances
		.map((appliance) => ({
			appliance,
			label: applianceLabels[appliance],
			items: items
				.filter((item) => item.appliance === appliance)
				.sort((left, right) => left.name.localeCompare(right.name))
		}))
		.filter((group) => group.items.length > 0);
}
