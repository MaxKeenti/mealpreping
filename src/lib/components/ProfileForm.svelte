<script lang="ts">
	import { applianceLabels, appliances } from '$lib/data';
	import type { ActivityLevel, Appetite, BudgetDial, Goal, UserProfile } from '$lib/data';
	import { Card, Checkbox, CheckboxGroup, Field, Input, ToggleGroup } from '$lib/components/ui';

	// `section` lets the onboarding wizard render one group per step while Settings
	// shows everything at once. `draft` is a shared $state proxy; callers bind it so
	// nested form controls can mutate fields without Svelte ownership warnings.
	let {
		draft = $bindable<UserProfile>(),
		section = 'all'
	}: { draft: UserProfile; section?: 'about' | 'kitchen' | 'all' } = $props();

	const goals: { value: Goal; label: string }[] = [
		{ value: 'gain', label: 'Gain weight' },
		{ value: 'maintain', label: 'Maintain' },
		{ value: 'cut', label: 'Cut' }
	];
	const activityLevels: { value: ActivityLevel; label: string }[] = [
		{ value: 'low', label: 'Low' },
		{ value: 'moderate', label: 'Moderate' },
		{ value: 'high', label: 'High' }
	];
	const appetites: { value: Appetite; label: string }[] = [
		{ value: 'low', label: 'Low' },
		{ value: 'medium', label: 'Medium' },
		{ value: 'high', label: 'High' },
		{ value: 'insatiable', label: 'Insatiable' }
	];
	const budgets: { value: BudgetDial; label: string }[] = [
		{ value: 'tight', label: 'Tight' },
		{ value: 'normal', label: 'Normal' },
		{ value: 'comfortable', label: 'Comfortable' }
	];
	const applianceOptions = appliances.map((appliance) => ({
		value: appliance,
		label: applianceLabels[appliance]
	}));
	const mealCounts = [
		{ value: 1, label: '1' },
		{ value: 2, label: '2' },
		{ value: 3, label: '3' }
	];
</script>

{#if section === 'about' || section === 'all'}
	<Card title="About you">
		<Field label="Height (cm)">
			<Input type="number" min="120" max="220" bind:value={draft.heightCm} />
		</Field>
		<Field label="Weight (kg)">
			<Input type="number" min="30" max="200" bind:value={draft.weightKg} />
		</Field>
		<ToggleGroup label="Goal" options={goals} bind:value={draft.goal} />
		<ToggleGroup label="Activity level" options={activityLevels} bind:value={draft.activityLevel} />
		<ToggleGroup label="Appetite" options={appetites} bind:value={draft.appetite} />
	</Card>
{/if}

{#if section === 'kitchen' || section === 'all'}
	<Card title="Kitchen &amp; meals">
		<CheckboxGroup
			legend="Weekend appliances"
			options={applianceOptions}
			bind:value={draft.weekendAppliances}
		/>
		<CheckboxGroup
			legend="Weekday appliances"
			options={applianceOptions}
			bind:value={draft.weekdayAppliances}
		/>
		<ToggleGroup label="Meals per day" options={mealCounts} bind:value={draft.mealsPerDay} />
		<ToggleGroup label="Budget" options={budgets} bind:value={draft.budgetDial} />
		<Checkbox bind:checked={draft.includeSnacks}>Include snacks</Checkbox>
	</Card>
{/if}
