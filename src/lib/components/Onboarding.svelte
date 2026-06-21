<script lang="ts">
	import { defaultProfile } from '$lib/data';
	import type { UserProfile } from '$lib/data';
	import { Button, Card } from '$lib/components/ui';
	import { calculateNutritionTargets } from '$lib/logic';
	import { completeOnboarding } from '$lib/state/appState.svelte';
	import ProfileForm from '$lib/components/ProfileForm.svelte';

	let step = $state(0);

	// Seed the draft from the reference profile so clicking straight through still
	// produces a valid plan. Copy the arrays so binds don't mutate the default.
	let draft = $state<UserProfile>({
		...defaultProfile,
		weekendAppliances: [...defaultProfile.weekendAppliances],
		weekdayAppliances: [...defaultProfile.weekdayAppliances]
	});

	const targets = $derived.by(() => {
		if (!draft.weightKg || draft.weightKg <= 0) {
			return null;
		}
		return calculateNutritionTargets(draft);
	});

	function finish() {
		completeOnboarding($state.snapshot(draft) as UserProfile);
	}
</script>

<svelte:head><title>Welcome — Mealpreping</title></svelte:head>

<main class="page">
	<h1>Welcome</h1>
	<p class="muted">Step {step + 1} of 3</p>

	{#if step === 0}
		<ProfileForm bind:draft section="about" />
	{:else if step === 1}
		<ProfileForm bind:draft section="kitchen" />
	{:else}
		<Card title="Your starting targets">
			{#if targets}
				<p>Calories: <strong>{targets.caloriesMin}–{targets.caloriesMax}</strong> kcal/day</p>
				<p>Protein: <strong>{targets.proteinMin}–{targets.proteinMax}</strong> g/day</p>
				<p class="muted">Estimates — fine-tune portions later on the Plan tab.</p>
			{:else}
				<p class="muted">Enter your weight to see targets.</p>
			{/if}
		</Card>
	{/if}

	<div class="row">
		{#if step > 0}
			<Button onclick={() => (step -= 1)}>Back</Button>
		{/if}
		{#if step < 2}
			<Button onclick={() => (step += 1)}>Next</Button>
		{:else}
			<Button variant="primary" onclick={finish} disabled={!targets}>
				Generate my plan
			</Button>
		{/if}
	</div>
</main>
