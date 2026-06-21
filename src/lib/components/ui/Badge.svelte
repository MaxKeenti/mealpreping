<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className = '' }: Props = $props();
</script>

<span class={['badge', className].filter(Boolean).join(' ')}>
	{@render children?.()}
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		width: fit-content;
		border-radius: var(--radius-full);
		background: var(--accent-soft);
		color: var(--accent);
		font-weight: 800;
		font-size: var(--text-xs);
		line-height: 1;
		padding: 0.28rem 0.6rem;
		margin-bottom: var(--space-2);
	}
</style>
