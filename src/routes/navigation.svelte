<script lang="ts">
	import { allDestinations, essentialDestinations } from '$lib/destinations';
	import Link from './link.svelte';

	export let vertical = false;
</script>

<nav class="navigation" class:vertical>
	{#each vertical ? allDestinations : essentialDestinations as destination}
		<Link {destination} {vertical} />
	{/each}
</nav>

<style lang="scss">
	@import '$lib/style/mixins';
	@import '$lib/style/values';

	.navigation {
		box-sizing: border-box;

		&.vertical {
			height: 100%;
			display: none;
			padding: 1em;
			border-inline-end: 1px solid var(--color-separator);

			@include regular {
				display: flex;
				flex-direction: column;
				gap: 1em;
			}
		}

		&:not(.vertical) {
			width: 100%;
			height: 60px;
			display: flex;
			border-top: 1px solid var(--color-separator);

			@include regular {
				display: none;
			}
		}
	}
</style>
