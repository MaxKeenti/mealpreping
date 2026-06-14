# Mealpreping — Implementation Plan (V1)

> **Revised 2026-06-13** after a full design interview. See
> [`DECISIONS.md`](./DECISIONS.md) for the decision record (D1–D23) and rationale.
> The project direction shifted from a desktop planner to a **mobile-first,
> installable PWA**. Git history preserves the original plan.

## 1. Project direction

Mealpreping is a practical meal-prep planner focused on cheap, nutritious weight
gain for someone becoming independent in Mexico City.

The first version avoids unnecessary complexity. The goal is a useful,
**local-first, mobile-first** app that helps generate weekly meal plans, shopping
lists, and portion suggestions based on the user's profile, appetite, budget, and
available appliances — usable on a phone, on the go, and offline.

## 2. MVP stack

```txt
Framework:      SvelteKit (Svelte 5, runes)          [D2]
Rendering:      Static-first — adapter-static          [D1]
Language:       TypeScript
Styling:        Vanilla CSS + design tokens
                (iOS/macOS "liquid glass" aesthetic)   [D3]
Delivery:       Installable PWA (manifest + SW)         [D4]
i18n:           Paraglide JS (English-only in V1)       [D20]
Persistence:    LocalStorage (single versioned key)     [D17]
Testing:        Vitest (logic units)                    [D22]
Deployment:     Vercel (static)
Package manager: pnpm
Data source:    local TypeScript files
```

## 3. Architecture

- **Static-first (D1).** Prerender `/` and `/guide`; app pages run client-side
  (`ssr = false`) because they read LocalStorage. No server runtime; Vercel serves
  static assets.
- **Mobile-first PWA (D3, D4).** The primary device is a phone. The app installs
  to the home screen, launches chromeless, and works offline (precached bundle) —
  important for using the shopping list in a store with bad signal.
- **Liquid-glass design (D3).** Translucent frosted surfaces (`backdrop-filter`),
  rounded depth, light/dark adaptive, SF system font, generous touch targets,
  driven by CSS design tokens. No Tailwind; no component framework.
- **Svelte 5 runes (D2).** Shared and persisted state lives in `.svelte.ts`
  modules.

## 4. MVP principles

1. Build a useful personal tool before building a platform.
2. No authentication, no database in V1.
3. Keep data local, editable, and **offline-available**.
4. Make the app work without external APIs.
5. **Mobile-first and touch-first** — assume the user is on a phone, on the go.
6. Keep meal/nutrition logic pure, typed, and unit-tested so it can be extended
   safely.
7. Prioritize practical meal prep over calorie-counting perfection — numbers are
   **estimates**.

## 5. Core V1 features

### User profile (D6, D10, D12, D13)

Collected via a short first-run **onboarding wizard**; editable later in
**Settings** (gear icon on Home).

Inputs: height, weight, goal (gain/maintain/cut), appetite, activity level,
**weekend appliances**, **weekday appliances**, meals/day, snacks on/off, budget
dial, optional weekly budget (MXN, stored only).

Outputs: starting calorie target (range), starting protein target (range),
suggested meal-prep intensity.

### Calorie & protein targets (D12, D13)

- Daily calories — weight-based kcal/kg heuristic, output as a **range**,
  calibrated so the 69 kg reference lands at 2,800–3,200 kcal. No age/sex needed.
- Daily protein — `weightKg × 1.6–2.0 g`, output as a range (reference 110–140 g).
- Adjustment — a manual **"+300 / +500 kcal"** control for the not-gaining rule
  (no weight logging in V1).

For the initial user profile:

```txt
Height: 1.94 m
Weight: 69 kg
Starting calories: 2,800–3,200 kcal/day
Protein target: 110–140 g/day
Goal: gain 0.25–0.5 kg/week
```

### Appliance-based, three-tier meal model (D8, D10)

Two appliance contexts:

```txt
Weekend appliances: blender, electric rice cooker, small oven, air fryer
Weekday appliances: microwave oven, electric grill
```

The model has three tiers:

