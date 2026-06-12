

# Mealpreping — Implementation Plan

## 1. Project direction

Mealpreping is a practical meal-prep planner focused on cheap, nutritious weight gain for someone becoming independent in Mexico City.

The first version should avoid unnecessary complexity. The goal is to build a useful local-first app that helps generate weekly meal plans, shopping lists, and portion suggestions based on the user’s profile, appetite, budget, and available appliances.

## 2. Recommended MVP stack

```txt
Framework: SvelteKit
Language: TypeScript
Styling: Tailwind CSS or vanilla CSS with design tokens
Deployment: Vercel
Persistence: LocalStorage
Package manager: pnpm
Data source: local TypeScript files / JSON
```

## 3. Why this stack

### SvelteKit

SvelteKit is a good fit because this project is likely to become more interactive than a simple content site. The app may eventually include calculators, saved plans, portion sliders, grocery lists, user preferences, and progress tracking.

Use SvelteKit instead of Astro for the MVP because the core value is interactivity, not just publishing static guide content.

### TypeScript

TypeScript should be used from the beginning because the app will rely heavily on structured data:

- foods
- meals
- appliances
- nutritional values
- user goals
- shopping-list quantities
- meal-plan rules

Strong typing will make the meal generation logic safer and easier to extend.

### Vercel

Vercel is the best deployment target for the MVP because it is simple, has good GitHub integration, and works well for SvelteKit apps.

Use Railway later only if the app needs a persistent backend, background workers, cron jobs, or grocery price scraping.

### LocalStorage

The MVP should not require accounts or a database. LocalStorage is enough for saving:

- user profile
- calorie target
- appliance selection
- budget setting
- preferred meals
- generated weekly plan

A database can be added later when cross-device sync or user accounts become necessary.

## 4. MVP principles

1. Build a useful personal tool before building a platform.
2. Avoid authentication in the first version.
3. Keep data local and editable.
4. Make the app work without external APIs.
5. Structure the app so Codex and future contributors can expand it easily.
6. Prioritize practical meal prep over calorie-counting perfection.

## 5. Core MVP features

### User profile

Inputs:

- height
- weight
- goal: gain weight, maintain, or cut later
- appetite level
- activity level
- available appliances
- weekly budget estimate

Outputs:

- starting calorie target
- starting protein target
- suggested meal-prep intensity

### Calorie and protein target calculator

The app should estimate:

- daily calories
- daily protein target
- weekly weight-gain goal
- adjustment recommendation if weight does not increase

For the initial user profile:

```txt
Height: 1.94 m
Weight: 69 kg
Starting calories: 2,800–3,200 kcal/day
Protein target: 110–140 g/day
Goal: gain 0.25–0.5 kg/week
```

### Appliance-based meal planner

The planner should generate meals based on the user’s available appliances.

Current appliance constraints:

```txt
Weekend appliances:
- blender
- electric rice cooker
- small oven
- air fryer

Weekday appliances:
- microwave oven
- electric grill
```

The app should distinguish between:

- meals that can be cooked in bulk on weekends
- meals that can be reheated during the week
- meals that can be assembled quickly with microwave + electric grill

### Meal prep generator

The generator should create a weekly plan using modules instead of rigid identical meals.

Core formula:

```txt
Carb base + protein anchor + sauce + calorie booster + fruit/vegetable
```

Example modules:

- rice
- lentils or beans
- chicken thighs/legs
- potatoes
- tortillas
- oats
- salsa roja
- creamy chipotle sauce
- peanut butter
- whole milk

### Shopping list generator

The app should generate a weekly grocery list based on the selected plan.

It should group items by category:

- core staples
- proteins
- dairy
- fruits
- vegetables
- sauces/flavor
- emergency meals

### Portion scaling

The app should allow increasing or decreasing portion sizes based on:

- appetite
- weight trend
- budget
- number of meals per day
- whether snacks are included

### Print/export mode

The app should support printing or exporting:

- weekly plan
- shopping list
- weekend prep checklist
- daily meal templates

## 6. Suggested project structure

```txt
mealpreping/
  src/
    lib/
      data/
        foods.ts
        meals.ts
        appliances.ts
        shopping.ts
      logic/
        calories.ts
        mealGenerator.ts
        shoppingList.ts
        portions.ts
      components/
        MealCard.svelte
        GroceryList.svelte
        CalorieTarget.svelte
        ApplianceSelector.svelte
        WeekendPrepChecklist.svelte
        DailyMealTemplate.svelte
    routes/
      +page.svelte
      planner/
        +page.svelte
      shopping-list/
        +page.svelte
      guide/
        +page.svelte
  docs/
    IMPLEMENTATION_PLAN.md
```

## 7. Data model ideas

### Food item

