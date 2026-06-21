<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLElement> & {
		as?: 'section' | 'header' | 'div';
		title?: string;
		children?: Snippet;
	};

	let {
		as = 'section',
		title,
		children,
		class: className = '',
		...rest
	}: Props = $props();

	const classes = $derived(['card', className].filter(Boolean).join(' '));
</script>

<svelte:element this={as} class={classes} {...rest}>
	{#if title}
		<h2>{title}</h2>
	{/if}
	{@render children?.()}
</svelte:element>

<style>
	.card {
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		padding: var(--space-4);
		margin: 0 0 var(--space-4);
		background: var(--surface);
		-webkit-backdrop-filter: var(--blur);
		backdrop-filter: var(--blur);
		box-shadow: var(--shadow);
	}

	.card :global(:last-child) {
		margin-bottom: 0;
	}
</style>
