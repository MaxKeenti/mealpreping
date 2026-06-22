<script lang="ts">
	import { applianceLabel, appliances, foods, localizedName } from '$lib/data';
	import type { ActivityLevel, Appetite, BudgetDial, FoodCategory, Goal, UserProfile } from '$lib/data';
	import { Card, Checkbox, CheckboxGroup, Field, Input, ToggleGroup } from '$lib/components/ui';
	import { m } from '$lib/paraglide/messages';

	// `section` lets the onboarding wizard render one group per step while Settings
	// shows everything at once. `draft` is a shared $state proxy; callers bind it so
	// nested form controls can mutate fields without Svelte ownership warnings.
	let {
		draft = $bindable<UserProfile>(),
		section = 'all'
	}: { draft: UserProfile; section?: 'about' | 'kitchen' | 'all' } = $props();

	const locale = $derived(draft.locale);
	const goals = $derived<{ value: Goal; label: string }[]>([
		{ value: 'gain', label: m.goal_gain({}, { locale }) },
		{ value: 'maintain', label: m.goal_maintain({}, { locale }) },
		{ value: 'cut', label: m.goal_cut({}, { locale }) }
	]);
	const activityLevels = $derived<{ value: ActivityLevel; label: string }[]>([
		{ value: 'low', label: m.level_low({}, { locale }) },
		{ value: 'moderate', label: m.level_moderate({}, { locale }) },
		{ value: 'high', label: m.level_high({}, { locale }) }
	]);
	const appetites = $derived<{ value: Appetite; label: string }[]>([
		{ value: 'low', label: m.level_low({}, { locale }) },
		{ value: 'medium', label: m.appetite_medium({}, { locale }) },
		{ value: 'high', label: m.level_high({}, { locale }) },
		{ value: 'insatiable', label: m.appetite_insatiable({}, { locale }) }
	]);
	const budgets = $derived<{ value: BudgetDial; label: string }[]>([
		{ value: 'tight', label: m.budget_tight({}, { locale }) },
		{ value: 'normal', label: m.budget_normal({}, { locale }) },
		{ value: 'comfortable', label: m.budget_comfortable({}, { locale }) }
	]);
	const applianceOptions = $derived(
		appliances.map((appliance) => ({
			value: appliance,
			label: applianceLabel(appliance, draft.locale)
		}))
	);
	const foodCategoryLabels = $derived<Record<FoodCategory, string>>({
		carb: m.cat_carbs({}, { locale }),
		protein: m.cat_proteins({}, { locale }),
		'protein-carb': m.cat_beans({}, { locale }),
		fat: m.cat_fats({}, { locale }),
		fruit: m.cat_fruit({}, { locale }),
		vegetable: m.cat_vegetables({}, { locale }),
		sauce: m.cat_sauces({}, { locale }),
		dairy: m.cat_dairy({}, { locale })
	});
	const foodCategoryOrder: FoodCategory[] = [
		'carb',
		'protein-carb',
		'protein',
		'dairy',
		'fruit',
		'vegetable',
		'fat',
		'sauce'
	];
	const dislikedFoodGroups = $derived(
		foodCategoryOrder
			.map((category) => ({
				category,
				label: foodCategoryLabels[category],
				options: foods
					.filter((food) => food.category === category)
					.map((food) => ({ value: food.id, label: localizedName(food, draft.locale) }))
			}))
			.filter((group) => group.options.length > 0)
	);
	const prepLimitOptions = $derived([
		{ value: 60, label: '60 min' },
		{ value: 90, label: '90 min' },
		{ value: 120, label: '120 min' },
		{ value: -1, label: m.no_limit({}, { locale }) }
	]);
	const prepLimitValue = $derived(draft.maxPrepMinutes ?? -1);
	const mealCounts = [
		{ value: 1, label: '1' },
		{ value: 2, label: '2' },
		{ value: 3, label: '3' }
	];

	function setPrepLimit(value: number): void {
		draft.maxPrepMinutes = value < 0 ? undefined : value;
	}
</script>

{#if section === 'about' || section === 'all'}
	<Card title={m.profile_about({}, { locale })}>
		<Field label={m.profile_height({}, { locale })}>
			<Input type="number" min="120" max="220" bind:value={draft.heightCm} />
		</Field>
		<Field label={m.profile_weight({}, { locale })}>
			<Input type="number" min="30" max="200" bind:value={draft.weightKg} />
		</Field>
		<ToggleGroup label={m.profile_goal({}, { locale })} options={goals} bind:value={draft.goal} />
		<ToggleGroup label={m.profile_activity({}, { locale })} options={activityLevels} bind:value={draft.activityLevel} />
		<ToggleGroup label={m.profile_appetite({}, { locale })} options={appetites} bind:value={draft.appetite} />
	</Card>
{/if}

{#if section === 'kitchen' || section === 'all'}
	<Card title={m.profile_kitchen({}, { locale })}>
		<CheckboxGroup
			legend={m.profile_weekend_appliances({}, { locale })}
			options={applianceOptions}
			bind:value={draft.weekendAppliances}
		/>
		<CheckboxGroup
			legend={m.profile_weekday_appliances({}, { locale })}
			options={applianceOptions}
			bind:value={draft.weekdayAppliances}
		/>
		<ToggleGroup label={m.profile_meals_per_day({}, { locale })} options={mealCounts} bind:value={draft.mealsPerDay} />
		<ToggleGroup label={m.profile_budget_dial({}, { locale })} options={budgets} bind:value={draft.budgetDial} />
		<Field label={m.profile_weekly_budget({}, { locale })}>
			<Input type="number" min="0" step="10" bind:value={draft.weeklyBudgetMxn} />
		</Field>
		<ToggleGroup
			label={m.profile_prep_time({}, { locale })}
			options={prepLimitOptions}
			value={prepLimitValue}
			onValueChange={setPrepLimit}
		/>
		<Checkbox bind:checked={draft.includeSnacks}>{m.profile_include_snacks({}, { locale })}</Checkbox>
	</Card>

	<Card title={m.profile_disliked_foods({}, { locale })}>
		{#each dislikedFoodGroups as group (group.category)}
			<CheckboxGroup legend={group.label} options={group.options} bind:value={draft.dislikedFoodIds} />
		{/each}
	</Card>
{/if}
