import { describe, expect, it } from 'vitest';
import { mealPrepData } from '$lib/data';
import {
	formatFoodAmount,
	getFood,
	getMeal,
	getPrepComponent,
	nutritionForMeal,
	prepIngredientAmountsForCookedGrams
} from './units';

describe('unit and yield helpers', () => {
	it('converts cooked prep servings back to raw ingredient quantities', () => {
		const rice = getPrepComponent(mealPrepData, 'cooked-rice');
		const ingredients = prepIngredientAmountsForCookedGrams(rice, 280);

		expect(ingredients).toEqual([{ foodId: 'rice-dry', rawGrams: 100 }]);
	});

	it('computes meal nutrition across direct foods and prep components', () => {
		const meal = getMeal(mealPrepData, 'chicken-lentil-rice-bowl');
		const nutrition = nutritionForMeal(mealPrepData, meal);

		expect(nutrition.calories).toBeGreaterThan(700);
		expect(nutrition.protein).toBeGreaterThan(45);
	});

	it('formats familiar household units when available', () => {
		const tortillas = getFood(mealPrepData, 'corn-tortilla');

		expect(formatFoodAmount(tortillas, 150)).toBe('5 pieces');
	});
});
