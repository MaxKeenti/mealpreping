<script lang="ts">
	import { goto } from '$app/navigation';
	import { defaultProfile } from '$lib/data';
	import type { UserProfile } from '$lib/data';
	import { Button, Card } from '$lib/components/ui';
	import { calculateNutritionTargets } from '$lib/logic';
	import { appState, resetAll, updateProfile } from '$lib/state/appState.svelte';
	import ProfileForm from '$lib/components/ProfileForm.svelte';

	// Editable copy of the saved profile (the shell only routes here once a profile
	// exists; fall back to the reference profile defensively). Arrays are cloned so
	// binds don't mutate the persisted state until Save.
	const source = appState.profile ?? defaultProfile;
	let draft = $state<UserProfile>({
		...source,
		weekendAppliances: [...source.weekendAppliances],
		weekdayAppliances: [...source.weekdayAppliances]
	});

	const targets = $derived.by(() => {
		if (!draft.weightKg || draft.weightKg <= 0) {
			return null;
		}
		return calculateNutritionTargets(draft);
	});

	function save() {
		updateProfile($state.snapshot(draft) as UserProfile);
		goto('/');
	}

	function startOver() {
		if (confirm('Start over? This clears your profile and current plan.')) {
			resetAll();
			goto('/');
		}
	}
</script>

<svelte:head><title>Settings — Mealpreping</title></svelte:head>

<main class="page">
	<h1>Settings</h1>
	<p class="muted">Edit your profile. Saving recomputes targets and rescales your current plan.</p>

	<ProfileForm bind:draft section="all" />

	<Card title="Updated targets">
		{#if targets}
			<p>Calories: <strong>{targets.caloriesMin}–{targets.caloriesMax}</strong> kcal/day</p>
			<p>Protein: <strong>{targets.proteinMin}–{targets.proteinMax}</strong> g/day</p>
			<p class="muted">Estimates — fine-tune portions on the Plan tab.</p>
		{:else}
			<p class="muted">Enter your weight to see targets.</p>
		{/if}
	</Card>

	<div class="row">
		<Button variant="primary" onclick={save} disabled={!targets}>Save</Button>
		<Button onclick={startOver}>Start over</Button>
	</div>
</main>
