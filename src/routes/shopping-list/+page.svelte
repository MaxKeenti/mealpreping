<script lang="ts">
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
			<section class="card">
				<h2>{group.label}</h2>
				<ul>
					{#each group.items as item (item.foodId)}
						<li>
							<label class:got={checked[item.foodId]}>
								<input type="checkbox" bind:checked={checked[item.foodId]} />
								<span class="name">{item.name}</span>
								<span class="muted">{item.friendlyAmount}</span>
							</label>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	{:else}
		<p class="muted">No plan yet — head to Home to generate one.</p>
	{/if}
</main>

<style>
	li {
		padding: 0.2rem 0;
	}

	label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0;
	}

	label input {
		width: auto;
		min-height: auto;
		margin: 0;
	}

	.name {
		flex: 1;
	}

	.got .name {
		text-decoration: line-through;
		color: var(--muted);
	}
</style>
