<script lang="ts">
	import { Card, Checkbox } from '$lib/components/ui';
	import { buildShoppingList } from '$lib/logic';
	import { appState } from '$lib/state/appState.svelte';

	const groups = $derived(appState.plan ? buildShoppingList(appState.plan) : []);

	// In-store check-off state — intentionally session-only (not persisted).
	const checked = $state<Record<string, boolean>>({});
</script>

<svelte:head><title>Shopping — Mealpreping</title></svelte:head>

<main class="page">
	<h1>Shopping list</h1>

	{#if groups.length > 0}
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
								<span class="muted">{item.friendlyAmount}</span>
							</Checkbox>
						</li>
					{/each}
				</ul>
			</Card>
		{/each}
	{:else}
		<p class="muted">No plan yet — head to Home to generate one.</p>
	{/if}
</main>

<style>
	li {
		padding: 0.2rem 0;
	}

	.name {
		flex: 1;
	}

	:global(.got .name) {
		text-decoration: line-through;
		color: var(--muted);
	}
</style>
