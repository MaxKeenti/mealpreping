import { describe, expect, it } from 'vitest';
import { defaultProfile, mealPrepData } from '$lib/data';
import { generateWeeklyPlan } from './generator';
import { buildShoppingList } from './shoppingList';

describe('buildShoppingList', () => {
	it('aggregates raw ingredients and direct foods into shopping groups', () => {
		const plan = generateWeeklyPlan(defaultProfile, {
			seed: 42,
			generatedAt: '2026-06-13T00:00:00.000Z'
		});
		const groups = buildShoppingList(plan, mealPrepData);
		const allItems = groups.flatMap((group) => group.items);
		const rice = allItems.find((item) => item.foodId === 'rice-dry');
		const chicken = allItems.find((item) => item.foodId === 'chicken-thigh');

		expect(groups[0].category).toBe('core-staples');
		expect(rice?.grams).toBeGreaterThan(500);
		expect(chicken?.grams).toBeGreaterThan(1000);
	});

	it('renders friendly amounts for foods with household units', () => {
		const plan = generateWeeklyPlan(defaultProfile, {
			seed: 42,
			generatedAt: '2026-06-13T00:00:00.000Z'
		});
		const tortillas = buildShoppingList(plan, mealPrepData)
			.flatMap((group) => group.items)
			.find((item) => item.foodId === 'corn-tortilla');

		expect(tortillas?.friendlyAmount).toContain('pieces');
	});
});
