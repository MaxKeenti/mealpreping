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
		['button', 'glass-sheen', `variant-${variant}`, `size-${size}`, className]
			.filter(Boolean)
			.join(' ')
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
		position: relative;
		isolation: isolate;
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
		box-shadow: var(--shadow-sm), var(--edge-highlight);
		cursor: pointer;
		/* Springy, liquid-feeling response. */
		transition:
			background 200ms ease,
			border-color 200ms ease,
			box-shadow 200ms ease,
			transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	/* Sheen rides above the surface but below the label. */
	.button > :global(*) {
		position: relative;
		z-index: 1;
	}

	.button:hover {
		background: var(--surface-strong);
		box-shadow: var(--shadow), var(--edge-highlight);
		transform: translateY(-1px) scale(1.015);
	}

	.button:active {
		transform: translateY(0) scale(0.98);
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
		background: linear-gradient(
			180deg,
			color-mix(in srgb, var(--accent) 90%, white) 0%,
			var(--accent) 100%
		);
		border-color: transparent;
		color: white;
		box-shadow:
			0 10px 24px color-mix(in srgb, var(--accent) 32%, transparent),
			inset 0 1px 0 color-mix(in srgb, white 45%, transparent),
			inset 0 -8px 16px -10px color-mix(in srgb, black 30%, transparent);
	}

	.variant-primary:hover {
		background: linear-gradient(
			180deg,
			color-mix(in srgb, var(--accent) 78%, white) 0%,
			color-mix(in srgb, var(--accent) 94%, white) 100%
		);
		box-shadow:
			0 14px 30px color-mix(in srgb, var(--accent) 38%, transparent),
			inset 0 1px 0 color-mix(in srgb, white 50%, transparent),
			inset 0 -8px 16px -10px color-mix(in srgb, black 30%, transparent);
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
