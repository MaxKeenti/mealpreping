<script lang="ts">
	import { localizedName, mealPrepData } from '$lib/data';
	import type { MealType } from '$lib/data';
	import MealRow from '$lib/components/MealRow.svelte';
	import { Button, Card } from '$lib/components/ui';
	import { getMeal } from '$lib/logic';
	import { appState, regeneratePlan } from '$lib/state/appState.svelte';
	import { m } from '$lib/paraglide/messages';

	const locale = $derived(appState.profile?.locale ?? 'en');
	const slotLabels = $derived<Record<MealType, string>>({
		breakfast: m.breakfast({}, { locale }),
		lunch: m.lunch({}, { locale }),
		dinner: m.dinner({}, { locale }),
		snack: m.snack({}, { locale })
	});

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
		return localizedName(getMeal(mealPrepData, mealId), locale);
	}
</script>

<svelte:head><title>{m.nav_home({}, { locale })} — {m.app_title({}, { locale })}</title></svelte:head>

<main class="page">
	<header class="home-header">
		<h1>{m.home_title({}, { locale })}</h1>
		<Button href="/settings" size="icon" variant="ghost" aria-label={m.settings({}, { locale })} title={m.settings({}, { locale })}>
			⚙
		</Button>
	</header>

	{#if plan}
		<Card title={m.targets({}, { locale })}>
			<p>{m.calories({}, { locale })}: <strong>{plan.targets.caloriesMin}–{plan.targets.caloriesMax}</strong> {m.kcal_day({}, { locale })}</p>
			<p>{m.protein({}, { locale })}: <strong>{plan.targets.proteinMin}–{plan.targets.proteinMax}</strong> {m.protein_day({}, { locale })}</p>
			<p class="muted">
				{m.today_so_far({}, { locale })}: {todayTotals.calories} kcal · {todayTotals.protein} g {m.protein({}, { locale }).toLowerCase()}
			</p>
		</Card>

		<Card title={m.todays_meals({}, { locale })}>
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

		<Button onclick={regeneratePlan}>{m.regenerate_plan({}, { locale })}</Button>
	{:else}
		<p class="muted">{m.no_plan({}, { locale })}</p>
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
