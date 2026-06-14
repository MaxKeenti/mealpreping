export * from './appliances';
export * from './foods';
export * from './meals';
export * from './prepComponents';
export * from './profile';
export * from './types';

import { foods } from './foods';
import { meals } from './meals';
import { prepComponents } from './prepComponents';
import type { MealPrepData } from './types';

export const mealPrepData: MealPrepData = {
	foods,
	prepComponents,
	meals
};