```ts
export type FoodCategory =
  | 'carb'
  | 'protein'
  | 'protein-carb'
  | 'fat'
  | 'fruit'
  | 'vegetable'
  | 'sauce'
  | 'dairy';

export type Appliance =
  | 'none'
  | 'microwave'
  | 'electric-grill'
  | 'rice-cooker'
  | 'blender'
  | 'small-oven'
  | 'air-fryer';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  cheap: boolean;
  caloriesPer100g?: number;
  proteinPer100g?: number;
  appliances: Appliance[];
  mealTypes: MealType[];
  notes?: string;
}
```

Example:

```ts
export const foods: FoodItem[] = [
  {
    id: 'oats',
    name: 'Oats',
    category: 'carb',
    cheap: true,
    proteinPer100g: 13,
    caloriesPer100g: 389,
    appliances: ['microwave', 'none'],
    mealTypes: ['breakfast', 'snack'],
    notes: 'Cheap, calorie-dense, useful with milk, banana, and peanut butter.'
  },
  {
    id: 'lentils',
    name: 'Lentils',
    category: 'protein-carb',
    cheap: true,
    proteinPer100g: 9,
    caloriesPer100g: 116,
    appliances: ['rice-cooker', 'microwave'],
    mealTypes: ['lunch', 'dinner'],
    notes: 'Easier than beans for rice-cooker meal prep.'
  }
];
```

### User profile

```ts
export interface UserProfile {
  heightCm: number;
  weightKg: number;
  goal: 'gain' | 'maintain' | 'cut';
  appetite: 'low' | 'medium' | 'high' | 'insatiable';
  activityLevel: 'low' | 'moderate' | 'high';
  weeklyBudgetMxn?: number;
  appliances: Appliance[];
}
```

### Meal module

```ts
export interface MealModule {
  id: string;
  name: string;
  mealType: MealType;
  carbBase: string[];
  proteinAnchors: string[];
  sauces: string[];
  calorieBoosters: string[];
  fruitOrVegetable: string[];
  reheatsWell: boolean;
  weekendPrepRequired: boolean;
}
```

## 8. Initial app pages

### `/`

Landing page explaining the app:

- cheap nutritious meal prep
- built for real constraints
- Mexico City-friendly staples
- weekend prep, weekday reheating

### `/planner`

Main app page:

- profile form
- appliance selector
- budget selector
- generated calorie/protein targets
- generated weekly meal plan
- portion adjustment controls

### `/shopping-list`

Shopping list page:

- grouped ingredients
- weekly amounts
- optional checkboxes
- print mode

### `/guide`

Static guide page based on the HTML document already created:

- core system
- weekend prep workflow
- weekday meals
- food safety
- adjustment rules

## 9. Feature roadmap

### V1 — local-first MVP

- Height, weight, goal input
- Calorie/protein target calculator
- Appliance-based meal-prep generator
- Grocery list generator
- Weekly plan display
- Portion scaling
- Print/export support
- LocalStorage persistence

### V2 — better planner

- Weekly budget in MXN
- Food dislikes and preferences
- Prep-time limits
- “Only microwave this week” mode
- Leftovers mode
- Snack generator
- Weight trend adjustment

### V3 — real app

- User accounts
- Saved meal plans
- Weight tracking
- Favorite meals
- Pantry inventory
- Shopping history
- Database-backed persistence

### V4 — Mexico City-specific differentiator

- Tianguis/supermarket mode
- Mexican staple suggestions
- Price-aware substitutions
- “Cheapest protein this week” suggestions
- Batch-cooking guides by appliance

## 10. Future backend options

Do not add a backend in the MVP unless necessary.

When the app needs persistence across devices:

```txt
Auth: Supabase Auth, Clerk, Auth.js, or Lucia-style custom auth
Database: Neon Postgres or Supabase Postgres
ORM: Drizzle
Deployment: Vercel
```

When the app needs background jobs:

```txt
Frontend/App: SvelteKit
Backend workers: Railway
Database: Postgres
Scheduled jobs: Railway cron or external scheduler
```

Railway becomes useful later for:

- persistent backend services
- scheduled jobs
- grocery price checking
- scraping or ingestion workers
- heavier APIs

## 11. Development order

Recommended implementation sequence:

1. Create the SvelteKit project with TypeScript.
2. Add base styling and layout.
3. Add static data files for foods, meals, appliances, and shopping categories.
4. Build calorie/protein target logic.
5. Build the user profile form.
6. Save profile data to LocalStorage.
7. Build a simple meal generator.
8. Build a shopping-list generator.
9. Add weekly plan display.
10. Add print/export styles.
11. Move the existing HTML guide content into the `/guide` route.
12. Deploy to Vercel.

## 12. Notes for contributors / Codex

- Keep meal data separate from UI components.
- Keep calculation logic in `src/lib/logic`.
- Avoid hardcoding meal rules inside Svelte components.
- Prefer small, focused files over large all-in-one files.
- Make foods and meals easy to expand.
- Do not introduce authentication or a database until the MVP proves useful.
- Prioritize practical cooking constraints over perfect nutrition math.