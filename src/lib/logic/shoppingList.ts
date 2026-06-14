import { shoppingCategoryLabels, shoppingCategoryOrder, mealPrepData } from '$lib/data';
import type { MealPrepData, ShoppingCategory, WeeklyPlan } from '$lib/data';
import { combineFoodAmounts, formatFoodAmount, getFood, getMeal, nutritionForFood, rawFoodAmountsForMeal } from './units';

export interface ShoppingListItem {
	foodId: string;
	name: string;
	category: ShoppingCategory;
	grams: number;
	friendlyAmount: string;
	calories: number;
	protein: number;
}

export interface ShoppingListGroup {
	category: ShoppingCategory;
	label: string;
	items: ShoppingListItem[];
	totalGrams: number;
}

export function buildShoppingList(plan: WeeklyPlan, data: MealPrepData = mealPrepData): ShoppingListGroup[] {
	const amounts = combineFoodAmounts(
		plan.meals.flatMap((plannedMeal) =>
			rawFoodAmountsForMeal(data, getMeal(data, plannedMeal.mealId), plannedMeal.portionMultiplier)
		)
	);
	const items = amounts
		.map((amount) => {
			const food = getFood(data, amount.foodId);
			const nutrition = nutritionForFood(food, amount.grams);

			return {
				foodId: food.id,
				name: food.name,
				category: food.shoppingCategory,
				grams: Math.round(amount.grams),
				friendlyAmount: formatFoodAmount(food, amount.grams),
				calories: Math.round(nutrition.calories),
				protein: Math.round(nutrition.protein)
			};
		})
		.sort((left, right) => left.name.localeCompare(right.name));

	return shoppingCategoryOrder
		.map((category) => {
			const groupItems = items.filter((item) => item.category === category);
			return {
				category,
				label: shoppingCategoryLabels[category],
				items: groupItems,
				totalGrams: groupItems.reduce((total, item) => total + item.grams, 0)
			};
		})
		.filter((group) => group.items.length > 0);
}
