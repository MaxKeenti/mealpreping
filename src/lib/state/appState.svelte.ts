import { browser } from '$app/environment';
import type { UserProfile, WeeklyPlan } from '$lib/data';
import { clampPortionMultiplier, generateWeeklyPlan } from '$lib/logic';

const STORAGE_KEY = 'mealpreping:state';
const SCHEMA_VERSION = 1;

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
}

function emptyState(): PersistedState {
	return { schemaVersion: SCHEMA_VERSION, profile: null, plan: null, calorieBump: 0 };
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
		profile: state.profile ?? null,
		plan: state.plan ?? null,
		calorieBump: state.calorieBump ?? 0
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
				calorieBump: appState.calorieBump
			};
			localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
		});
	});
}

/** Onboarding result: save the profile and its first generated plan, land on Home. */
export function completeOnboarding(profile: UserProfile): void {
	appState.profile = profile;
	appState.calorieBump = 0;
	appState.plan = generateWeeklyPlan(profile, { calorieBump: 0 });
}

/** "Regenerate" — reshuffle with a fresh seed, keeping the current +kcal bump. */
export function regeneratePlan(): void {
	if (!appState.profile) {
		return;
	}

	appState.plan = generateWeeklyPlan(appState.profile, {
		seed: Date.now(),
		calorieBump: appState.calorieBump
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
		calorieBump: appState.calorieBump
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
		calorieBump: appState.calorieBump
	});
}
