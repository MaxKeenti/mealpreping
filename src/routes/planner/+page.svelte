<script lang="ts">
	import { mealPrepData } from '$lib/data';
	import type { Meal, MealType, PlannedMeal } from '$lib/data';
	import MealRow from '$lib/components/MealRow.svelte';
	import { Card, Checkbox, Stepper, ToggleGroup } from '$lib/components/ui';
	import { buildPrepChecklist, getMeal, nutritionForMeal } from '$lib/logic';
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
	const prepChecklist = $derived(plan ? buildPrepChecklist(plan, mealPrepData) : []);
	const emergencyMeals = $derived.by(() =>
		mealPrepData.meals
			.filter((meal): meal is Meal & { isEmergency: true } => meal.isEmergency === true)
			.map((meal) => ({
				meal,
				nutrition: nutritionForMeal(mealPrepData, meal, plan?.meals[0]?.portionMultiplier ?? multiplier)
			}))
	);

	// Weekend prep check-off state — intentionally session-only (not persisted).
	const checkedPrep = $state<Record<string, boolean>>({});

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

		{#if prepChecklist.length > 0}
			<Card title="Weekend prep checklist">
				{#each prepChecklist as group (group.appliance)}
					<section class="prep-group">
						<h3>{group.label}</h3>
						<ul>
							{#each group.items as item (item.prepId)}
								<li>
									<Checkbox
										bind:checked={checkedPrep[item.prepId]}
										class={checkedPrep[item.prepId] ? 'done' : ''}
									>
										<span class="prep-main">
											<span class="name">{item.name}</span>
											<span class="muted">{item.cookedGrams.toLocaleString('en')} g cooked</span>
										</span>
									</Checkbox>
									<ul class="ingredients">
										{#each item.rawIngredients as ingredient (ingredient.foodId)}
											<li>
												<span>{ingredient.name}</span>
												<span class="muted">{ingredient.friendlyAmount}</span>
											</li>
										{/each}
									</ul>
									{#if item.storageNotes}
										<p class="muted note">{item.storageNotes}</p>
									{/if}
								</li>
							{/each}
						</ul>
					</section>
				{/each}
			</Card>
		{/if}

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

		{#if emergencyMeals.length > 0}
			<Card title="Emergency meals">
				<p class="muted emergency-intro">Keep these as backups for missed prep or a late workday.</p>
				<ul>
					{#each emergencyMeals as entry (entry.meal.id)}
						<MealRow
							label={slotLabels[entry.meal.mealType]}
							name={entry.meal.name}
							calories={entry.nutrition.calories}
							protein={entry.nutrition.protein}
						/>
					{/each}
				</ul>
			</Card>
		{/if}
	{:else}
		<p class="muted">No plan yet — head to Home to generate one.</p>
	{/if}
</main>

<style>
	.prep-group {
		margin-top: var(--space-4);
		padding-top: var(--space-4);
		border-top: 1px solid var(--line);
	}

	.prep-group:first-child {
		margin-top: 0;
		padding-top: 0;
		border-top: 0;
	}

	.prep-main {
		display: grid;
		gap: var(--space-1);
	}

	.name {
		font-weight: 700;
	}

	.ingredients {
		margin: 0 0 var(--space-2) 1.8rem;
	}

	.ingredients li {
		display: flex;
		justify-content: space-between;
		gap: var(--space-2);
		padding: 0.15rem 0;
		font-size: var(--text-sm);
	}

	.note {
		margin: 0 0 var(--space-3) 1.8rem;
		font-size: var(--text-sm);
	}

	.emergency-intro {
		margin-top: 0;
	}

	:global(.done .name) {
		text-decoration: line-through;
		color: var(--muted);
	}

	@media (max-width: 420px) {
		.ingredients li {
			display: grid;
		}
	}
</style>
