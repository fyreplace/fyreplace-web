<script lang="ts">
	import { derived, type Readable } from 'svelte/store';
	import { type Destination } from '$lib/destinations';
	import { currentDestination } from '$lib/stores/destinations';
	import Icon from '$lib/components/icon.svelte';

	export let destination: Destination;
	export let vertical = false;

	let active: Readable<boolean>;

	$: active = derived(currentDestination, ($currentDestination) =>
		[$currentDestination, vertical ? null : $currentDestination?.replacement].includes(destination)
	);
</script>

<a href={destination.route} class="link" class:vertical class:active={$active}>
	<Icon><svelte:component this={destination.icon} /></Icon>
	{destination.title}
</a>

<style lang="scss">
	@import '$lib/style/values';

	.link {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25em;
		color: unset;
		text-decoration: none;
		transition: 0.3s;
	}

	.vertical {
		flex-direction: row;
		gap: 0.5em;
		padding: 0.5em 1em;
		border-radius: 0.5em;

		@media screen and (min-width: $width-expanded) {
			padding-left: 1.5em;
			padding-right: 1.5em;
		}

		@media screen and (min-height: $height-expanded) {
			padding-bottom: 1em;
			padding-top: 1em;
			gap: 1em;
		}

		&.active {
			background: var(--color-accent);
			color: var(--color-on-accent);
		}

		&:hover:not(.active) {
			background: var(--color-accent-hover);
		}
	}

	:not(.vertical) {
		flex: 1;
		justify-content: center;

		&.active {
			color: var(--color-accent);
		}
	}
</style>
