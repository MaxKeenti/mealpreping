import { mealPrepData } from '$lib/data';
import type { FoodItem, Locale, MealPrepData, ShoppingCategory, WeeklyPlan } from '$lib/data';
import { getFood, getMeal, rawFoodAmountsForMeal, combineFoodAmounts } from './units';

export interface CostBreakdown {
	category: ShoppingCategory;
	totalMxn: number;
}

export interface WeeklyPlanCost {
	totalMxn: number;
	breakdown: CostBreakdown[];
}

export function costForGrams(food: Pick<FoodItem, 'pricePerKgMxn'>, grams: number): number {
	return (food.pricePerKgMxn * grams) / 1000;
}

export function weeklyPlanCost(plan: WeeklyPlan, data: MealPrepData = mealPrepData): WeeklyPlanCost {
	const amounts = combineFoodAmounts(
		plan.meals.flatMap((plannedMeal) =>
			rawFoodAmountsForMeal(data, getMeal(data, plannedMeal.mealId), plannedMeal.portionMultiplier)
		)
	);
	const totals = new Map<ShoppingCategory, number>();
	let totalMxn = 0;

	for (const amount of amounts) {
		const food = getFood(data, amount.foodId);
		const cost = costForGrams(food, amount.grams);
		totalMxn += cost;
		totals.set(food.shoppingCategory, (totals.get(food.shoppingCategory) ?? 0) + cost);
	}

	return {
		totalMxn,
		breakdown: [...totals.entries()].map(([category, total]) => ({ category, totalMxn: total }))
	};
}

export function budgetStatus(totalMxn: number, weeklyBudgetMxn?: number): { over: boolean; deltaMxn: number } | null {
	if (weeklyBudgetMxn == null || weeklyBudgetMxn <= 0) {
		return null;
	}

	const deltaMxn = totalMxn - weeklyBudgetMxn;
	return {
		over: deltaMxn > 0,
		deltaMxn
	};
}

export function formatCurrencyMxn(amount: number, locale: Locale = 'en'): string {
	return new Intl.NumberFormat(locale === 'es' ? 'es-MX' : 'en-US', {
		style: 'currency',
		currency: 'MXN',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(amount);
}

export function intlLocale(locale: Locale = 'en'): string {
	return locale === 'es' ? 'es-MX' : 'en-US';
}
