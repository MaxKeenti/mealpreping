<script lang="ts">
	import { applianceLabels, appliances } from '$lib/data';
	import type { ActivityLevel, Appetite, BudgetDial, Goal, UserProfile } from '$lib/data';

	// `section` lets the onboarding wizard render one group per step while Settings
	// shows everything at once. `draft` is a shared $state proxy — the fields below
	// mutate its properties in place, so no two-way `bind:` of the object is needed.
	let {
		draft,
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
</script>

{#if section === 'about' || section === 'all'}
	<section class="card">
		<h2>About you</h2>
		<label>
			Height (cm)
			<input type="number" min="120" max="220" bind:value={draft.heightCm} />
		</label>
		<label>
			Weight (kg)
			<input type="number" min="30" max="200" bind:value={draft.weightKg} />
		</label>
		<label>
			Goal
			<select bind:value={draft.goal}>
				{#each goals as goal (goal.value)}
					<option value={goal.value}>{goal.label}</option>
				{/each}
			</select>
		</label>
		<label>
			Activity level
			<select bind:value={draft.activityLevel}>
				{#each activityLevels as level (level.value)}
					<option value={level.value}>{level.label}</option>
				{/each}
			</select>
		</label>
		<label>
			Appetite
			<select bind:value={draft.appetite}>
				{#each appetites as appetite (appetite.value)}
					<option value={appetite.value}>{appetite.label}</option>
				{/each}
			</select>
		</label>
	</section>
{/if}

{#if section === 'kitchen' || section === 'all'}
	<section class="card">
		<h2>Kitchen &amp; meals</h2>
		<fieldset>
			<legend>Weekend appliances</legend>
			{#each appliances as appliance (appliance)}
				<label>
					<input type="checkbox" value={appliance} bind:group={draft.weekendAppliances} />
					{applianceLabels[appliance]}
				</label>
			{/each}
		</fieldset>
		<fieldset>
			<legend>Weekday appliances</legend>
			{#each appliances as appliance (appliance)}
				<label>
					<input type="checkbox" value={appliance} bind:group={draft.weekdayAppliances} />
					{applianceLabels[appliance]}
				</label>
			{/each}
		</fieldset>
		<label>
			Meals per day
			<select bind:value={draft.mealsPerDay}>
				<option value={1}>1</option>
				<option value={2}>2</option>
				<option value={3}>3</option>
			</select>
		</label>
		<label>
			Budget
			<select bind:value={draft.budgetDial}>
				{#each budgets as budget (budget.value)}
					<option value={budget.value}>{budget.label}</option>
				{/each}
			</select>
		</label>
		<fieldset>
			<legend>Snacks</legend>
			<label>
				<input type="checkbox" bind:checked={draft.includeSnacks} />
				Include snacks
			</label>
		</fieldset>
	</section>
{/if}
