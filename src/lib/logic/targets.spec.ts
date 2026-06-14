import { describe, expect, it } from 'vitest';
import { defaultProfile } from '$lib/data';
import { calculateNutritionTargets } from './targets';

describe('calculateNutritionTargets', () => {
	it('calibrates the reference profile to the documented gain range', () => {
		const targets = calculateNutritionTargets(defaultProfile);

		expect(targets).toEqual({
			caloriesMin: 2800,
			caloriesMax: 3200,
			proteinMin: 110,
			proteinMax: 140
		});
	});

	it('adds a manual calorie bump without changing protein targets', () => {
		const targets = calculateNutritionTargets(defaultProfile, { calorieBump: 500 });

		expect(targets).toMatchObject({
			caloriesMin: 3300,
			caloriesMax: 3700,
			proteinMin: 110,
			proteinMax: 140
		});
	});

	it('rejects impossible body weights', () => {
		expect(() => calculateNutritionTargets({ ...defaultProfile, weightKg: 0 })).toThrow(
			'weightKg must be greater than zero'
		);
	});
});
