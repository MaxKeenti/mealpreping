<script lang="ts">
	import * as m from '$lib/paraglide/messages';
</script>

<svelte:head>
	<title>{m.app_title()}</title>
</svelte:head>

<main>
	<h1>{m.app_title()}</h1>
	<p>{m.engine_ready()}</p>
</main>
