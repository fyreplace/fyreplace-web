<script lang="ts">
	import { essentialDestinations, topLevelDestinations } from '$lib/destinations';
	import Link from './link.svelte';

	export let vertical = false;
</script>

<nav class="navigation" class:vertical>
	{#each vertical ? topLevelDestinations : essentialDestinations as destination}
		<Link {destination} sideNavigation={vertical} />
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
			padding-left: max(1em, env(safe-area-inset-left));
			padding-right: 1em;
			padding-top: max(1em, env(safe-area-inset-top));
			padding-bottom: max(1em, env(safe-area-inset-bottom));
			border-inline-end: 2px solid var(--color-separator);

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
			margin-bottom: env(safe-area-inset-bottom);
			padding-left: env(safe-area-inset-left);
			padding-right: env(safe-area-inset-right);
			border-top: 2px solid var(--color-separator);

			@include regular {
				display: none;
			}

			@include expanded {
				height: 80px;
			}
		}
	}
</style>
