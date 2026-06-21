<script lang="ts" generics="T extends string">
	type CheckboxOption<TValue extends string> = {
		value: TValue;
		label: string;
	};

	interface Props<TValue extends string> {
		legend: string;
		options: CheckboxOption<TValue>[];
		value: TValue[];
		class?: string;
	}

	let { legend, options, value = $bindable<T[]>(), class: className = '' }: Props<T> = $props();
</script>

<fieldset class={['checkbox-group', className].filter(Boolean).join(' ')}>
	<legend>{legend}</legend>
	<div class="options">
		{#each options as option (option.value)}
			<label>
				<input type="checkbox" value={option.value} bind:group={value} />
				<span class="box" aria-hidden="true"></span>
				<span>{option.label}</span>
			</label>
		{/each}
	</div>
</fieldset>

<style>
	.checkbox-group {
		margin: 0 0 var(--space-3);
		padding: var(--space-3);
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: color-mix(in srgb, var(--surface) 64%, transparent);
	}

	legend {
		padding: 0 var(--space-1);
		font-size: var(--text-sm);
		font-weight: 700;
	}

	.options {
		display: grid;
		gap: var(--space-1);
	}

	label {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		min-height: 44px;
		cursor: pointer;
	}

	input {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.box {
		width: 1.1rem;
		height: 1.1rem;
		flex: none;
		border: 1px solid var(--line);
		border-radius: var(--radius-sm);
		background: var(--surface);
	}

	input:checked + .box {
		border-color: transparent;
		background: var(--accent);
	}

	input:checked + .box::after {
		content: '';
		display: block;
		width: 0.35rem;
		height: 0.6rem;
		margin: 0.12rem auto 0;
		border: solid white;
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}

	input:focus-visible + .box {
		outline: 3px solid color-mix(in srgb, var(--accent) 70%, transparent);
		outline-offset: 3px;
	}
</style>
