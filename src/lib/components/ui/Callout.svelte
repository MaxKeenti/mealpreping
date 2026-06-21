<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className = '' }: Props = $props();
</script>

<div class={['callout', className].filter(Boolean).join(' ')}>
	{@render children?.()}
</div>

<style>
	.callout {
		margin: var(--space-4) 0;
		padding: var(--space-3);
		border: 1px solid color-mix(in srgb, var(--accent) 22%, var(--line));
		border-radius: var(--radius);
		background: color-mix(in srgb, var(--accent) 9%, transparent);
		box-shadow: inset 0 1px 0 color-mix(in srgb, white 14%, transparent);
	}

	.callout :global(:last-child) {
		margin-bottom: 0;
	}
</style>
