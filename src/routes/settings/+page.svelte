<script lang="ts">
	import { goto } from '$app/navigation';
	import { defaultProfile } from '$lib/data';
	import type { Locale, UserProfile } from '$lib/data';
	import { Button, Card, ToggleGroup } from '$lib/components/ui';
	import { calculateNutritionTargets } from '$lib/logic';
	import { appState, resetAll, updateProfile } from '$lib/state/appState.svelte';
	import ProfileForm from '$lib/components/ProfileForm.svelte';
	import { m } from '$lib/paraglide/messages';
	import { setLocale } from '$lib/paraglide/runtime';

	// Editable copy of the saved profile (the shell only routes here once a profile
	// exists; fall back to the reference profile defensively). Arrays are cloned so
	// binds don't mutate the persisted state until Save.
	const source = appState.profile ?? defaultProfile;
	let draft = $state<UserProfile>({
	...source,
	weekendAppliances: [...source.weekendAppliances],
	weekdayAppliances: [...source.weekdayAppliances],
	dislikedFoodIds: [...source.dislikedFoodIds]
});

	const targets = $derived.by(() => {
		if (!draft.weightKg || draft.weightKg <= 0) {
			return null;
		}
		return calculateNutritionTargets(draft);
	});
	const locale = $derived(draft.locale);
	const languageOptions = $derived<{ value: Locale; label: string }[]>([
		{ value: 'en', label: m.english({}, { locale }) },
		{ value: 'es', label: m.spanish({}, { locale }) }
	]);

	function save() {
		const saved = $state.snapshot(draft) as UserProfile;
		updateProfile(saved);
		setLocale(saved.locale, { reload: false });
		goto('/');
	}

	function startOver() {
		if (confirm(m.start_over_confirm({}, { locale }))) {
			resetAll();
			goto('/');
		}
	}

	function setLanguage(nextLocale: Locale): void {
		draft.locale = nextLocale;
		setLocale(nextLocale, { reload: false });
	}
</script>

<svelte:head><title>{m.settings_title({}, { locale })} — {m.app_title({}, { locale })}</title></svelte:head>

<main class="page">
	<h1>{m.settings_title({}, { locale })}</h1>
	<p class="muted">{m.settings_intro({}, { locale })}</p>

	<Card title={m.language({}, { locale })}>
		<ToggleGroup options={languageOptions} value={draft.locale} onValueChange={setLanguage} />
	</Card>

	<ProfileForm bind:draft section="all" />

	<Card title={m.updated_targets({}, { locale })}>
		{#if targets}
			<p>{m.calories({}, { locale })}: <strong>{targets.caloriesMin}–{targets.caloriesMax}</strong> {m.kcal_day({}, { locale })}</p>
			<p>{m.protein({}, { locale })}: <strong>{targets.proteinMin}–{targets.proteinMax}</strong> {m.protein_day({}, { locale })}</p>
			<p class="muted">{m.settings_target_note({}, { locale })}</p>
		{:else}
			<p class="muted">{m.enter_weight_targets({}, { locale })}</p>
		{/if}
	</Card>

	<div class="row">
		<Button variant="primary" onclick={save} disabled={!targets}>{m.save({}, { locale })}</Button>
		<Button onclick={startOver}>{m.start_over({}, { locale })}</Button>
	</div>
</main>