- **FoodItem** — a raw ingredient (nutrition, serving, cost tier, appliances).
- **PrepComponent** — a batch-cooked module made on the weekend (cooked rice,
  cooked lentils, cooked chicken, roasted potatoes, salsa roja, chipotle sauce…),
  with a raw→cooked yield factor and storage notes.
- **Meal** — an assembly of prep components + direct ingredients, tagged with the
  weekday appliances needed to assemble and whether it reheats well.

The weekend prep checklist and shopping list are **derived** from the week's
meals — not hand-authored.

### Meal generator (D14)

Curated assembler, not an optimizer:

```txt
Carb base + protein anchor + sauce + calorie booster + fruit/vegetable
```

1. Pick a weekly **prep set** by appetite/budget/appliances (default: rice +
   lentils + chicken + potatoes + 2 sauces).
2. Assemble **varied** daily meals from prep components + direct ingredients under
   appliance/reheat constraints (no two days identical).
3. **Scale portions** to land in the target ranges.
4. **Seeded** randomness — "Regenerate" reshuffles; a saved plan is reproducible.

### Shopping list generator (D9, D16)

Aggregates raw foods (from prep components, accounting for yield, + direct
ingredients) across the week into grams, then renders friendly units. Grouped by a
dedicated `shoppingCategory`:

```txt
core staples · proteins · dairy · fruits · vegetables · sauces/flavor · pantry/backup
```

### Portion scaling (D15)

- Meals/day and snacks on/off are **generation inputs**.
- A global **portion multiplier** fine-tunes all portions after generation.
- The manual **+kcal bump** raises the target and re-scales.

### Weekend prep checklist & daily templates (D8, D21)

Derived **in-app screens** (not print artifacts): batched prep quantities by
appliance for the weekend, and per-day assembly templates for weekdays.

> **Not in V1:** print/export (all-digital; the offline app replaces paper),
> MXN budget math, weight logging, accounts/sync. See roadmap.

## 6. Information architecture & pages (D5, D6)

Shell: a Home dashboard with an iOS-style **bottom tab bar**.

- **`/` — Home** — today's targets, today's meals, quick actions (Regenerate,
  open Shopping). Gear → Settings. First launch with no profile routes to
  onboarding.
- **`/planner` — Plan** — the generated weekly plan; portion controls; prep
  checklist.
- **`/shopping-list` — Shopping** — grouped ingredients, weekly amounts,
  checkboxes (offline-friendly for in-store use).
- **`/guide` — Guide** — the ported guide content (core system, weekend prep,
  weekday meals, food safety, adjustment rules).
- **`/settings`** — edit profile, appliances, budget dial, meals/day, snacks,
  language.
- **Onboarding** — first-run wizard that computes targets and lands on Home.

## 7. Data model

Full TypeScript sketch lives in [`DECISIONS.md`](./DECISIONS.md). Summary:

- `FoodItem` — `category` (drives generator slots) **and** `shoppingCategory`
  (drives aisle grouping); `costTier: 1|2|3`; per-100g nutrition;
  `defaultServingGrams`; optional `householdUnit`; `appliances` (empty = none).
- `PrepComponent` — `ingredients[]` (rawGrams), `yieldFactor`, `appliance`,
  `reheatsWell`, `storageNotes`.
- `Meal` — `components[]` (prep or food refs + grams), `weekdayAppliances`,
  `reheatsWell`, `weekendPrepRequired`, `isEmergency?`.
- `UserProfile` — height, weight, goal, appetite, activity, **weekendAppliances**,
  **weekdayAppliances**, mealsPerDay, includeSnacks, portionMultiplier,
  budgetDial, weeklyBudgetMxn?, locale.
- `WeeklyPlan` — `seed`, `prepSet[]`, `meals: PlannedMeal[]`, `targets`.
- `AppState` — `schemaVersion`, `profile`, `plan` (the single persisted blob).

`Appliance` enum drops `'none'`.

## 8. Logic modules (D12–D16)

```txt
src/lib/logic/
  targets.ts        calorie + protein ranges from the profile
  generator.ts      curated assembler (seeded), appliance/reheat-aware
  shoppingList.ts   aggregate raw foods -> grouped, friendly units
  prepChecklist.ts  derive weekend batch quantities by appliance
  units.ts          grams <-> household units, raw<->cooked yields
  portions.ts       global multiplier, +kcal bump
```

