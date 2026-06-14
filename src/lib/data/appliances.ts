import type { Appliance, ShoppingCategory } from './types';

export const appliances = [
	'microwave',
	'electric-grill',
	'rice-cooker',
	'blender',
	'small-oven',
	'air-fryer'
] as const satisfies Appliance[];

export const applianceLabels: Record<Appliance, string> = {
	microwave: 'Microwave',
	'electric-grill': 'Electric grill',
	'rice-cooker': 'Rice cooker',
	blender: 'Blender',
	'small-oven': 'Small oven',
	'air-fryer': 'Air fryer'
};

export const shoppingCategoryOrder = [
	'core-staples',
	'proteins',
	'dairy',
	'fruits',
	'vegetables',
	'sauces-flavor',
	'pantry-backup'
] as const satisfies ShoppingCategory[];

export const shoppingCategoryLabels: Record<ShoppingCategory, string> = {
	'core-staples': 'Core staples',
	proteins: 'Proteins',
	dairy: 'Dairy',
	fruits: 'Fruits',
	vegetables: 'Vegetables',
	'sauces-flavor': 'Sauces and flavor',
	'pantry-backup': 'Pantry backup'
};
