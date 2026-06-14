# Mealpreping — Design Decisions (V1)

**Status:** Accepted · **Date:** 2026-06-13 · **Owner:** Max Gonzalez

This is the decision record produced from a full design interview over
`IMPLEMENTATION_PLAN.md`. It captures *what* we decided, *why*, and the
*consequences*. The interview reframed the project from a desktop planner into a
**mobile-first, installable PWA**. Where this record and the original plan
conflicted, the plan was reconciled to match this document.

The headline stack choices (SvelteKit, TypeScript, pnpm, Vercel, LocalStorage)
were treated as already settled and not re-litigated.

---

## Decisions

### Architecture & platform

**D1 — Static-first rendering.**
`adapter-static`; prerender `/` and `/guide`; `ssr = false` on app pages
(they read LocalStorage); no server runtime.
*Why:* matches "no backend"; avoids SSR/LocalStorage hydration flashes; Vercel
just serves static assets.

**D2 — Svelte 5 + runes.**
`$state`/`$derived`/`$effect`/`$props`; shared and persisted state lives in
runes-based `.svelte.ts` modules.
*Why:* current default and best long-term path for a from-scratch build.

**D3 — Liquid-glass aesthetic, mobile-first.**
Vanilla CSS with design tokens (no Tailwind, no SRCL). Translucent frosted
surfaces (`backdrop-filter: blur() saturate()`), continuous/rounded corners,
soft layered depth, hairline borders, light/dark adaptive, SF system font,
generous touch targets.
*Why:* the app's primary use is on-the-go on a phone; SRCL's terminal aesthetic
isn't touch-friendly. SRCL was evaluated (it's React/Next, so not importable
into Svelte) and dropped.
*Consequence:* the existing HTML guide's warm palette is replaced when ported.

**D4 — Full PWA.**
Web manifest + SvelteKit service worker. Installs to the home screen, launches
chromeless, precaches the static bundle for offline use.
*Why:* "on the go" implies in-store use with bad signal; home-screen install also
makes LocalStorage persistence reliable on iOS. Low-risk since there's no backend.

### Information architecture

