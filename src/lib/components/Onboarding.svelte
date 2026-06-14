<script lang="ts">
	import { applianceLabels, appliances, defaultProfile } from '$lib/data';
	import type { ActivityLevel, Appetite, BudgetDial, Goal, UserProfile } from '$lib/data';
	import { calculateNutritionTargets } from '$lib/logic';
	import { completeOnboarding } from '$lib/state/appState.svelte';

	let step = $state(0);

	// Seed the draft from the reference profile so clicking straight through still
	// produces a valid plan. Copy the arrays so binds don't mutate the default.
	const draft = $state<UserProfile>({
		...defaultProfile,
		weekendAppliances: [...defaultProfile.weekendAppliances],
		weekdayAppliances: [...defaultProfile.weekdayAppliances]
	});

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

	const targets = $derived.by(() => {
		if (!draft.weightKg || draft.weightKg <= 0) {
			return null;
		}
		return calculateNutritionTargets(draft);
	});

	function finish() {
		completeOnboarding($state.snapshot(draft) as UserProfile);
	}
</script>

<svelte:head><title>Welcome — Mealpreping</title></svelte:head>

<main class="page">
	<h1>Welcome</h1>
	<p class="muted">Step {step + 1} of 3</p>

	{#if step === 0}
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
	{:else if step === 1}
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
	{:else}
		<section class="card">
			<h2>Your starting targets</h2>
			{#if targets}
				<p>Calories: <strong>{targets.caloriesMin}–{targets.caloriesMax}</strong> kcal/day</p>
				<p>Protein: <strong>{targets.proteinMin}–{targets.proteinMax}</strong> g/day</p>
				<p class="muted">Estimates — fine-tune portions later on the Plan tab.</p>
			{:else}
				<p class="muted">Enter your weight to see targets.</p>
			{/if}
		</section>
	{/if}

	<div class="row">
		{#if step > 0}
			<button type="button" onclick={() => (step -= 1)}>Back</button>
		{/if}
		{#if step < 2}
			<button type="button" onclick={() => (step += 1)}>Next</button>
		{:else}
			<button type="button" onclick={finish} disabled={!targets}>Generate my plan</button>
		{/if}
	</div>
</main>
