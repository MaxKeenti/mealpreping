import { describe, expect, it } from 'vitest';
import { defaultProfile, mealPrepData } from '$lib/data';
import { generateWeeklyPlan } from './generator';
import { buildShoppingList } from './shoppingList';
import { budgetStatus, costForGrams, formatCurrencyMxn, weeklyPlanCost } from './cost';
import { combineFoodAmounts, getFood, getMeal, rawFoodAmountsForMeal } from './units';

describe('cost helpers', () => {
	it('calculates food cost from grams', () => {
		expect(costForGrams({ pricePerKgMxn: 50 }, 250)).toBe(12.5);
	});

	it('matches shopping-list raw-food aggregation', () => {
		const plan = generateWeeklyPlan(defaultProfile, {
			seed: 42,
			generatedAt: '2026-06-13T00:00:00.000Z'
		});
		const cost = weeklyPlanCost(plan, mealPrepData);
		const groups = buildShoppingList(plan, mealPrepData);
		const manualTotal = combineFoodAmounts(
			plan.meals.flatMap((meal) =>
				rawFoodAmountsForMeal(mealPrepData, getMeal(mealPrepData, meal.mealId), meal.portionMultiplier)
			)
		).reduce((total, amount) => total + costForGrams(getFood(mealPrepData, amount.foodId), amount.grams), 0);

		expect(Math.round(cost.totalMxn)).toBe(Math.round(manualTotal));
		expect(Math.round(groups.reduce((total, group) => total + group.totalMxn, 0))).toBe(Math.round(cost.totalMxn));
	});

	it('reports budget over and under status', () => {
		expect(budgetStatus(950, 900)).toEqual({ over: true, deltaMxn: 50 });
		expect(budgetStatus(850, 900)).toEqual({ over: false, deltaMxn: -50 });
		expect(budgetStatus(850, undefined)).toBeNull();
	});

	it('formats MXN with the requested locale', () => {
		expect(formatCurrencyMxn(1234, 'en')).toContain('MX$');
		expect(formatCurrencyMxn(1234, 'es')).toContain('$');
	});
});
