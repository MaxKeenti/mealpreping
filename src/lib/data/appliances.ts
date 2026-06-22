import type { Appliance, Locale, ShoppingCategory } from './types';

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

export const applianceLabelsEs: Record<Appliance, string> = {
	microwave: 'Microondas',
	'electric-grill': 'Parrilla electrica',
	'rice-cooker': 'Olla arrocera',
	blender: 'Licuadora',
	'small-oven': 'Horno pequeno',
	'air-fryer': 'Freidora de aire'
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

export const shoppingCategoryLabelsEs: Record<ShoppingCategory, string> = {
	'core-staples': 'Basicos',
	proteins: 'Proteinas',
	dairy: 'Lacteos',
	fruits: 'Frutas',
	vegetables: 'Verduras',
	'sauces-flavor': 'Salsas y sabor',
	'pantry-backup': 'Despensa de respaldo'
};

export function applianceLabel(appliance: Appliance, locale: Locale = 'en'): string {
	return locale === 'es' ? applianceLabelsEs[appliance] : applianceLabels[appliance];
}

export function shoppingCategoryLabel(category: ShoppingCategory, locale: Locale = 'en'): string {
	return locale === 'es' ? shoppingCategoryLabelsEs[category] : shoppingCategoryLabels[category];
}
