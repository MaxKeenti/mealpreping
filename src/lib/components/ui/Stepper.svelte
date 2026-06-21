<script lang="ts">
	interface Props {
		value: number;
		min?: number;
		max?: number;
		step?: number;
		label?: string;
		format?: (value: number) => string;
		onValueChange?: (value: number) => void;
		class?: string;
	}

	let {
		value = $bindable<number>(),
		min,
		max,
		step = 1,
		label = 'Adjust value',
		format = (current: number) => String(current),
		onValueChange,
		class: className = ''
	}: Props = $props();

	const decreaseDisabled = $derived(min !== undefined && value <= min);
	const increaseDisabled = $derived(max !== undefined && value >= max);

	function clamp(next: number): number {
		if (min !== undefined && next < min) return min;
		if (max !== undefined && next > max) return max;
		return next;
	}

	function update(delta: number): void {
		value = clamp(Number((value + delta).toFixed(4)));
		onValueChange?.(value);
	}
</script>

<div class={['stepper', className].filter(Boolean).join(' ')} role="group" aria-label={label}>
	<button type="button" aria-label="Decrease" disabled={decreaseDisabled} onclick={() => update(-step)}>
		−
	</button>
	<span>{format(value)}</span>
	<button type="button" aria-label="Increase" disabled={increaseDisabled} onclick={() => update(step)}>
		+
	</button>
</div>

<style>
	.stepper {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-1);
		border: 1px solid var(--line);
		border-radius: var(--radius-full);
		background: color-mix(in srgb, var(--surface) 72%, transparent);
		-webkit-backdrop-filter: var(--blur);
		backdrop-filter: var(--blur);
	}

	button {
		width: 44px;
		height: 44px;
		display: grid;
		place-items: center;
		padding: 0;
		font: inherit;
		font-size: var(--text-lg);
		font-weight: 800;
		color: inherit;
		border: 1px solid var(--line);
		border-radius: var(--radius-full);
		background: var(--surface-strong);
		cursor: pointer;
	}

	button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	span {
		min-width: 9.5rem;
		text-align: center;
		font-weight: 750;
	}
</style>
