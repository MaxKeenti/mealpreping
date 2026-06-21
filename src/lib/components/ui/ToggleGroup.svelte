<script lang="ts" generics="T extends string | number">
	type ToggleOption<TValue extends string | number> = {
		value: TValue;
		label: string;
		disabled?: boolean;
	};

	interface Props<TValue extends string | number> {
		options: ToggleOption<TValue>[];
		value: TValue;
		label?: string;
		onValueChange?: (value: TValue) => void;
		class?: string;
	}

	let {
		options,
		value = $bindable<T>(),
		label,
		onValueChange,
		class: className = ''
	}: Props<T> = $props();

	function select(next: T): void {
		value = next;
		onValueChange?.(next);
	}
</script>

<div class={['toggle-field', className].filter(Boolean).join(' ')}>
	{#if label}
		<div class="label">{label}</div>
	{/if}
	<div class="toggle-group" role="group" aria-label={label}>
		{#each options as option (option.value)}
			<button
				type="button"
				class="toggle"
				aria-pressed={value === option.value}
				disabled={option.disabled}
				onclick={() => select(option.value)}
			>
				{option.label}
			</button>
		{/each}
	</div>
</div>

<style>
	.toggle-field {
		display: grid;
		gap: var(--space-2);
		margin-bottom: var(--space-3);
	}

	.label {
		font-size: var(--text-sm);
		font-weight: 700;
	}

	.toggle-group {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-1);
		padding: var(--space-1);
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: color-mix(in srgb, var(--surface) 70%, transparent);
		-webkit-backdrop-filter: var(--blur);
		backdrop-filter: var(--blur);
	}

	.toggle {
		flex: 1 1 max-content;
		min-width: 4.5rem;
		min-height: 44px;
		padding: 0.45rem 0.7rem;
		font: inherit;
		font-size: var(--text-sm);
		font-weight: 700;
		color: inherit;
		border: 1px solid transparent;
		border-radius: calc(var(--radius) - 4px);
		background: transparent;
		cursor: pointer;
	}

	.toggle:hover {
		background: var(--fill);
	}

	.toggle[aria-pressed='true'] {
		background: var(--accent-soft);
		border-color: color-mix(in srgb, var(--accent) 30%, transparent);
		color: var(--accent);
		box-shadow: var(--shadow-sm);
	}

	.toggle:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}
</style>
