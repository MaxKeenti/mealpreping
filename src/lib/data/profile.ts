import type { UserProfile } from './types';

export const defaultProfile: UserProfile = {
	heightCm: 194,
	weightKg: 69,
	goal: 'gain',
	appetite: 'insatiable',
	activityLevel: 'moderate',
	weekendAppliances: ['blender', 'rice-cooker', 'small-oven', 'air-fryer'],
	weekdayAppliances: ['microwave', 'electric-grill'],
	mealsPerDay: 3,
	includeSnacks: true,
	portionMultiplier: 1,
	budgetDial: 'tight',
	weeklyBudgetMxn: 900,
	dislikedFoodIds: [],
	locale: 'en'
};
