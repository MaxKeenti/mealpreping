<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className = '' }: Props = $props();
</script>

<div class={['table-wrap', className].filter(Boolean).join(' ')}>
	<table>
		{@render children?.()}
	</table>
</div>

<style>
	.table-wrap {
		overflow-x: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		overflow: hidden;
		background: color-mix(in srgb, var(--surface) 58%, transparent);
	}

	:global(th),
	:global(td) {
		padding: 0.65rem;
		border-bottom: 1px solid var(--line);
		text-align: left;
		vertical-align: top;
	}

	:global(th) {
		background: var(--accent-soft);
		color: var(--accent);
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	:global(tr:last-child td) {
		border-bottom: none;
	}
</style>