**D5 — Home + bottom tab bar.**
`/` is a dashboard (today's targets + meals + quick actions). Bottom tabs:
**Home · Plan · Shopping · Guide**. No marketing landing page.
*Why:* an installed PWA should open straight into the tool.

**D6 — Onboarding + gear→Settings.**
First launch (no saved profile) runs a short multi-step onboarding wizard →
computes targets → lands on Home. Profile editable later via a gear icon →
Settings screen. Keeps the tab bar at 4.

### Data model

**D7 — Computed-but-rough engine.**
Foods carry per-100g nutrition + a default serving in grams. Meals reference food
IDs with default quantities. The generator sums to rough daily totals and the
shopping list aggregates quantities. **Numbers are presented as estimates.**
*Why:* the three headline features (how much to eat / what to buy / how to bump
calories) need numbers, but the docs explicitly reject calorie-counting perfection.

**D8 — Three-tier model.**
`FoodItem` → `PrepComponent` (batch-cooked module) → `Meal` (assembly of prep
components + direct ingredients). The weekend prep checklist and shopping list
are *derived*, not hand-authored.
*Why:* the weekend-prep / weekday-assembly loop is the project's differentiator.
The plan's flat `MealModule` becomes `PrepComponent` + `Meal`.

**D9 — Grams-canonical units.**
Everything stored in grams (mL ≈ g). Each food has a default serving in grams +
optional household unit (`{ label, gramsPerUnit }`) for friendly display. Each
prep component carries a raw→cooked `yieldFactor`. Pack-size rounding deferred.

**D10 — Two appliance sets.**
Profile has `weekendAppliances` and `weekdayAppliances`. The generator validates
batch `PrepComponent`s against the weekend set and `Meal` assembly against the
weekday set. `'none'` is dropped from the `Appliance` enum (an empty appliance
list means "no appliance needed").

**D11 — Coarse cost tier, no MXN math.**
Per-food `costTier: 1 | 2 | 3` (cheap/mid/premium). Budget is a qualitative dial
(tight/normal/comfortable) nudging portions and protein choices. `weeklyBudgetMxn`
may be stored but is not computed against. Real MXN budgeting is V2.

**D16 — Separate shopping category + emergency meals.**
Each food carries a `shoppingCategory` (aisle group) distinct from its nutritional
`category`. Emergency meals are `Meal`s flagged `isEmergency` (shelf-stable,
no-prep), surfaced as their own UI section.

### Logic

**D12 — Calorie target = weight-based heuristic → range.**
`calories/day ≈ weightKg × (activity + goal multiplier)`, calibrated so the 69 kg
reference profile lands at 2,800–3,200. Appetite nudges within the band. Output a
**range**, not a point estimate. No age/sex collected.

**D13 — Protein target = g/kg → range.**
`protein/day ≈ weightKg × 1.6–2.0 g` (gain/maintain), calibrated to the reference
110–140 g. Goal tier shifts the band. Output a range.

**D14 — Generator = curated assembler.**
(1) Pick a weekly prep set by appetite/budget/appliances (default: rice + lentils
+ chicken + potatoes + 2 sauces). (2) Assemble varied daily meals from prep
components + direct ingredients under appliance/reheat constraints (no two days
identical). (3) Scale portions to hit target ranges. (4) **Seeded randomness** so
"Regenerate" reshuffles but a saved plan is reproducible.

**D15 — Portion scaling.**
Meals/day and snacks on/off are *generation inputs*. A global portion multiplier
fine-tunes all portions after generation. A manual "+300 / +500 kcal" button
handles the not-gaining rule. **No weight logging in V1** (that's V3).

### Persistence, content, i18n

**D17 — Single versioned LocalStorage key.**
All state under one namespaced JSON blob (`mealpreping:state`) with a
`schemaVersion` and migration hook, hydrated into runes modules, auto-saved via
`$effect`. The generation seed is persisted with the plan. Makes export trivial
and future-proofs schema changes.

**D18 — Port guide to Svelte + restyle.**
Re-author the existing HTML guide as Svelte component(s) using the liquid-glass
tokens, reflowed for mobile with section nav. Drop the guide's inline CSS, keep
the content. (Later: extract food-safety / adjustment rules into structured data
for contextual surfacing.)

**D19 — Seed data ≈ 30 foods / 8 prep / 20 meals.**
Enough for a varied 7-day plan across all meal types, seeded from the CONTEXT.md
staples and the guide's meals. Rough estimated numbers with a `source`/`notes`
field per food.

**D20 — Paraglide JS for i18n.**
Compiler-based, type-safe messages. **English-only in V1**, fully wired so es-MX
can be added without a retrofit. Locale strategy = **persisted runtime selection**
(cookie/localStorage, switched in Settings), *not* URL-prefixed routes — suits an
installed home-screen PWA.

### Scope & process

**D21 — No print/export in V1 (all-digital).**
The live offline PWA covers in-store/kitchen use. JSON backup/export is deferred
(cheap to add later via D17). The weekend prep checklist and daily templates are
**in-app screens**, not print artifacts.

**D22 — Vitest unit tests on the logic.**
Cover calorie/protein calc, generator constraints, shopping aggregation, and
unit/yield conversions. No e2e in V1 (add Playwright later).

**D23 — Vertical slice first, then polish.**
Scaffold → data + tested logic → minimal onboarding/Home/Plan/Shopping flow →
persistence → *then* liquid-glass design, tab shell, PWA, guide port. De-risks the
engine before investing in polish.

---

## Material changes from the original plan

- Reframed **desktop planner → mobile-first installable PWA**.
- `/` marketing **landing removed** → Home dashboard; routes become tab screens +
  onboarding/Settings.
- **Print/export** demoted from a core feature to out-of-V1.
- Data model substantially **expanded** (three-tier; two appliance sets;
  units/yields; cost tier; shopping category; emergency-meal flag).
- **New dependencies:** Paraglide (i18n); service worker + manifest (PWA).
- Calorie/protein become **heuristic ranges**, not formulas requiring age/sex.
- Styling locked to **vanilla CSS tokens / liquid glass** (Tailwind and SRCL
  both rejected).

---

## Consolidated data model (V1 sketch)

```ts
export type FoodCategory =
  | 'carb' | 'protein' | 'protein-carb' | 'fat'
  | 'fruit' | 'vegetable' | 'sauce' | 'dairy';

export type ShoppingCategory =
  | 'core-staples' | 'proteins' | 'dairy' | 'fruits'
  | 'vegetables' | 'sauces-flavor' | 'pantry-backup';

export type Appliance =
  | 'microwave' | 'electric-grill' | 'rice-cooker'
  | 'blender' | 'small-oven' | 'air-fryer'; // 'none' dropped

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type CostTier = 1 | 2 | 3; // 1 = cheap, 3 = premium

export interface HouseholdUnit {
  label: 'piece' | 'cup' | 'tbsp' | 'tsp' | 'slice' | 'scoop';
  gramsPerUnit: number;
}

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;            // drives generator formula slots
  shoppingCategory: ShoppingCategory; // drives shopping grouping
  costTier: CostTier;
  caloriesPer100g: number;
  proteinPer100g: number;
  defaultServingGrams: number;
  householdUnit?: HouseholdUnit;     // friendly display ("2 eggs")
  appliances: Appliance[];           // empty = no appliance needed
  mealTypes: MealType[];
  source?: string;                   // provenance of the estimate
  notes?: string;
}

// A batch-cooked module produced during weekend prep.
export interface PrepComponent {
  id: string;
  name: string;                      // "Cooked rice", "Salsa roja"
  ingredients: { foodId: string; rawGrams: number }[];
  yieldFactor: number;               // cooked grams / total raw grams
  appliance: Appliance;              // weekend appliance used
  reheatsWell: boolean;
  storageNotes?: string;             // food-safety surfacing
}

// A meal = assembly of prep components and/or direct ingredients.
export interface MealComponent {
  ref:
    | { kind: 'prep'; prepId: string }
    | { kind: 'food'; foodId: string };
  grams: number;                     // cooked grams for prep refs
}

export interface Meal {
  id: string;
  name: string;
  mealType: MealType;
  components: MealComponent[];
  weekdayAppliances: Appliance[];    // to assemble (empty = none)
  reheatsWell: boolean;
  weekendPrepRequired: boolean;      // true if it uses any PrepComponent
  isEmergency?: boolean;             // shelf-stable, no-prep backup
  notes?: string;
}

export interface UserProfile {
  heightCm: number;
  weightKg: number;
  goal: 'gain' | 'maintain' | 'cut';
  appetite: 'low' | 'medium' | 'high' | 'insatiable';
  activityLevel: 'low' | 'moderate' | 'high';
  weekendAppliances: Appliance[];
  weekdayAppliances: Appliance[];
  mealsPerDay: number;               // default 3
  includeSnacks: boolean;            // default true for 'gain'
  portionMultiplier: number;         // default 1.0
  budgetDial: 'tight' | 'normal' | 'comfortable';
  weeklyBudgetMxn?: number;          // stored, not computed in V1
  locale: 'en';                      // es-MX later
}

export interface NutritionTargets {
  caloriesMin: number; caloriesMax: number;
  proteinMin: number;  proteinMax: number;
}

// A concrete meal placed in the plan, with computed rough totals.
export interface PlannedMeal {
  mealId: string;
  day: number;                       // 0..6
  slot: MealType;
  portionMultiplier: number;
  calories: number;                  // rough, computed
  protein: number;                   // rough, computed
}

export interface WeeklyPlan {
  seed: number;                      // reproducible regeneration
  generatedAt: string;
  prepSet: string[];                 // PrepComponent ids cooked this week
  meals: PlannedMeal[];
  targets: NutritionTargets;
}

export interface AppState {
  schemaVersion: number;
  profile: UserProfile | null;
  plan: WeeklyPlan | null;
}
```

---

## Open items (to settle during implementation)

- Exact kcal/kg and g/kg multipliers per activity/goal tier (calibrate so the
  69 kg reference lands at ~2,800–3,200 kcal / 110–140 g).
- Defaults: **3 meals + 2 snacks**, snacks **on** for the `gain` goal
  ("snacks are not optional" per CONTEXT.md).
- Food safety in V1 surfaces via the guide + `PrepComponent.storageNotes`;
  contextual wiring (e.g., to the +kcal button) is later.
- Liquid-glass token values, component inventory, and contrast/a11y over
  translucent surfaces (preserve the guide's skip-link / aria mindset).
- Whether to include Web Share alongside the deferred JSON export.
