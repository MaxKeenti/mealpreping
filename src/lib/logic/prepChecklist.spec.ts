import { describe, expect, it } from 'vitest';
import { defaultProfile, mealPrepData } from '$lib/data';
import { generateWeeklyPlan } from './generator';
import { buildPrepChecklist } from './prepChecklist';

describe('buildPrepChecklist', () => {
	it('derives weekend prep quantities from the generated plan', () => {
		const plan = generateWeeklyPlan(defaultProfile, {
			seed: 42,
			generatedAt: '2026-06-13T00:00:00.000Z'
		});
		const groups = buildPrepChecklist(plan, mealPrepData);
		const items = groups.flatMap((group) => group.items);
		const rice = items.find((item) => item.prepId === 'cooked-rice');
		const chicken = items.find((item) => item.prepId === 'roasted-chicken');

		expect(rice?.cookedGrams).toBeGreaterThan(1000);
		expect(chicken?.rawIngredients.some((ingredient) => ingredient.foodId === 'chicken-thigh')).toBe(true);
	});

	it('groups prep work by appliance', () => {
		const plan = generateWeeklyPlan(defaultProfile, {
			seed: 17,
			generatedAt: '2026-06-13T00:00:00.000Z'
		});
		const groups = buildPrepChecklist(plan, mealPrepData);

		expect(groups.map((group) => group.appliance)).toContain('rice-cooker');
		expect(groups.map((group) => group.appliance)).toContain('blender');
	});
});
