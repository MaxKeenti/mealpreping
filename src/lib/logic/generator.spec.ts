import { describe, expect, it } from 'vitest';
import { defaultProfile, mealPrepData } from '$lib/data';
import { canAssembleMeal, generateWeeklyPlan, requiredPrepIds, slotsForProfile } from './generator';
import { getMeal } from './units';

describe('generateWeeklyPlan', () => {
	it('builds a seven-day plan with three meals and two snacks per day', () => {
		const plan = generateWeeklyPlan(defaultProfile, {
			seed: 42,
			generatedAt: '2026-06-13T00:00:00.000Z'
		});

		expect(plan.meals).toHaveLength(35);
		expect(slotsForProfile(defaultProfile)).toEqual(['breakfast', 'lunch', 'dinner', 'snack', 'snack']);
	});

	it('is reproducible for the same seed', () => {
		const first = generateWeeklyPlan(defaultProfile, {
			seed: 123,
			generatedAt: '2026-06-13T00:00:00.000Z'
		});
		const second = generateWeeklyPlan(defaultProfile, {
			seed: 123,
			generatedAt: '2026-06-13T00:00:00.000Z'
		});

		expect(second.meals.map((meal) => meal.mealId)).toEqual(first.meals.map((meal) => meal.mealId));
	});

	it('does not repeat the same template in the same slot on adjacent days', () => {
		const plan = generateWeeklyPlan(defaultProfile, {
			seed: 7,
			generatedAt: '2026-06-13T00:00:00.000Z'
		});
		const adjacentRepeats = plan.meals.filter((meal) => {
			const previous = plan.meals.find(
				(candidate) => candidate.day === meal.day - 1 && candidate.slotIndex === meal.slotIndex
			);
			return previous?.mealId === meal.mealId;
		});

		expect(adjacentRepeats).toEqual([]);
	});

	it('respects weekend prep and weekday assembly constraints', () => {
		const microwaveOnlyProfile = {
			...defaultProfile,
			weekdayAppliances: ['microwave' as const]
		};
		const plan = generateWeeklyPlan(microwaveOnlyProfile, {
			seed: 99,
			generatedAt: '2026-06-13T00:00:00.000Z'
		});
		const invalidMeals = plan.meals
			.map((plannedMeal) => getMeal(mealPrepData, plannedMeal.mealId))
			.filter((meal) => !canAssembleMeal(microwaveOnlyProfile, meal, plan.prepSet));

		expect(invalidMeals).toEqual([]);
	});

	it('keeps generated average calories inside the target range', () => {
		const plan = generateWeeklyPlan(defaultProfile, {
			seed: 11,
			generatedAt: '2026-06-13T00:00:00.000Z'
		});
		const averageCalories =
			[0, 1, 2, 3, 4, 5, 6].reduce((sum, day) => {
				return sum + plan.meals.filter((meal) => meal.day === day).reduce((daySum, meal) => daySum + meal.calories, 0);
			}, 0) / 7;

		expect(averageCalories).toBeGreaterThanOrEqual(plan.targets.caloriesMin);
		expect(averageCalories).toBeLessThanOrEqual(plan.targets.caloriesMax);
	});

	it('only uses prep components from the selected prep set', () => {
		const plan = generateWeeklyPlan(defaultProfile, {
			seed: 5,
			generatedAt: '2026-06-13T00:00:00.000Z'
		});
		const usedPrepIds = new Set(
			plan.meals.flatMap((plannedMeal) => requiredPrepIds(getMeal(mealPrepData, plannedMeal.mealId)))
		);
		const missingPrepIds = [...usedPrepIds].filter((prepId) => !plan.prepSet.includes(prepId));

		expect(missingPrepIds).toEqual([]);
	});
});
