import { describe, expect, it } from 'vitest';
import { defaultProfile, mealPrepData } from '$lib/data';
import {
	canAssembleMeal,
	generateWeeklyPlan,
	mealUsesFood,
	prepSetMinutes,
	requiredPrepIds,
	selectPrepSet,
	slotsForProfile
} from './generator';
import { getMeal, nutritionForMeal } from './units';

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

	it('excludes disliked foods from meals and prep components', () => {
		const plan = generateWeeklyPlan(defaultProfile, {
			seed: 77,
			generatedAt: '2026-06-13T00:00:00.000Z',
			dislikedFoodIds: ['chicken-thigh']
		});
		const mealsWithChicken = plan.meals
			.map((plannedMeal) => getMeal(mealPrepData, plannedMeal.mealId))
			.filter((meal) => mealUsesFood(mealPrepData, meal, 'chicken-thigh'));

		expect(plan.prepSet).not.toContain('roasted-chicken');
		expect(mealsWithChicken).toEqual([]);
	});

	it('can explicitly restrict weekday assembly to microwave meals', () => {
		const plan = generateWeeklyPlan(defaultProfile, {
			seed: 101,
			generatedAt: '2026-06-13T00:00:00.000Z',
			microwaveOnly: true
		});
		const invalidMeals = plan.meals
			.map((plannedMeal) => getMeal(mealPrepData, plannedMeal.mealId))
			.filter((meal) => !canAssembleMeal(defaultProfile, meal, plan.prepSet, { weekdayAppliances: ['microwave'] }));

		expect(invalidMeals).toEqual([]);
	});

	it('leftovers mode reduces the number of distinct meal templates', () => {
		const normalPlan = generateWeeklyPlan(defaultProfile, {
			seed: 202,
			generatedAt: '2026-06-13T00:00:00.000Z'
		});
		const leftoversPlan = generateWeeklyPlan(defaultProfile, {
			seed: 202,
			generatedAt: '2026-06-13T00:00:00.000Z',
			leftoversMode: true
		});

		expect(new Set(leftoversPlan.meals.map((meal) => meal.mealId)).size).toBeLessThan(
			new Set(normalPlan.meals.map((meal) => meal.mealId)).size
		);
	});

	it('trims prep set to the requested prep-time limit', () => {
		const prepSet = selectPrepSet(defaultProfile, mealPrepData, { maxPrepMinutes: 60 });

		expect(prepSetMinutes(prepSet, mealPrepData)).toBeLessThanOrEqual(60);
	});

	it('degrades tight constraints without throwing', () => {
		const plan = generateWeeklyPlan(defaultProfile, {
			seed: 303,
			generatedAt: '2026-06-13T00:00:00.000Z',
			maxPrepMinutes: 0,
			microwaveOnly: true,
			dislikedFoodIds: ['oats', 'whole-milk', 'banana', 'peanut-butter']
		});

		expect(plan.meals.length).toBeGreaterThan(0);
		expect(plan.fallbacks.length).toBeGreaterThan(0);
	});

	it('weights snack choices at selection time based on appetite', () => {
		const lowProfile = { ...defaultProfile, appetite: 'low' as const, goal: 'cut' as const };
		const highProfile = { ...defaultProfile, appetite: 'insatiable' as const, goal: 'gain' as const };
		const averageSnackCalories = (profile: typeof defaultProfile) => {
			const meals = Array.from({ length: 12 }, (_, index) =>
				generateWeeklyPlan(profile, {
					seed: index + 1,
					generatedAt: '2026-06-13T00:00:00.000Z'
				})
			).flatMap((plan) => plan.meals.filter((meal) => meal.slot === 'snack'));
			const calories = meals.map((meal) => nutritionForMeal(mealPrepData, getMeal(mealPrepData, meal.mealId)).calories);

			return calories.reduce((total, value) => total + value, 0) / calories.length;
		};

		expect(averageSnackCalories(highProfile)).toBeGreaterThan(averageSnackCalories(lowProfile));
	});
});
