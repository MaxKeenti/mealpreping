<script lang="ts">
	import { mealPrepData } from '$lib/data';
	import type { MealType } from '$lib/data';
	import MealRow from '$lib/components/MealRow.svelte';
	import { Button, Card } from '$lib/components/ui';
	import { getMeal } from '$lib/logic';
	import { appState, regeneratePlan } from '$lib/state/appState.svelte';

	const slotLabels: Record<MealType, string> = {
		breakfast: 'Breakfast',
		lunch: 'Lunch',
		dinner: 'Dinner',
		snack: 'Snack'
	};

	// 0 (Sun)..6 (Sat) — a stable "today" index into the generic 7-day plan.
	const todayIndex = new Date().getDay();

	const plan = $derived(appState.plan);
	const todayMeals = $derived(
		(plan?.meals ?? [])
			.filter((meal) => meal.day === todayIndex)
			.sort((left, right) => left.slotIndex - right.slotIndex)
	);
	const todayTotals = $derived(
		todayMeals.reduce(
			(totals, meal) => ({
				calories: totals.calories + meal.calories,
				protein: totals.protein + meal.protein
			}),
			{ calories: 0, protein: 0 }
		)
	);

	function mealName(mealId: string): string {
		return getMeal(mealPrepData, mealId).name;
	}
</script>

<svelte:head><title>Home — Mealpreping</title></svelte:head>

<main class="page">
	<header class="home-header">
		<h1>Today</h1>
		<Button href="/settings" size="icon" variant="ghost" aria-label="Settings" title="Settings">
			⚙
		</Button>
	</header>

	{#if plan}
		<Card title="Targets">
			<p>Calories: <strong>{plan.targets.caloriesMin}–{plan.targets.caloriesMax}</strong> kcal/day</p>
			<p>Protein: <strong>{plan.targets.proteinMin}–{plan.targets.proteinMax}</strong> g/day</p>
			<p class="muted">
				Today so far: {todayTotals.calories} kcal · {todayTotals.protein} g protein
			</p>
		</Card>

		<Card title="Today's meals">
			<ul>
				{#each todayMeals as meal (meal.slotIndex)}
					<MealRow
						label={slotLabels[meal.slot]}
						name={mealName(meal.mealId)}
						calories={meal.calories}
						protein={meal.protein}
					/>
				{/each}
			</ul>
		</Card>

		<Button onclick={regeneratePlan}>Regenerate plan</Button>
	{:else}
		<p class="muted">No plan yet.</p>
	{/if}
</main>

<style>
	.home-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: var(--space-4);
	}
</style>
