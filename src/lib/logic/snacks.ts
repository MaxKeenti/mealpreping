import type { Meal, MealComponent } from '$lib/data/types';

type GeneratedSnack = {
	id: string;
	name: string;
	nameEs: string;
	components: MealComponent[];
	weekendPrepRequired?: boolean;
};

const snackTemplates: GeneratedSnack[] = [
	{
		id: 'snack-gen-banana-peanut-milk',
		name: 'Banana with peanut butter and milk',
		nameEs: 'Platano con crema de cacahuate y leche',
		components: [
			{ ref: { kind: 'food', foodId: 'banana' }, grams: 120 },
			{ ref: { kind: 'food', foodId: 'peanut-butter' }, grams: 24 },
			{ ref: { kind: 'food', foodId: 'whole-milk' }, grams: 240 }
		]
	},
	{
		id: 'snack-gen-yogurt-apple-oats',
		name: 'Yogurt with apple and oats',
		nameEs: 'Yogur con manzana y avena',
		components: [
			{ ref: { kind: 'food', foodId: 'plain-yogurt' }, grams: 200 },
			{ ref: { kind: 'food', foodId: 'apple' }, grams: 180 },
			{ ref: { kind: 'food', foodId: 'oats' }, grams: 35 }
		]
	},
	{
		id: 'snack-gen-orange-peanuts',
		name: 'Orange with peanuts',
		nameEs: 'Naranja con cacahuates',
		components: [
			{ ref: { kind: 'food', foodId: 'orange' }, grams: 160 },
			{ ref: { kind: 'food', foodId: 'peanuts' }, grams: 40 }
		]
	},
	{
		id: 'snack-gen-peanut-butter-toast',
		name: 'Peanut butter toast',
		nameEs: 'Pan con crema de cacahuate',
		components: [
			{ ref: { kind: 'food', foodId: 'sandwich-bread' }, grams: 70 },
			{ ref: { kind: 'food', foodId: 'peanut-butter' }, grams: 32 },
			{ ref: { kind: 'food', foodId: 'banana' }, grams: 120 }
		]
	},
	{
		id: 'snack-gen-bolillo-milk',
		name: 'Bolillo with milk',
		nameEs: 'Bolillo con leche',
		components: [
			{ ref: { kind: 'food', foodId: 'bolillo' }, grams: 90 },
			{ ref: { kind: 'food', foodId: 'whole-milk' }, grams: 300 }
		]
	},
	{
		id: 'snack-gen-tortilla-peanut-butter',
		name: 'Tortilla with peanut butter',
		nameEs: 'Tortilla con crema de cacahuate',
		components: [
			{ ref: { kind: 'food', foodId: 'corn-tortilla' }, grams: 60 },
			{ ref: { kind: 'food', foodId: 'peanut-butter' }, grams: 32 }
		]
	},
	{
		id: 'snack-gen-carrots-peanuts',
		name: 'Carrots with peanuts',
		nameEs: 'Zanahorias con cacahuates',
		components: [
			{ ref: { kind: 'food', foodId: 'carrot' }, grams: 120 },
			{ ref: { kind: 'food', foodId: 'peanuts' }, grams: 45 }
		]
	},
	{
		id: 'snack-gen-boiled-eggs-orange',
		name: 'Boiled eggs with orange',
		nameEs: 'Huevos cocidos con naranja',
		components: [
			{ ref: { kind: 'prep', prepId: 'boiled-eggs' }, grams: 100 },
			{ ref: { kind: 'food', foodId: 'orange' }, grams: 160 }
		],
		weekendPrepRequired: true
	},
	{
		id: 'snack-gen-oats-milk',
		name: 'Oats with milk',
		nameEs: 'Avena con leche',
		components: [
			{ ref: { kind: 'food', foodId: 'oats' }, grams: 60 },
			{ ref: { kind: 'food', foodId: 'whole-milk' }, grams: 300 }
		]
	},
	{
		id: 'snack-gen-yogurt-banana-peanuts',
		name: 'Yogurt with banana and peanuts',
		nameEs: 'Yogur con platano y cacahuates',
		components: [
			{ ref: { kind: 'food', foodId: 'plain-yogurt' }, grams: 180 },
			{ ref: { kind: 'food', foodId: 'banana' }, grams: 120 },
			{ ref: { kind: 'food', foodId: 'peanuts' }, grams: 30 }
		]
	}
];

export const generatedSnacks: Meal[] = snackTemplates.map((snack) => ({
	id: snack.id,
	name: snack.name,
	nameEs: snack.nameEs,
	mealType: 'snack',
	components: snack.components,
	weekdayAppliances: [],
	reheatsWell: false,
	weekendPrepRequired: snack.weekendPrepRequired ?? false
}));

export function isGeneratedSnack(meal: Pick<Meal, 'id' | 'mealType'>): boolean {
	return meal.mealType === 'snack' && meal.id.startsWith('snack-gen-');
}
