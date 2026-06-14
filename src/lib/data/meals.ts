import type { Meal } from './types';

export const meals = [
	{
		id: 'oats-banana-peanut-butter',
		name: 'Oats with banana, milk, and peanut butter',
		mealType: 'breakfast',
		components: [
			{ ref: { kind: 'food', foodId: 'oats' }, grams: 90 },
			{ ref: { kind: 'food', foodId: 'whole-milk' }, grams: 300 },
			{ ref: { kind: 'food', foodId: 'banana' }, grams: 120 },
			{ ref: { kind: 'food', foodId: 'peanut-butter' }, grams: 32 }
		],
		weekdayAppliances: [],
		reheatsWell: false,
		weekendPrepRequired: false
	},
	{
		id: 'yogurt-oats-banana',
		name: 'Yogurt oats with banana and peanuts',
		mealType: 'breakfast',
		components: [
			{ ref: { kind: 'food', foodId: 'plain-yogurt' }, grams: 220 },
			{ ref: { kind: 'food', foodId: 'oats' }, grams: 70 },
			{ ref: { kind: 'food', foodId: 'banana' }, grams: 120 },
			{ ref: { kind: 'food', foodId: 'peanuts' }, grams: 25 }
		],
		weekdayAppliances: [],
		reheatsWell: false,
		weekendPrepRequired: false
	},
	{
		id: 'rice-egg-salsa-bowl',
		name: 'Rice, eggs, and salsa bowl',
		mealType: 'breakfast',
		components: [
			{ ref: { kind: 'prep', prepId: 'cooked-rice' }, grams: 220 },
			{ ref: { kind: 'food', foodId: 'egg' }, grams: 120 },
			{ ref: { kind: 'prep', prepId: 'salsa-roja' }, grams: 50 },
			{ ref: { kind: 'food', foodId: 'corn-tortilla' }, grams: 60 }
		],
		weekdayAppliances: ['microwave', 'electric-grill'],
		reheatsWell: true,
		weekendPrepRequired: true
	},
	{
		id: 'potato-egg-tacos',
		name: 'Potato and egg tacos',
		mealType: 'breakfast',
		components: [
			{ ref: { kind: 'prep', prepId: 'roasted-potatoes' }, grams: 250 },
			{ ref: { kind: 'food', foodId: 'egg' }, grams: 120 },
			{ ref: { kind: 'prep', prepId: 'salsa-roja' }, grams: 45 },
			{ ref: { kind: 'food', foodId: 'corn-tortilla' }, grams: 90 }
		],
		weekdayAppliances: ['microwave', 'electric-grill'],
		reheatsWell: true,
		weekendPrepRequired: true
	},
	{
		id: 'peanut-butter-milk-toast',
		name: 'Peanut butter toast with milk and banana',
		mealType: 'breakfast',
		components: [
			{ ref: { kind: 'food', foodId: 'sandwich-bread' }, grams: 70 },
			{ ref: { kind: 'food', foodId: 'peanut-butter' }, grams: 40 },
			{ ref: { kind: 'food', foodId: 'whole-milk' }, grams: 300 },
			{ ref: { kind: 'food', foodId: 'banana' }, grams: 120 }
		],
		weekdayAppliances: [],
		reheatsWell: false,
		weekendPrepRequired: false
	},
	{
		id: 'chicken-lentil-rice-bowl',
		name: 'Chicken, lentil, and rice bowl',
		mealType: 'lunch',
		components: [
			{ ref: { kind: 'prep', prepId: 'cooked-rice' }, grams: 260 },
			{ ref: { kind: 'prep', prepId: 'cooked-lentils' }, grams: 220 },
			{ ref: { kind: 'prep', prepId: 'roasted-chicken' }, grams: 170 },
			{ ref: { kind: 'prep', prepId: 'salsa-roja' }, grams: 60 },
			{ ref: { kind: 'food', foodId: 'corn-tortilla' }, grams: 60 }
		],
		weekdayAppliances: ['microwave'],
		reheatsWell: true,
		weekendPrepRequired: true
	},
	{
		id: 'chicken-potato-chipotle',
		name: 'Chicken potatoes with chipotle crema',
		mealType: 'lunch',
		components: [
			{ ref: { kind: 'prep', prepId: 'roasted-chicken' }, grams: 180 },
			{ ref: { kind: 'prep', prepId: 'roasted-potatoes' }, grams: 320 },
			{ ref: { kind: 'prep', prepId: 'chipotle-crema' }, grams: 50 },
			{ ref: { kind: 'food', foodId: 'cabbage' }, grams: 80 }
		],
		weekdayAppliances: ['microwave'],
		reheatsWell: true,
		weekendPrepRequired: true
	},
	{
		id: 'lentil-tacos',
		name: 'Lentil tacos with salsa and crema',
		mealType: 'lunch',
		components: [
			{ ref: { kind: 'prep', prepId: 'cooked-lentils' }, grams: 260 },
			{ ref: { kind: 'food', foodId: 'corn-tortilla' }, grams: 120 },
			{ ref: { kind: 'prep', prepId: 'salsa-roja' }, grams: 80 },
			{ ref: { kind: 'food', foodId: 'crema' }, grams: 30 },
			{ ref: { kind: 'food', foodId: 'cabbage' }, grams: 60 }
		],
		weekdayAppliances: ['microwave'],
		reheatsWell: true,
		weekendPrepRequired: true
	},
	{
		id: 'tuna-rice-bowl',
		name: 'Tuna rice bowl with salsa',
		mealType: 'lunch',
		components: [
			{ ref: { kind: 'prep', prepId: 'cooked-rice' }, grams: 280 },
			{ ref: { kind: 'food', foodId: 'canned-tuna' }, grams: 140 },
			{ ref: { kind: 'prep', prepId: 'salsa-roja' }, grams: 70 },
			{ ref: { kind: 'food', foodId: 'mayonnaise' }, grams: 20 },
			{ ref: { kind: 'food', foodId: 'carrot' }, grams: 80 }
		],
		weekdayAppliances: ['microwave'],
		reheatsWell: true,
		weekendPrepRequired: true
	},
	{
		id: 'sardine-tortilla-plate',
		name: 'Sardines with tortillas and cabbage',
		mealType: 'lunch',
		components: [
			{ ref: { kind: 'food', foodId: 'canned-sardines' }, grams: 120 },
			{ ref: { kind: 'food', foodId: 'corn-tortilla' }, grams: 90 },
			{ ref: { kind: 'prep', prepId: 'salsa-roja' }, grams: 60 },
			{ ref: { kind: 'food', foodId: 'cabbage' }, grams: 80 }
		],
		weekdayAppliances: [],
		reheatsWell: false,
		weekendPrepRequired: true
	},
	{
		id: 'bean-rice-quesadilla',
		name: 'Bean and rice quesadilla',
		mealType: 'dinner',
		components: [
			{ ref: { kind: 'prep', prepId: 'cooked-black-beans' }, grams: 220 },
			{ ref: { kind: 'prep', prepId: 'cooked-rice' }, grams: 160 },
			{ ref: { kind: 'food', foodId: 'corn-tortilla' }, grams: 120 },
			{ ref: { kind: 'food', foodId: 'oaxaca-cheese' }, grams: 70 },
			{ ref: { kind: 'prep', prepId: 'salsa-roja' }, grams: 50 }
		],
		weekdayAppliances: ['electric-grill', 'microwave'],
		reheatsWell: true,
		weekendPrepRequired: true
	},
	{
		id: 'loaded-lentil-potato',
		name: 'Loaded lentil potato',
		mealType: 'dinner',
		components: [
			{ ref: { kind: 'prep', prepId: 'roasted-potatoes' }, grams: 330 },
			{ ref: { kind: 'prep', prepId: 'cooked-lentils' }, grams: 180 },
			{ ref: { kind: 'food', foodId: 'crema' }, grams: 40 },
			{ ref: { kind: 'prep', prepId: 'salsa-roja' }, grams: 60 }
		],
		weekdayAppliances: ['microwave'],
		reheatsWell: true,
		weekendPrepRequired: true
	},
	{
		id: 'chicken-chipotle-torta',
		name: 'Chicken chipotle torta',
		mealType: 'dinner',
		components: [
			{ ref: { kind: 'food', foodId: 'bolillo' }, grams: 90 },
			{ ref: { kind: 'prep', prepId: 'roasted-chicken' }, grams: 150 },
			{ ref: { kind: 'prep', prepId: 'chipotle-crema' }, grams: 50 },
			{ ref: { kind: 'food', foodId: 'cabbage' }, grams: 60 },
			{ ref: { kind: 'food', foodId: 'tomato' }, grams: 60 }
		],
		weekdayAppliances: ['microwave'],
		reheatsWell: true,
		weekendPrepRequired: true
	},
	{
		id: 'black-bean-rice-bowl',
		name: 'Black bean rice bowl',
		mealType: 'dinner',
		components: [
			{ ref: { kind: 'prep', prepId: 'cooked-rice' }, grams: 260 },
			{ ref: { kind: 'prep', prepId: 'cooked-black-beans' }, grams: 240 },
			{ ref: { kind: 'prep', prepId: 'salsa-roja' }, grams: 70 },
			{ ref: { kind: 'food', foodId: 'crema' }, grams: 30 },
			{ ref: { kind: 'food', foodId: 'cabbage' }, grams: 70 }
		],
		weekdayAppliances: ['microwave'],
		reheatsWell: true,
		weekendPrepRequired: true
	},
	{
		id: 'chicken-quesadilla',
		name: 'Chicken quesadilla',
		mealType: 'dinner',
		components: [
			{ ref: { kind: 'prep', prepId: 'roasted-chicken' }, grams: 130 },
			{ ref: { kind: 'food', foodId: 'corn-tortilla' }, grams: 120 },
			{ ref: { kind: 'food', foodId: 'oaxaca-cheese' }, grams: 80 },
			{ ref: { kind: 'prep', prepId: 'salsa-roja' }, grams: 50 }
		],
		weekdayAppliances: ['electric-grill'],
		reheatsWell: true,
		weekendPrepRequired: true
	},
	{
		id: 'chicken-rice-tacos',
		name: 'Chicken rice tacos',
		mealType: 'dinner',
		components: [
			{ ref: { kind: 'prep', prepId: 'cooked-rice' }, grams: 180 },
			{ ref: { kind: 'prep', prepId: 'roasted-chicken' }, grams: 150 },
			{ ref: { kind: 'food', foodId: 'corn-tortilla' }, grams: 120 },
			{ ref: { kind: 'prep', prepId: 'salsa-roja' }, grams: 60 },
			{ ref: { kind: 'food', foodId: 'crema' }, grams: 30 }
		],
		weekdayAppliances: ['microwave'],
		reheatsWell: true,
		weekendPrepRequired: true
	},
	{
		id: 'lentil-rice-greens-bowl',
		name: 'Lentil rice bowl with greens',
		mealType: 'dinner',
		components: [
			{ ref: { kind: 'prep', prepId: 'cooked-rice' }, grams: 240 },
			{ ref: { kind: 'prep', prepId: 'cooked-lentils' }, grams: 250 },
			{ ref: { kind: 'food', foodId: 'spinach' }, grams: 60 },
			{ ref: { kind: 'prep', prepId: 'salsa-roja' }, grams: 70 },
			{ ref: { kind: 'food', foodId: 'olive-oil' }, grams: 10 }
		],
		weekdayAppliances: ['microwave'],
		reheatsWell: true,
		weekendPrepRequired: true
	},
	{
		id: 'banana-peanut-butter-milk',
		name: 'Banana, peanut butter, and milk',
		mealType: 'snack',
		components: [
			{ ref: { kind: 'food', foodId: 'banana' }, grams: 120 },
			{ ref: { kind: 'food', foodId: 'peanut-butter' }, grams: 32 },
			{ ref: { kind: 'food', foodId: 'whole-milk' }, grams: 300 }
		],
		weekdayAppliances: [],
		reheatsWell: false,
		weekendPrepRequired: false
	},
	{
		id: 'peanuts-fruit-yogurt',
		name: 'Peanuts, fruit, and yogurt',
		mealType: 'snack',
		components: [
			{ ref: { kind: 'food', foodId: 'peanuts' }, grams: 40 },
			{ ref: { kind: 'food', foodId: 'apple' }, grams: 180 },
			{ ref: { kind: 'food', foodId: 'plain-yogurt' }, grams: 180 }
		],
		weekdayAppliances: [],
		reheatsWell: false,
		weekendPrepRequired: false
	},
	{
		id: 'boiled-eggs-banana',
		name: 'Boiled eggs with banana',
		mealType: 'snack',
		components: [
			{ ref: { kind: 'prep', prepId: 'boiled-eggs' }, grams: 120 },
			{ ref: { kind: 'food', foodId: 'banana' }, grams: 120 },
			{ ref: { kind: 'prep', prepId: 'salsa-roja' }, grams: 30 }
		],
		weekdayAppliances: [],
		reheatsWell: false,
		weekendPrepRequired: true
	},
	{
		id: 'peanut-butter-sandwich-milk',
		name: 'Peanut butter sandwich with milk',
		mealType: 'snack',
		components: [
			{ ref: { kind: 'food', foodId: 'sandwich-bread' }, grams: 70 },
			{ ref: { kind: 'food', foodId: 'peanut-butter' }, grams: 40 },
			{ ref: { kind: 'food', foodId: 'whole-milk' }, grams: 300 }
		],
		weekdayAppliances: [],
		reheatsWell: false,
		weekendPrepRequired: false
	},
	{
		id: 'tuna-tortilla-emergency',
		name: 'Tuna tortilla emergency plate',
		mealType: 'dinner',
		components: [
			{ ref: { kind: 'food', foodId: 'canned-tuna' }, grams: 140 },
			{ ref: { kind: 'food', foodId: 'corn-tortilla' }, grams: 90 },
			{ ref: { kind: 'food', foodId: 'mayonnaise' }, grams: 20 },
			{ ref: { kind: 'prep', prepId: 'salsa-roja' }, grams: 40 }
		],
		weekdayAppliances: [],
		reheatsWell: false,
		weekendPrepRequired: true,
		isEmergency: true
	},
	{
		id: 'sardine-bolillo-emergency',
		name: 'Sardine bolillo emergency meal',
		mealType: 'dinner',
		components: [
			{ ref: { kind: 'food', foodId: 'canned-sardines' }, grams: 120 },
			{ ref: { kind: 'food', foodId: 'bolillo' }, grams: 90 },
			{ ref: { kind: 'food', foodId: 'cabbage' }, grams: 60 },
			{ ref: { kind: 'food', foodId: 'mayonnaise' }, grams: 20 }
		],
		weekdayAppliances: [],
		reheatsWell: false,
		weekendPrepRequired: false,
		isEmergency: true
	}
] satisfies Meal[];

export const mealById = new Map(meals.map((meal) => [meal.id, meal]));
