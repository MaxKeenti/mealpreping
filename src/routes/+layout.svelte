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
	/* Floating glass capsule that hovers above the content. */
	.tab-bar {
		position: fixed;
		inset: auto 0 calc(env(safe-area-inset-bottom) + var(--space-3)) 0;
		width: min(640px, calc(100% - var(--space-4) * 2));
		margin: 0 auto;
		display: flex;
		gap: var(--space-1);
		border: 1px solid color-mix(in srgb, white 24%, var(--line));
		border-radius: var(--radius-full);
		background: var(--surface-strong);
		-webkit-backdrop-filter: var(--blur);
		backdrop-filter: var(--blur);
		box-shadow: var(--shadow-lg), var(--edge-highlight);
		padding: var(--space-1);
	}

	.tab-bar a {
		position: relative;
		flex: 1;
		min-height: 44px;
		display: grid;
		place-items: center;
		padding: 0.6rem 0.5rem;
		text-align: center;
		text-decoration: none;
		color: var(--muted);
		font-size: var(--text-sm);
		font-weight: 650;
		border-radius: var(--radius-full);
		transition:
			color 200ms ease,
			background 200ms ease,
			box-shadow 200ms ease,
			transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.tab-bar a:active {
		transform: scale(0.94);
	}

	/* The liquid pill that slides under the active tab. */
	.tab-bar a[aria-current='page'] {
		color: var(--accent);
		background: linear-gradient(
			180deg,
			color-mix(in srgb, var(--accent) 22%, transparent),
			color-mix(in srgb, var(--accent) 12%, transparent)
		);
		box-shadow:
			var(--shadow-sm),
			inset 0 1px 0 color-mix(in srgb, white 40%, transparent);
	}
</style>
