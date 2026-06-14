import { describe, expect, it } from 'vitest';
import { calculatePortionScale, applyCalorieBump } from './portions';

describe('portion helpers', () => {
	it('scales average daily calories toward the target midpoint', () => {
		const scale = calculatePortionScale(
			{ calories: 2500 },
			{ caloriesMin: 2800, caloriesMax: 3200 }
		);

		expect(scale).toBe(1.2);
	});

	it('applies calorie bumps to both ends of the target range', () => {
		const bumped = applyCalorieBump(
			{ caloriesMin: 2800, caloriesMax: 3200, proteinMin: 110, proteinMax: 140 },
			300
		);

		expect(bumped).toEqual({
			caloriesMin: 3100,
			caloriesMax: 3500,
			proteinMin: 110,
			proteinMax: 140
		});
	});
});
