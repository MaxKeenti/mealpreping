<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import { appState } from '$lib/state/appState.svelte';
	import Onboarding from '$lib/components/Onboarding.svelte';

	let { children } = $props();

	const tabs = [
		{ href: '/', label: 'Home' },
		{ href: '/planner', label: 'Plan' },
		{ href: '/shopping-list', label: 'Shopping' },
		{ href: '/guide', label: 'Guide' }
	];
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{#if appState.profile == null}
	<Onboarding />
{:else}
	{@render children()}

	<nav class="tab-bar" aria-label="Primary">
		{#each tabs as tab (tab.href)}
			<a href={tab.href} aria-current={page.url.pathname === tab.href ? 'page' : undefined}>
				{tab.label}
			</a>
		{/each}
	</nav>
{/if}

<style>
	.tab-bar {
		position: fixed;
		inset: auto 0 0 0;
		display: flex;
		gap: var(--space-1);
		border-top: 1px solid var(--line);
		background: var(--surface-strong);
		-webkit-backdrop-filter: var(--blur);
		backdrop-filter: var(--blur);
		box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.08);
		padding: var(--space-2) var(--space-2) calc(var(--space-2) + env(safe-area-inset-bottom));
	}

	.tab-bar a {
		flex: 1;
		min-height: 44px;
		display: grid;
		place-items: center;
		padding: 0.65rem 0.5rem;
		text-align: center;
		text-decoration: none;
		color: inherit;
		font-size: var(--text-sm);
		font-weight: 650;
		border: 1px solid transparent;
		border-radius: var(--radius-full);
	}

	.tab-bar a[aria-current='page'] {
		color: var(--accent);
		border-color: color-mix(in srgb, var(--accent) 26%, transparent);
		background: var(--accent-soft);
		box-shadow: var(--shadow-sm);
	}
</style>
