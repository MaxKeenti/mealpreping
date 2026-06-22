import { browser } from '$app/environment';
import { defaultProfile } from '$lib/data';
import type { Locale, UserProfile, WeeklyPlan } from '$lib/data';
import { clampPortionMultiplier, generateWeeklyPlan } from '$lib/logic';

const STORAGE_KEY = 'mealpreping:state';
const SCHEMA_VERSION = 2;

/**
 * The single persisted blob (D17). `plan` already carries its generation `seed`,
 * so a reload re-reads the same plan instead of reshuffling. `calorieBump` is the
 * persisted "+kcal" adjustment that the planner controls feed back into the
 * generator's targets.
 */
export interface PersistedState {
	schemaVersion: number;
	profile: UserProfile | null;
	plan: WeeklyPlan | null;
	calorieBump: number;
	microwaveOnly: boolean;
	leftoversMode: boolean;
}

function emptyState(): PersistedState {
	return {
		schemaVersion: SCHEMA_VERSION,
		profile: null,
		plan: null,
		calorieBump: 0,
		microwaveOnly: false,
		leftoversMode: false
	};
}

/**
 * Migration hook. Older payloads are upgraded to the current shape here, oldest
 * version first. Today there is only v1, so this just fills defaults defensively.
 */
function migrate(raw: unknown): PersistedState {
	if (!raw || typeof raw !== 'object') {
		return emptyState();
	}

	const state = raw as Partial<PersistedState>;

	// switch (state.schemaVersion) { case 0: /* upgrade to v1 */ }

	return {
		schemaVersion: SCHEMA_VERSION,
		profile: normalizeProfile(state.profile),
		plan: normalizePlan(state.plan),
		calorieBump: state.calorieBump ?? 0,
		microwaveOnly: state.microwaveOnly ?? false,
		leftoversMode: state.leftoversMode ?? false
	};
}

function load(): PersistedState {
	// Guard `localStorage` even though app pages are `ssr = false`: the module can
	// still be evaluated during prerender of the shell.
	if (typeof localStorage === 'undefined') {
		return emptyState();
	}

	const raw = localStorage.getItem(STORAGE_KEY);
	if (!raw) {
		return emptyState();
	}

	try {
		return migrate(JSON.parse(raw));
	} catch {
		return emptyState();
	}
}

export const appState = $state<PersistedState>(load());

// Auto-persist any change to the blob. Runs only in the browser; the deep read
// inside `JSON.stringify` makes every nested mutation a tracked dependency.
if (browser) {
	$effect.root(() => {
		$effect(() => {
			const snapshot: PersistedState = {
				schemaVersion: SCHEMA_VERSION,
				profile: appState.profile,
				plan: appState.plan,
				calorieBump: appState.calorieBump,
				microwaveOnly: appState.microwaveOnly,
				leftoversMode: appState.leftoversMode
			};
			localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
		});
	});
}

/** Onboarding result: save the profile and its first generated plan, land on Home. */
export function completeOnboarding(profile: UserProfile): void {
	const savedProfile = normalizeProfile(profile) ?? defaultProfile;
	appState.profile = savedProfile;
	appState.calorieBump = 0;
	appState.microwaveOnly = false;
	appState.leftoversMode = false;
	appState.plan = generateWeeklyPlan(savedProfile, generateOptions(savedProfile, { calorieBump: 0 }));
}

/**
 * Settings edit: save a changed profile and recompute targets/portions. The
 * existing plan's seed is preserved so the same meals stay in place and only the
 * numbers rescale (mirrors `setPortionMultiplier`). With no plan yet, generate one.
 */
export function updateProfile(profile: UserProfile): void {
	const savedProfile = normalizeProfile(profile) ?? defaultProfile;
	appState.profile = savedProfile;
	appState.microwaveOnly = appState.microwaveOnly && savedProfile.weekdayAppliances.includes('microwave');
	appState.plan = generateWeeklyPlan(savedProfile, {
		seed: appState.plan?.seed,
		...generateOptions(savedProfile)
	});
}

/** "Start over" — clear the profile and plan, returning to onboarding. */
export function resetAll(): void {
	appState.profile = null;
	appState.plan = null;
	appState.calorieBump = 0;
	appState.microwaveOnly = false;
	appState.leftoversMode = false;
}

/** "Regenerate" — reshuffle with a fresh seed, keeping the current +kcal bump. */
export function regeneratePlan(): void {
	if (!appState.profile) {
		return;
	}

	appState.plan = generateWeeklyPlan(appState.profile, {
		seed: Date.now(),
		...generateOptions(appState.profile)
	});
}

/**
 * Fine-tune portions. Reuses the current seed so the same meals stay in place and
 * only the portions rescale.
 */
export function setPortionMultiplier(multiplier: number): void {
	if (!appState.profile || !appState.plan) {
		return;
	}

	appState.profile.portionMultiplier = clampPortionMultiplier(multiplier);
	appState.plan = generateWeeklyPlan(appState.profile, {
		seed: appState.plan.seed,
		...generateOptions(appState.profile)
	});
}

/** Manual "+kcal" bump. Raises the targets (and therefore portions) in place. */
export function setCalorieBump(bump: number): void {
	if (!appState.profile || !appState.plan) {
		return;
	}

	appState.calorieBump = Math.max(0, bump);
	appState.plan = generateWeeklyPlan(appState.profile, {
		seed: appState.plan.seed,
		...generateOptions(appState.profile)
	});
}

/** Restrict this week to microwave-compatible assembly, preserving the current seed. */
export function setMicrowaveOnly(enabled: boolean): void {
	if (!appState.profile || !appState.plan) {
		return;
	}

	appState.microwaveOnly = enabled && appState.profile.weekdayAppliances.includes('microwave');
	appState.plan = generateWeeklyPlan(appState.profile, {
		seed: appState.plan.seed,
		...generateOptions(appState.profile)
	});
}

/** Cook once, eat twice for each slot in two-day blocks. */
export function setLeftoversMode(enabled: boolean): void {
	if (!appState.profile || !appState.plan) {
		return;
	}

	appState.leftoversMode = enabled;
	appState.plan = generateWeeklyPlan(appState.profile, {
		seed: appState.plan.seed,
		...generateOptions(appState.profile)
	});
}

function generateOptions(profile: UserProfile, overrides: { calorieBump?: number } = {}) {
	return {
		calorieBump: overrides.calorieBump ?? appState.calorieBump,
		dislikedFoodIds: profile.dislikedFoodIds,
		maxPrepMinutes: profile.maxPrepMinutes,
		microwaveOnly: appState.microwaveOnly,
		leftoversMode: appState.leftoversMode
	};
}

function normalizeProfile(profile: UserProfile | null | undefined): UserProfile | null {
	if (!profile) {
		return null;
	}

	const locale: Locale = profile.locale === 'es' ? 'es' : 'en';

	return {
		...defaultProfile,
		...profile,
		weekendAppliances: [...(profile.weekendAppliances ?? defaultProfile.weekendAppliances)],
		weekdayAppliances: [...(profile.weekdayAppliances ?? defaultProfile.weekdayAppliances)],
		dislikedFoodIds: [...(profile.dislikedFoodIds ?? [])],
		locale
	};
}

function normalizePlan(plan: WeeklyPlan | null | undefined): WeeklyPlan | null {
	if (!plan) {
		return null;
	}

	return {
		...plan,
		fallbacks: plan.fallbacks ?? []
	};
}
