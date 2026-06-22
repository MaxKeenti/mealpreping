<script lang="ts">
	import { defaultProfile } from '$lib/data';
	import type { UserProfile } from '$lib/data';
	import { Button, Card } from '$lib/components/ui';
	import { calculateNutritionTargets } from '$lib/logic';
	import { completeOnboarding } from '$lib/state/appState.svelte';
	import ProfileForm from '$lib/components/ProfileForm.svelte';
	import { m } from '$lib/paraglide/messages';

	let step = $state(0);

	// Seed the draft from the reference profile so clicking straight through still
	// produces a valid plan. Copy the arrays so binds don't mutate the default.
	let draft = $state<UserProfile>({
	...defaultProfile,
	weekendAppliances: [...defaultProfile.weekendAppliances],
	weekdayAppliances: [...defaultProfile.weekdayAppliances],
	dislikedFoodIds: [...defaultProfile.dislikedFoodIds]
});

	const targets = $derived.by(() => {
		if (!draft.weightKg || draft.weightKg <= 0) {
			return null;
		}
		return calculateNutritionTargets(draft);
	});
	const locale = $derived(draft.locale);

	function finish() {
		completeOnboarding($state.snapshot(draft) as UserProfile);
	}
</script>

<svelte:head><title>{m.welcome({}, { locale })} — {m.app_title({}, { locale })}</title></svelte:head>

<main class="page">
	<h1>{m.welcome({}, { locale })}</h1>
	<p class="muted">{m.step({}, { locale })} {step + 1} {m.of({}, { locale })} 3</p>

	{#if step === 0}
		<ProfileForm bind:draft section="about" />
	{:else if step === 1}
		<ProfileForm bind:draft section="kitchen" />
	{:else}
		<Card title={m.starting_targets({}, { locale })}>
			{#if targets}
				<p>{m.calories({}, { locale })}: <strong>{targets.caloriesMin}–{targets.caloriesMax}</strong> {m.kcal_day({}, { locale })}</p>
				<p>{m.protein({}, { locale })}: <strong>{targets.proteinMin}–{targets.proteinMax}</strong> {m.protein_day({}, { locale })}</p>
				<p class="muted">{m.target_estimates({}, { locale })}</p>
			{:else}
				<p class="muted">{m.enter_weight_targets({}, { locale })}</p>
			{/if}
		</Card>
	{/if}

	<div class="row">
		{#if step > 0}
			<Button onclick={() => (step -= 1)}>{m.back({}, { locale })}</Button>
		{/if}
		{#if step < 2}
			<Button onclick={() => (step += 1)}>{m.next({}, { locale })}</Button>
		{:else}
			<Button variant="primary" onclick={finish} disabled={!targets}>
				{m.generate_my_plan({}, { locale })}
			</Button>
		{/if}
	</div>
</main>
