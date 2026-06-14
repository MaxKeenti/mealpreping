import type { PrepComponent } from './types';

export const prepComponents = [
	{
		id: 'cooked-rice',
		name: 'Cooked rice',
		ingredients: [{ foodId: 'rice-dry', rawGrams: 900 }],
		yieldFactor: 2.8,
		appliance: 'rice-cooker',
		reheatsWell: true,
		storageNotes: 'Cool quickly, refrigerate within 1-2 hours, and reheat until steaming.'
	},
	{
		id: 'cooked-lentils',
		name: 'Cooked lentils',
		ingredients: [
			{ foodId: 'lentils-dry', rawGrams: 700 },
			{ foodId: 'onion', rawGrams: 120 },
			{ foodId: 'garlic', rawGrams: 12 }
		],
		yieldFactor: 2.45,
		appliance: 'rice-cooker',
		reheatsWell: true,
		storageNotes: 'Hold only 2-3 days in the fridge when possible; freeze later portions.'
	},
	{
		id: 'cooked-black-beans',
		name: 'Cooked black beans',
		ingredients: [
			{ foodId: 'black-beans-dry', rawGrams: 700 },
			{ foodId: 'onion', rawGrams: 120 },
			{ foodId: 'garlic', rawGrams: 12 }
		],
		yieldFactor: 2.4,
		appliance: 'rice-cooker',
		reheatsWell: true,
		storageNotes: 'Freeze later-week portions if there is freezer access.'
	},
	{
		id: 'roasted-chicken',
		name: 'Roasted chicken',
		ingredients: [
			{ foodId: 'chicken-thigh', rawGrams: 1900 },
			{ foodId: 'garlic', rawGrams: 10 },
			{ foodId: 'olive-oil', rawGrams: 20 }
		],
		yieldFactor: 0.72,
		appliance: 'small-oven',
		reheatsWell: true,
		storageNotes: 'Refrigerate within 1-2 hours and reheat portions until steaming hot.'
	},
	{
		id: 'roasted-potatoes',
		name: 'Roasted potatoes',
		ingredients: [
			{ foodId: 'potato', rawGrams: 1900 },
			{ foodId: 'olive-oil', rawGrams: 35 },
			{ foodId: 'garlic', rawGrams: 8 }
		],
		yieldFactor: 0.88,
		appliance: 'air-fryer',
		reheatsWell: true,
		storageNotes: 'Store dry and reheat uncovered when possible to avoid sogginess.'
	},
	{
		id: 'salsa-roja',
		name: 'Salsa roja',
		ingredients: [
			{ foodId: 'tomato', rawGrams: 650 },
			{ foodId: 'onion', rawGrams: 90 },
			{ foodId: 'garlic', rawGrams: 10 },
			{ foodId: 'serrano-chile', rawGrams: 45 }
		],
		yieldFactor: 0.9,
		appliance: 'blender',
		reheatsWell: false,
		storageNotes: 'Store separately from rice, chicken, and tortillas.'
	},
	{
		id: 'chipotle-crema',
		name: 'Chipotle crema',
		ingredients: [
			{ foodId: 'crema', rawGrams: 350 },
			{ foodId: 'chipotle-adobo', rawGrams: 55 },
			{ foodId: 'garlic', rawGrams: 8 }
		],
		yieldFactor: 0.98,
		appliance: 'blender',
		reheatsWell: false,
		storageNotes: 'Keep cold and add after reheating the hot meal components.'
	},
	{
		id: 'boiled-eggs',
		name: 'Boiled eggs',
		ingredients: [{ foodId: 'egg', rawGrams: 600 }],
		yieldFactor: 0.95,
		appliance: 'rice-cooker',
		reheatsWell: false,
		storageNotes: 'Keep chilled; use as a ready snack or quick breakfast protein.'
	}
] satisfies PrepComponent[];

export const prepComponentById = new Map(prepComponents.map((component) => [component.id, component]));
