<script lang="ts">
	import { mealPrepData } from '$lib/data';
	import type { MealType } from '$lib/data';
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
	<h1>Today</h1>

	{#if plan}
		<section class="card">
			<h2>Targets</h2>
			<p>Calories: <strong>{plan.targets.caloriesMin}–{plan.targets.caloriesMax}</strong> kcal/day</p>
			<p>Protein: <strong>{plan.targets.proteinMin}–{plan.targets.proteinMax}</strong> g/day</p>
			<p class="muted">
				Today so far: {todayTotals.calories} kcal · {todayTotals.protein} g protein
			</p>
		</section>

		<section class="card">
			<h2>Today's meals</h2>
			<ul>
				{#each todayMeals as meal (meal.slotIndex)}
					<li class="meal">
						<span>
							<strong>{slotLabels[meal.slot]}</strong> — {mealName(meal.mealId)}
						</span>
						<span class="muted">{meal.calories} kcal · {meal.protein} g</span>
					</li>
				{/each}
			</ul>
		</section>

		<button type="button" onclick={regeneratePlan}>Regenerate plan</button>
	{:else}
		<p class="muted">No plan yet.</p>
	{/if}
</main>

<style>
	.meal {
		display: flex;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.4rem 0;
		border-bottom: 1px solid var(--line);
	}

	.meal:last-child {
		border-bottom: none;
	}
</style>
