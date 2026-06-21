<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = Omit<HTMLInputAttributes, 'type'> & {
		checked?: boolean;
		children?: Snippet;
	};

	let { checked = $bindable<boolean | undefined>(), children, class: className = '', ...rest }: Props =
		$props();
</script>

<label class={['checkbox', className].filter(Boolean).join(' ')}>
	<input type="checkbox" bind:checked {...rest} />
	<span class="box" aria-hidden="true"></span>
	<span class="content">
		{@render children?.()}
	</span>
</label>

<style>
	.checkbox {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		min-height: 44px;
		color: inherit;
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
		width: 1.15rem;
		height: 1.15rem;
		flex: none;
		display: grid;
		place-items: center;
		border: 1px solid var(--line);
		border-radius: var(--radius-sm);
		background: var(--surface);
		box-shadow: var(--edge-highlight);
		transition:
			background 160ms ease,
			border-color 160ms ease,
			transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	input:checked + .box {
		border-color: transparent;
		background: linear-gradient(
			180deg,
			color-mix(in srgb, var(--accent) 88%, white),
			var(--accent)
		);
		box-shadow:
			inset 0 1px 0 color-mix(in srgb, white 45%, transparent),
			0 4px 10px color-mix(in srgb, var(--accent) 30%, transparent);
		transform: scale(1.05);
	}

	input:checked + .box::after {
		content: '';
		width: 0.35rem;
		height: 0.6rem;
		border: solid white;
		border-width: 0 2px 2px 0;
		transform: rotate(45deg) translateY(-1px);
	}

	input:focus-visible + .box {
		outline: 3px solid color-mix(in srgb, var(--accent) 70%, transparent);
		outline-offset: 3px;
	}

	.content {
		flex: 1;
		min-width: 0;
		display: flex;
		align-items: baseline;
		gap: var(--space-2);
	}
</style>
