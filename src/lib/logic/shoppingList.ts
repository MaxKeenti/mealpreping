import { localizedName, mealPrepData, shoppingCategoryLabel, shoppingCategoryOrder } from '$lib/data';
import type { Locale, MealPrepData, ShoppingCategory, WeeklyPlan } from '$lib/data';
import { combineFoodAmounts, formatFoodAmount, getFood, getMeal, nutritionForFood, rawFoodAmountsForMeal } from './units';
import { costForGrams } from './cost';

export interface ShoppingListItem {
	foodId: string;
	name: string;
	category: ShoppingCategory;
	grams: number;
	friendlyAmount: string;
	calories: number;
	protein: number;
	costMxn: number;
}

export interface ShoppingListGroup {
	category: ShoppingCategory;
	label: string;
	items: ShoppingListItem[];
	totalGrams: number;
	totalMxn: number;
}

export function buildShoppingList(
	plan: WeeklyPlan,
	data: MealPrepData = mealPrepData,
	locale: Locale = 'en'
): ShoppingListGroup[] {
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
				name: localizedName(food, locale),
				category: food.shoppingCategory,
				grams: Math.round(amount.grams),
				friendlyAmount: formatFoodAmount(food, amount.grams, locale),
				calories: Math.round(nutrition.calories),
				protein: Math.round(nutrition.protein),
				costMxn: costForGrams(food, amount.grams)
			};
		})
		.sort((left, right) => left.name.localeCompare(right.name));

	return shoppingCategoryOrder
		.map((category) => {
			const groupItems = items.filter((item) => item.category === category);
			return {
				category,
				label: shoppingCategoryLabel(category, locale),
				items: groupItems,
				totalGrams: groupItems.reduce((total, item) => total + item.grams, 0),
				totalMxn: groupItems.reduce((total, item) => total + item.costMxn, 0)
			};
		})
		.filter((group) => group.items.length > 0);
}
