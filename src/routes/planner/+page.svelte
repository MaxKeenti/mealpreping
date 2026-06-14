<script lang="ts">
	import { mealPrepData } from '$lib/data';
	import type { MealType, PlannedMeal } from '$lib/data';
	import { getMeal } from '$lib/logic';
	import { appState, setCalorieBump, setPortionMultiplier } from '$lib/state/appState.svelte';

	const slotLabels: Record<MealType, string> = {
		breakfast: 'Breakfast',
		lunch: 'Lunch',
		dinner: 'Dinner',
		snack: 'Snack'
	};
	const bumpOptions = [0, 300, 500];

	const plan = $derived(appState.plan);
	const multiplier = $derived(appState.profile?.portionMultiplier ?? 1);
	const calorieBump = $derived(appState.calorieBump);

	const days = $derived.by(() => {
		const byDay = new Map<number, PlannedMeal[]>();
		for (const meal of plan?.meals ?? []) {
			const list = byDay.get(meal.day) ?? [];
			list.push(meal);
			byDay.set(meal.day, list);
		}

		return [...byDay.entries()]
			.sort(([left], [right]) => left - right)
			.map(([day, meals]) => ({
				day,
				meals: meals.sort((left, right) => left.slotIndex - right.slotIndex),
				calories: meals.reduce((total, meal) => total + meal.calories, 0),
				protein: meals.reduce((total, meal) => total + meal.protein, 0)
			}));
	});

	function mealName(mealId: string): string {
		return getMeal(mealPrepData, mealId).name;
	}
</script>

<svelte:head><title>Plan — Mealpreping</title></svelte:head>

<main class="page">
	<h1>Weekly plan</h1>

	{#if plan}
		<section class="card">
			<h2>Portions</h2>
			<div class="row">
				<button type="button" onclick={() => setPortionMultiplier(multiplier - 0.05)}>−</button>
				<span>Multiplier: <strong>{multiplier.toFixed(2)}×</strong></span>
				<button type="button" onclick={() => setPortionMultiplier(multiplier + 0.05)}>+</button>
			</div>

			<h3>Not gaining? Add calories</h3>
			<div class="row">
				{#each bumpOptions as bump (bump)}
					<button
						type="button"
						aria-pressed={calorieBump === bump}
						onclick={() => setCalorieBump(bump)}
					>
						{bump === 0 ? 'No bump' : `+${bump} kcal`}
					</button>
				{/each}
			</div>
		</section>

		{#each days as entry (entry.day)}
			<section class="card">
				<h2>Day {entry.day + 1}</h2>
				<ul>
					{#each entry.meals as meal (meal.slotIndex)}
						<li class="meal">
							<span><strong>{slotLabels[meal.slot]}</strong> — {mealName(meal.mealId)}</span>
							<span class="muted">{meal.calories} kcal · {meal.protein} g</span>
						</li>
					{/each}
				</ul>
				<p class="muted">Day total: {entry.calories} kcal · {entry.protein} g protein</p>
			</section>
		{/each}
	{:else}
		<p class="muted">No plan yet — head to Home to generate one.</p>
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
