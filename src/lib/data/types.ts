export type FoodCategory =
	| 'carb'
	| 'protein'
	| 'protein-carb'
	| 'fat'
	| 'fruit'
	| 'vegetable'
	| 'sauce'
	| 'dairy';

export type ShoppingCategory =
	| 'core-staples'
	| 'proteins'
	| 'dairy'
	| 'fruits'
	| 'vegetables'
	| 'sauces-flavor'
	| 'pantry-backup';

export type Appliance =
	| 'microwave'
	| 'electric-grill'
	| 'rice-cooker'
	| 'blender'
	| 'small-oven'
	| 'air-fryer';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type CostTier = 1 | 2 | 3;

export interface Nutrition {
	calories: number;
	protein: number;
}

export interface HouseholdUnit {
	label: 'piece' | 'cup' | 'tbsp' | 'tsp' | 'slice' | 'scoop';
	gramsPerUnit: number;
}

export interface FoodItem {
	id: string;
	name: string;
	nameEs?: string;
	category: FoodCategory;
	shoppingCategory: ShoppingCategory;
	costTier: CostTier;
	pricePerKgMxn: number;
	priceSource?: string;
	caloriesPer100g: number;
	proteinPer100g: number;
	defaultServingGrams: number;
	householdUnit?: HouseholdUnit;
	appliances: Appliance[];
	mealTypes: MealType[];
	source?: string;
	notes?: string;
}

export interface PrepIngredient {
	foodId: string;
	rawGrams: number;
}

export interface PrepComponent {
	id: string;
	name: string;
	nameEs?: string;
	ingredients: PrepIngredient[];
	yieldFactor: number;
	appliance: Appliance;
	reheatsWell: boolean;
	prepMinutes: number;
	storageNotes?: string;
}

export interface MealComponent {
	ref: { kind: 'prep'; prepId: string } | { kind: 'food'; foodId: string };
	grams: number;
}

export interface Meal {
	id: string;
	name: string;
	nameEs?: string;
	mealType: MealType;
	components: MealComponent[];
	weekdayAppliances: Appliance[];
	reheatsWell: boolean;
	weekendPrepRequired: boolean;
	isEmergency?: boolean;
	notes?: string;
}

export type Goal = 'gain' | 'maintain' | 'cut';
export type Appetite = 'low' | 'medium' | 'high' | 'insatiable';
export type ActivityLevel = 'low' | 'moderate' | 'high';
export type BudgetDial = 'tight' | 'normal' | 'comfortable';
export type Locale = 'en' | 'es';

export interface UserProfile {
	heightCm: number;
	weightKg: number;
	goal: Goal;
	appetite: Appetite;
	activityLevel: ActivityLevel;
	weekendAppliances: Appliance[];
	weekdayAppliances: Appliance[];
	mealsPerDay: number;
	includeSnacks: boolean;
	portionMultiplier: number;
	budgetDial: BudgetDial;
	weeklyBudgetMxn?: number;
	dislikedFoodIds: string[];
	maxPrepMinutes?: number;
	locale: Locale;
}

export interface NutritionTargets {
	caloriesMin: number;
	caloriesMax: number;
	proteinMin: number;
	proteinMax: number;
}

export interface PlannedMeal {
	mealId: string;
	day: number;
	slot: MealType;
	slotIndex: number;
	portionMultiplier: number;
	calories: number;
	protein: number;
	isFallback?: boolean;
}

export interface PlanFallback {
	day: number;
	slot: MealType;
	slotIndex: number;
	reason: string;
}

export interface WeeklyPlan {
	seed: number;
	generatedAt: string;
	prepSet: string[];
	meals: PlannedMeal[];
	targets: NutritionTargets;
	fallbacks: PlanFallback[];
}

export interface AppState {
	schemaVersion: number;
	profile: UserProfile | null;
	plan: WeeklyPlan | null;
}

export interface MealPrepData {
	foods: FoodItem[];
	prepComponents: PrepComponent[];
	meals: Meal[];
}
