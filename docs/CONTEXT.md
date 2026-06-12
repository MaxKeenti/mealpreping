
# Mealpreping — Project Context

## 1. Origin of the project

This project started as a personal planning need: becoming independent in Mexico City and needing a realistic way to eat as cheaply as possible while still getting enough nutrition.

The initial user profile that shaped the project:

```txt
Height: 1.94 m
Weight: 69 kg
Body type: very skinny
Appetite: high / insatiable
Goal: cheap, nutritious weight gain
Location context: Mexico City
```

The plan is not focused on dieting or eating less. It is focused on making cheap food practical, repeatable, and calorie-dense enough to support weight gain.

## 2. Core nutritional direction

The starting target for the original profile is:

```txt
Calories: approximately 2,800–3,200 kcal/day
Protein: approximately 110–140 g/day
Goal: gain around 0.25–0.5 kg per week
```

If weight does not increase after about two weeks, the user should add roughly 300–500 kcal/day.

The app should avoid framing cheap eating as starvation or extreme restriction. The purpose is affordable nourishment.

## 3. Meal-prep constraints

The project is built around a realistic appliance setup.

Weekend cooking appliances:

- blender
- electric rice cooker
- small oven
- air fryer

Weekday appliances:

- microwave oven
- electric grill

This means the app should think in terms of:

- weekend bulk cooking
- weekday reheating
- quick assembly
- modular meals
- food safety

The app should not assume access to a full kitchen every day.

## 4. Core food strategy

The basic meal formula is:

```txt
Carb base + protein anchor + sauce + calorie booster + fruit/vegetable
```

Core cheap staples include:

- rice
- oats
- beans
- lentils
- tortillas
- potatoes
- pasta
- eggs
- chicken thighs or legs
- tuna
- sardines
- whole milk
- bananas
- peanut butter
- peanuts
- salsa
- crema, yogurt, or mayo when useful
- seasonal vegetables

The app should prioritize foods that are:

- cheap in Mexico City
- easy to cook in bulk
- reheatable
- flexible across meals
- calorie-dense enough for weight gain
- nutritionally useful, not just cheap filler

## 5. Meal-prep philosophy

The project should avoid creating 15 identical meal containers.

Instead, the app should generate reusable modules:

- cooked rice
- cooked lentils or beans
- cooked chicken
- roasted potatoes
- sauces
- oats breakfast setup
- emergency meals

Then weekday meals can be assembled as:

- rice bowls
- tacos
- quesadillas
- loaded potatoes
- tortas
- tuna rice bowls
- oatmeal breakfasts
- peanut butter snacks

This keeps the plan cheap while avoiding meal-prep boredom.

## 6. Default weekly system

A good first-week prep looks like:

```txt
Sunday prep:
- 3 cups dry rice
- 700 g lentils
- 1.5–2.5 kg chicken thighs/legs
- 1.5–2 kg potatoes
- salsa roja
- creamy chipotle sauce
- optional boiled eggs
```

Daily rhythm:

```txt
Breakfast: oats + whole milk + banana + peanut butter
Lunch: rice + lentils/beans + chicken + salsa + tortillas
Snack: milk, peanut butter sandwich, banana, yogurt, peanuts, or boiled eggs
Dinner: tacos, quesadillas, loaded potatoes, tuna rice, or torta
```

Snacks are not optional for the original user profile. They are part of the plan because the goal is weight gain.

## 7. Food safety context

Because the project relies heavily on rice, chicken, and legumes, food safety must be treated as a first-class concern.

Important rules:

- refrigerate cooked food within 1–2 hours
- do not leave rice or chicken out overnight
- keep only 2–3 days of food in the fridge when possible
- freeze later-week meals if freezer access exists
- reheat food until steaming hot
- store sauces separately when useful
- avoid reheating the same container repeatedly

If there is no freezer access, the app should recommend prepping 3–4 days max and doing a smaller midweek batch.

## 8. App direction

The app should start as a local-first MVP.

Recommended MVP stack:

```txt
Framework: SvelteKit
Language: TypeScript
Styling: Tailwind CSS or vanilla CSS with design tokens
Deployment: Vercel
Persistence: LocalStorage
Package manager: pnpm
Data source: local TypeScript files / JSON
```

The app should not start with authentication, a database, external APIs, or grocery scraping.

The first useful version should run entirely from local data and browser storage.

## 9. MVP purpose

The MVP should help users answer:

- How much should I roughly eat?
- What can I cook with my available appliances?
- What should I prep this weekend?
- What can I reheat during the week?
- What groceries should I buy?
- How do I increase calories cheaply if I am not gaining weight?
- How do I avoid unsafe meal prep?

## 10. MVP feature scope

Initial features:

- profile form
- calorie and protein target estimate
- appliance selector
- budget selector
- meal-prep generator
- weekly meal plan
- grocery list generator
- portion scaling
- print/export support
- local storage persistence

Out of scope for the first version:

- user accounts
- social features
- payment features
- database-backed sync
- grocery price scraping
- complex nutrition tracking
- barcode scanning
- AI-generated recipes requiring an API

## 11. Product principles

The app should be:

- practical before perfect
- cheap-food friendly without being miserable
- Mexico City-aware
- beginner-friendly for independent living
- clear about appliance constraints
- easy to print or save
- structured enough for Codex and contributors to extend

## 12. Tone and UX direction

The tone should feel supportive, direct, and realistic.

Avoid:

- gym-bro shame
- diet-culture framing
- over-optimization
- pretending every user has a full kitchen
- expensive wellness ingredients
- complicated macro obsession in the MVP

Prefer:

- simple choices
- clear portions
- practical substitutions
- “add this if weight is not going up” guidance
- cheap Mexican staples
- appliance-specific recommendations
- weekend prep checklists

## 13. Notes for future contributors / Codex

- Preserve the weekend-prep / weekday-reheat concept.
- Keep food data separate from UI components.
- Keep nutrition and meal-generation logic in dedicated logic files.
- Avoid hardcoding the original user profile everywhere.
- Use the original profile as the default example, not as the only supported case.
- Make the app extensible for other users, budgets, appliances, and goals.
- Do not introduce a backend until the local-first version is genuinely useful.
- Keep documentation updated when changing product direction.