<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label: string;
		hint?: string;
		children?: Snippet;
		class?: string;
	}

	let { label, hint, children, class: className = '' }: Props = $props();
</script>

<label class={['field', className].filter(Boolean).join(' ')}>
	<span class="label">{label}</span>
	{@render children?.()}
	{#if hint}
		<span class="hint">{hint}</span>
	{/if}
</label>

<style>
	.field {
		display: grid;
		gap: var(--space-2);
		margin-bottom: var(--space-3);
	}

	.label {
		font-size: var(--text-sm);
		font-weight: 700;
	}

	.hint {
		color: var(--muted);
		font-size: var(--text-xs);
	}
</style>
