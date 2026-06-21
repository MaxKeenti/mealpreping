<script lang="ts">
	interface Props {
		value: string;
		label: string;
		class?: string;
	}

	let { value, label, class: className = '' }: Props = $props();
</script>

<div class={['stat', className].filter(Boolean).join(' ')}>
	<strong>{value}</strong>
	<span class="muted">{label}</span>
</div>

<style>
	.stat {
		border: 1px solid var(--line);
		border-radius: var(--radius);
		padding: var(--space-3);
		background: var(--fill);
		box-shadow: var(--edge-highlight);
	}

	strong {
		display: block;
		color: var(--accent);
		font-size: var(--text-lg);
		line-height: 1.1;
	}

	span {
		display: block;
		margin-top: var(--space-1);
		font-size: var(--text-xs);
	}
</style>
