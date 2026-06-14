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
		{ href: '/shopping-list', label: 'Shopping' }
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
		border-top: 1px solid var(--line);
		background: Canvas;
	}

	.tab-bar a {
		flex: 1;
		min-height: 44px;
		padding: 0.75rem;
		text-align: center;
		text-decoration: none;
		color: inherit;
	}

	.tab-bar a[aria-current='page'] {
		font-weight: 700;
		background: var(--fill);
	}
</style>
