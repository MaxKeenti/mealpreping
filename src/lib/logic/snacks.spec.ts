import { describe, expect, it } from 'vitest';
import { generatedSnacks, isGeneratedSnack } from './snacks';

describe('generatedSnacks', () => {
	it('has stable snack ids and snack-only templates', () => {
		expect(generatedSnacks.map((snack) => snack.id)).toEqual([
			'snack-gen-banana-peanut-milk',
			'snack-gen-yogurt-apple-oats',
			'snack-gen-orange-peanuts',
			'snack-gen-peanut-butter-toast',
			'snack-gen-bolillo-milk',
			'snack-gen-tortilla-peanut-butter',
			'snack-gen-carrots-peanuts',
			'snack-gen-boiled-eggs-orange',
			'snack-gen-oats-milk',
			'snack-gen-yogurt-banana-peanuts'
		]);
		expect(generatedSnacks.every((snack) => snack.mealType === 'snack')).toBe(true);
		expect(generatedSnacks.every((snack) => isGeneratedSnack(snack))).toBe(true);
	});

	it('is profile agnostic static data', () => {
		const serialized = JSON.stringify(generatedSnacks);

		expect(serialized).not.toContain('appetite');
		expect(serialized).not.toContain('budgetDial');
		expect(serialized).not.toContain('weeklyBudgetMxn');
	});
});
