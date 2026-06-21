<script lang="ts">
	import type { Snippet } from 'svelte';
	import Badge from './Badge.svelte';

	interface Props {
		title?: string;
		tag?: string;
		children?: Snippet;
		class?: string;
	}

	let { title, tag, children, class: className = '' }: Props = $props();
</script>

<div class={['panel', className].filter(Boolean).join(' ')}>
	{#if tag}
		<Badge>{tag}</Badge>
	{/if}
	{#if title}
		<h3>{title}</h3>
	{/if}
	{@render children?.()}
</div>

<style>
	.panel {
		border: 1px solid var(--line);
		border-radius: var(--radius);
		padding: var(--space-3);
		background: var(--fill);
		box-shadow: var(--edge-highlight);
	}

	.panel :global(h3) {
		margin-top: 0;
	}

	.panel :global(:last-child) {
		margin-bottom: 0;
	}
</style>