All pure and unit-tested with Vitest (D22).

## 9. Suggested project structure

```txt
mealpreping/
  src/
    lib/
      data/        foods.ts  prepComponents.ts  meals.ts  appliances.ts
      logic/       targets.ts generator.ts shoppingList.ts
                   prepChecklist.ts units.ts portions.ts
      state/       appState.svelte.ts   (runes + single-key persistence)
      i18n/        Paraglide output + config
      components/  BottomTabBar.svelte GlassCard.svelte MealCard.svelte
                   GroceryList.svelte CalorieTarget.svelte
                   ApplianceSelector.svelte WeekendPrepChecklist.svelte
                   DailyMealTemplate.svelte
    routes/
      +layout.svelte         (tab shell + onboarding gate)
      +page.svelte           (Home dashboard)
      planner/+page.svelte
      shopping-list/+page.svelte
      guide/+page.svelte
      settings/+page.svelte
    service-worker.ts
  messages/                  (Paraglide catalogs: en.json)
  static/manifest.webmanifest
  docs/
    IMPLEMENTATION_PLAN.md
    DECISIONS.md
    CONTEXT.md
```

## 10. Feature roadmap

### V1 — local-first, mobile-first MVP
- Onboarding + profile, calorie/protein target ranges
- Three-tier appliance-aware meal-prep generator (seeded)
- Derived weekly plan, prep checklist, and grocery list
- Portion scaling + manual calorie bump
- Liquid-glass UI, bottom-tab shell
- Installable PWA, offline
- LocalStorage persistence (versioned)
- Guide ported to `/guide`
- Vitest logic tests

### V2 — better planner
- Weekly budget in MXN (real cost math + price data)
- Food dislikes/preferences, prep-time limits
- "Only microwave this week" mode, leftovers mode, snack generator
- es-MX locale (Paraglide already wired)
- JSON export/import (backup + device transfer)
- Weight-trend-aware adjustment hints

### V3 — real app
- Accounts, saved plans, weight tracking, favorites, pantry inventory,
  shopping history, database-backed sync

### V4 — Mexico City differentiator
- Tianguis/supermarket mode, Mexican-staple suggestions, price-aware
  substitutions, "cheapest protein this week," batch-cooking guides by appliance

## 11. Development order (D23 — vertical slice first)

1. ✅ Scaffold SvelteKit + TS + `adapter-static` + Paraglide + Vitest.
2. ✅ Data types + seed data (~30 foods / ~8 prep / ~20 meals).
3. ✅ Logic + unit tests (targets, generator, shopping, units, portions).
4. ✅ Minimal UI flow: onboarding → Home → Plan → Shopping (basic styling).
5. ✅ Persistence (single-key runes state + migration).
6. ✅ Liquid-glass shell — **light pass**: design tokens + frosted tab bar/cards,
   Guide tab, gear → Settings (`/settings`, reusing `ProfileForm`). Full
   GlassCard/MealCard component system deferred.
7. ✅ PWA (manifest + service worker, offline precache, app icons).
8. ✅ Port the guide into `/guide`, restyled and mobile-reflowed.
9. ⏳ Deploy to Vercel — `vercel.json` (static `build/` + SPA rewrite to
   `200.html`) committed; **remaining manual step: connect the repo to a Vercel
   project** in the dashboard to enable Git-integration auto-deploys.

## 12. Notes for contributors / Codex

- Keep food/meal data separate from UI; keep calculation logic in `src/lib/logic`.
- Logic is pure and unit-tested — don't hardcode meal rules in components.
- Respect the three-tier model: ingredients → prep components → meals.
- Preserve the weekend-prep / weekday-assembly concept and the two appliance sets.
- Treat nutrition numbers as rough estimates; keep a `source`/`notes` field.
- Use the original profile as the default example, not the only supported case.
- All new user-facing strings go through Paraglide (English now, es-MX later).
- Do not introduce a backend or accounts until the local-first MVP proves useful.
- Keep `DECISIONS.md` updated when product direction changes.
