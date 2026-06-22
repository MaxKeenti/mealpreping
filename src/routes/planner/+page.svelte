<script lang="ts">
	import { localizedName, mealPrepData } from '$lib/data';
	import type { Meal, MealType, PlannedMeal } from '$lib/data';
	import MealRow from '$lib/components/MealRow.svelte';
	import { Callout, Card, Checkbox, Stepper, ToggleGroup } from '$lib/components/ui';
	import {
		budgetStatus,
		buildPrepChecklist,
		formatCurrencyMxn,
		formatNumber,
		getMeal,
		nutritionForMeal,
		prepSetMinutes,
		weeklyPlanCost
	} from '$lib/logic';
	import {
		appState,
		setCalorieBump,
		setLeftoversMode,
		setMicrowaveOnly,
		setPortionMultiplier
	} from '$lib/state/appState.svelte';
	import { m } from '$lib/paraglide/messages';

	const bumpOptions = [0, 300, 500];

	const plan = $derived(appState.plan);
	const profile = $derived(appState.profile);
	const locale = $derived(profile?.locale ?? 'en');
	const slotLabels = $derived<Record<MealType, string>>({
		breakfast: m.breakfast({}, { locale }),
		lunch: m.lunch({}, { locale }),
		dinner: m.dinner({}, { locale }),
		snack: m.snack({}, { locale })
	});
	const bumpChoices = $derived(
		bumpOptions.map((bump) => ({
			value: bump,
			label: bump === 0 ? m.no_bump({}, { locale }) : `+${bump} kcal`
		}))
	);
	const multiplier = $derived(appState.profile?.portionMultiplier ?? 1);
	const calorieBump = $derived(appState.calorieBump);
	const microwaveOnly = $derived(appState.microwaveOnly);
	const leftoversMode = $derived(appState.leftoversMode);
	const microwaveAvailable = $derived(profile?.weekdayAppliances.includes('microwave') ?? false);
	const prepChecklist = $derived(plan ? buildPrepChecklist(plan, mealPrepData, locale) : []);
	const totalPrepMinutes = $derived(plan ? prepSetMinutes(plan.prepSet, mealPrepData) : 0);
	const cost = $derived(plan ? weeklyPlanCost(plan, mealPrepData) : null);
	const status = $derived(cost && profile ? budgetStatus(cost.totalMxn, profile.weeklyBudgetMxn) : null);
	const fallbackCount = $derived(plan?.fallbacks?.length ?? 0);
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
		return localizedName(getMeal(mealPrepData, mealId), locale);
	}
</script>

<svelte:head><title>{m.nav_plan({}, { locale })} — {m.app_title({}, { locale })}</title></svelte:head>

<main class="page">
	<h1>{m.planner_title({}, { locale })}</h1>

	{#if plan}
		<Card title={m.portions({}, { locale })}>
			<Stepper
				value={multiplier}
				min={0.5}
				max={2}
				step={0.05}
				label={m.portion_multiplier({}, { locale })}
				format={(current) => `${m.multiplier({}, { locale })}: ${current.toFixed(2)}×`}
				onValueChange={setPortionMultiplier}
			/>

			<h3>{m.not_gaining({}, { locale })}</h3>
			<ToggleGroup options={bumpChoices} value={calorieBump} onValueChange={setCalorieBump} />
		</Card>

		<Card title={m.weekly_constraints({}, { locale })}>
			{#if microwaveAvailable}
				<Checkbox
					checked={microwaveOnly}
					onchange={(event) => setMicrowaveOnly(event.currentTarget.checked)}
				>
					{m.microwave_only({}, { locale })}
				</Checkbox>
			{/if}
			<Checkbox
				checked={leftoversMode}
				onchange={(event) => setLeftoversMode(event.currentTarget.checked)}
			>
				{m.leftovers_mode({}, { locale })}
			</Checkbox>
			<p class="muted">{m.weekend_prep({}, { locale })}: {totalPrepMinutes} min</p>
			{#if cost}
				<p class="muted">
					{m.estimated_weekly_cost({}, { locale })}: {formatCurrencyMxn(cost.totalMxn, locale)}
					{#if status}
						· {status.over ? m.over_budget({}, { locale }) : m.under_budget({}, { locale })} {formatCurrencyMxn(Math.abs(status.deltaMxn), locale)}
					{/if}
				</p>
			{/if}
		</Card>

		{#if fallbackCount > 0}
			<Callout>
				{m.constraints_tight({}, { locale })}
			</Callout>
		{/if}

		{#if prepChecklist.length > 0}
			<Card title={m.weekend_prep_checklist({}, { locale })}>
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
											<span class="muted">{formatNumber(item.cookedGrams, 0, locale)} g {m.cooked({}, { locale })}</span>
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
			<Card title={`${m.day({}, { locale })} ${entry.day + 1}`}>
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
				<p class="muted">{m.day_total({}, { locale })}: {entry.calories} kcal · {entry.protein} g {m.protein({}, { locale }).toLowerCase()}</p>
			</Card>
		{/each}

		{#if emergencyMeals.length > 0}
			<Card title={m.emergency_meals({}, { locale })}>
				<p class="muted emergency-intro">{m.emergency_intro({}, { locale })}</p>
				<ul>
					{#each emergencyMeals as entry (entry.meal.id)}
						<MealRow
							label={slotLabels[entry.meal.mealType]}
							name={localizedName(entry.meal, locale)}
							calories={entry.nutrition.calories}
							protein={entry.nutrition.protein}
						/>
					{/each}
				</ul>
			</Card>
		{/if}
	{:else}
		<p class="muted">{m.no_plan_home({}, { locale })}</p>
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
