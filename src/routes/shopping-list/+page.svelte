<script lang="ts">
	import { mealPrepData } from '$lib/data';
	import { Callout, Card, Checkbox } from '$lib/components/ui';
	import { budgetStatus, buildShoppingList, formatCurrencyMxn, weeklyPlanCost } from '$lib/logic';
	import { appState } from '$lib/state/appState.svelte';
	import { m } from '$lib/paraglide/messages';

	const locale = $derived(appState.profile?.locale ?? 'en');
	const groups = $derived(appState.plan ? buildShoppingList(appState.plan, mealPrepData, locale) : []);
	const cost = $derived(appState.plan ? weeklyPlanCost(appState.plan, mealPrepData) : null);
	const status = $derived(cost ? budgetStatus(cost.totalMxn, appState.profile?.weeklyBudgetMxn) : null);

	// In-store check-off state — intentionally session-only (not persisted).
	const checked = $state<Record<string, boolean>>({});
</script>

<svelte:head><title>{m.nav_shopping({}, { locale })} — {m.app_title({}, { locale })}</title></svelte:head>

<main class="page">
	<h1>{m.shopping_title({}, { locale })}</h1>

	{#if groups.length > 0}
		{#if cost}
			<Callout>
				{m.estimated_total({}, { locale })}: <strong>{formatCurrencyMxn(cost.totalMxn, locale)}</strong>
				{#if status}
					<br />
					{status.over ? m.over_budget({}, { locale }) : m.under_budget({}, { locale })} {formatCurrencyMxn(Math.abs(status.deltaMxn), locale)}.
				{/if}
			</Callout>
		{/if}
		{#each groups as group (group.category)}
			<Card title={group.label}>
				<ul>
					{#each group.items as item (item.foodId)}
						<li>
							<Checkbox
								bind:checked={checked[item.foodId]}
								class={checked[item.foodId] ? 'got' : ''}
							>
								<span class="name">{item.name}</span>
								<span class="muted">
									{item.friendlyAmount} · {formatCurrencyMxn(item.costMxn, locale)}
								</span>
							</Checkbox>
						</li>
					{/each}
				</ul>
				<p class="muted subtotal">{m.subtotal({}, { locale })}: {formatCurrencyMxn(group.totalMxn, locale)}</p>
			</Card>
		{/each}
	{:else}
		<p class="muted">{m.no_plan_home({}, { locale })}</p>
	{/if}
</main>

<style>
	li {
		padding: 0.2rem 0;
	}

	.name {
		flex: 1;
	}

	.subtotal {
		margin-bottom: 0;
		font-size: var(--text-sm);
	}

	:global(.got .name) {
		text-decoration: line-through;
		color: var(--muted);
	}
</style>
