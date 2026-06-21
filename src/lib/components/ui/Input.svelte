<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	type InputValue = string | number | readonly string[] | undefined;

	type Props = HTMLInputAttributes & {
		value?: InputValue;
	};

	let { value = $bindable<InputValue>(), class: className = '', ...rest }: Props = $props();
</script>

<input class={['input', className].filter(Boolean).join(' ')} bind:value {...rest} />

<style>
	.input {
		width: 100%;
		min-height: 44px;
		padding: 0.55rem 0.75rem;
		font: inherit;
		color: inherit;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: color-mix(in srgb, var(--surface-strong) 72%, transparent);
		-webkit-backdrop-filter: var(--blur);
		backdrop-filter: var(--blur);
		box-shadow: var(--edge-highlight);
		transition:
			border-color 160ms ease,
			box-shadow 160ms ease;
	}

	.input:focus-visible {
		outline: none;
		border-color: color-mix(in srgb, var(--accent) 55%, transparent);
		box-shadow:
			var(--edge-highlight),
			0 0 0 3px var(--accent-soft);
	}
</style>
