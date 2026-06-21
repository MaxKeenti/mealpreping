<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'default' | 'primary' | 'ghost';
	type Size = 'default' | 'icon';

	type Props = HTMLButtonAttributes &
		HTMLAnchorAttributes & {
			variant?: Variant;
			size?: Size;
			href?: string;
			children?: Snippet;
		};

	let {
		variant = 'default',
		size = 'default',
		href,
		children,
		class: className = '',
		type = 'button',
		...rest
	}: Props = $props();

	const classes = $derived(
		['button', `variant-${variant}`, `size-${size}`, className].filter(Boolean).join(' ')
	);
</script>

{#if href}
	<a class={classes} {href} {...rest}>
		{@render children?.()}
	</a>
{:else}
	<button class={classes} {type} {...rest}>
		{@render children?.()}
	</button>
{/if}

<style>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		min-height: 44px;
		padding: 0.55rem 1rem;
		font: inherit;
		font-weight: 650;
		line-height: 1;
		text-align: center;
		text-decoration: none;
		color: inherit;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--surface);
		-webkit-backdrop-filter: var(--blur);
		backdrop-filter: var(--blur);
		box-shadow: var(--shadow-sm);
		cursor: pointer;
		transition:
			background 160ms ease,
			border-color 160ms ease,
			box-shadow 160ms ease,
			transform 160ms ease;
	}

	.button:hover {
		background: var(--surface-strong);
		box-shadow: var(--shadow);
		transform: translateY(-1px);
	}

	.button:where(:disabled, [aria-disabled='true']) {
		opacity: 0.45;
		cursor: not-allowed;
		pointer-events: none;
		transform: none;
	}

	.button[aria-pressed='true'] {
		background: var(--accent-soft);
		border-color: color-mix(in srgb, var(--accent) 30%, transparent);
		color: var(--accent);
		box-shadow: none;
	}

	.variant-primary {
		background: var(--accent);
		border-color: transparent;
		color: white;
		box-shadow: 0 10px 24px color-mix(in srgb, var(--accent) 26%, transparent);
	}

	.variant-primary:hover {
		background: color-mix(in srgb, var(--accent) 88%, white);
	}

	.variant-ghost {
		background: transparent;
		box-shadow: none;
	}

	.size-icon {
		width: 44px;
		padding: 0;
		border-radius: var(--radius-full);
		font-size: var(--text-lg);
	}
</style>
