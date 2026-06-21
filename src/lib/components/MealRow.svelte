<script lang="ts">
	interface Props {
		label: string;
		name: string;
		calories: number;
		protein: number;
	}

	let { label, name, calories, protein }: Props = $props();
</script>

<li class="meal">
	<span class="name">
		<strong>{label}</strong> — {name}
	</span>
	<span class="muted facts">{calories} kcal · {protein} g</span>
</li>

<style>
	.meal {
		display: flex;
		justify-content: space-between;
		gap: var(--space-2);
		padding: 0.45rem 0;
		border-bottom: 1px solid var(--line);
	}

	.meal:last-child {
		border-bottom: none;
	}

	.name,
	.facts {
		min-width: 0;
	}

	.facts {
		flex: none;
		font-size: var(--text-sm);
	}

	@media (max-width: 420px) {
		.meal {
			display: grid;
		}

		.facts {
			flex: initial;
		}
	}
</style>
