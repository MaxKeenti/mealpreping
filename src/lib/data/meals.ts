import type { Meal } from './types';

export const meals = [
	{
		id: 'oats-banana-peanut-butter',
		name: 'Oats with banana, milk, and peanut butter',
		nameEs: 'Avena con platano, leche y crema de cacahuate',
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
		nameEs: 'Yogur con avena, platano y cacahuates',
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
		nameEs: 'Bowl de arroz, huevos y salsa',
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
		nameEs: 'Tacos de papa y huevo',
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
		nameEs: 'Pan tostado con crema de cacahuate, leche y platano',
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
		nameEs: 'Bowl de pollo, lentejas y arroz',
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
		nameEs: 'Pollo con papas y crema de chipotle',
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
		nameEs: 'Tacos de lentejas con salsa y crema',
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
		nameEs: 'Bowl de atun con arroz y salsa',
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
		nameEs: 'Sardinas con tortillas y col',
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
		nameEs: 'Quesadilla de frijol y arroz',
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
		nameEs: 'Papa cargada con lentejas',
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
		nameEs: 'Torta de pollo con chipotle',
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
		nameEs: 'Bowl de arroz con frijoles negros',
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
		nameEs: 'Quesadilla de pollo',
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
		nameEs: 'Tacos de pollo con arroz',
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
		nameEs: 'Bowl de lentejas, arroz y hojas verdes',
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
		nameEs: 'Platano, crema de cacahuate y leche',
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
		nameEs: 'Cacahuates, fruta y yogur',
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
		nameEs: 'Huevos cocidos con platano',
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
		nameEs: 'Sandwich de crema de cacahuate con leche',
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
		nameEs: 'Plato de emergencia de atun con tortillas',
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
		nameEs: 'Comida de emergencia de sardina con bolillo',
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
