<script lang="ts">
	import { mealPrepData } from '$lib/data';
	import type { MealType, PlannedMeal } from '$lib/data';
	import MealRow from '$lib/components/MealRow.svelte';
	import { Card, Stepper, ToggleGroup } from '$lib/components/ui';
	import { getMeal } from '$lib/logic';
	import { appState, setCalorieBump, setPortionMultiplier } from '$lib/state/appState.svelte';

	const slotLabels: Record<MealType, string> = {
		breakfast: 'Breakfast',
		lunch: 'Lunch',
		dinner: 'Dinner',
		snack: 'Snack'
	};
	const bumpOptions = [0, 300, 500];
	const bumpChoices = bumpOptions.map((bump) => ({
		value: bump,
		label: bump === 0 ? 'No bump' : `+${bump} kcal`
	}));

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
		<Card title="Portions">
			<Stepper
				value={multiplier}
				min={0.5}
				max={2}
				step={0.05}
				label="Portion multiplier"
				format={(current) => `Multiplier: ${current.toFixed(2)}×`}
				onValueChange={setPortionMultiplier}
			/>

			<h3>Not gaining? Add calories</h3>
			<ToggleGroup options={bumpChoices} value={calorieBump} onValueChange={setCalorieBump} />
		</Card>

		{#each days as entry (entry.day)}
			<Card title={`Day ${entry.day + 1}`}>
				<ul>
					{#each entry.meals as meal (meal.slotIndex)}
						<MealRow
							label={slotLabels[meal.slot]}
							name={mealName(meal.mealId)}
							calories={meal.calories}
							protein={meal.protein}
						/>
					{/each}
				</ul>
				<p class="muted">Day total: {entry.calories} kcal · {entry.protein} g protein</p>
			</Card>
		{/each}
	{:else}
		<p class="muted">No plan yet — head to Home to generate one.</p>
	{/if}
</main>
