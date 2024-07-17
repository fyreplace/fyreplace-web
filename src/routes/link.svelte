<script lang="ts">
	import { derived } from 'svelte/store';
	import i18next from 'i18next';
	import { topLevelDestinations, type Destination } from '$lib/destinations';
	import { currentDestination } from '$lib/stores/destinations';
	import Icon from '$lib/components/icon.svelte';

	export let destination: Destination;
	export let sideNavigation = false;

	const selected = derived(currentDestination, ($currentDestination) => {
		const isExactDestination = $currentDestination === destination;
		const isChildDestination = $currentDestination?.parent === destination;
		const isTopLevel = topLevelDestinations.includes($currentDestination);
		return isExactDestination || (isChildDestination && !(isTopLevel && sideNavigation));
	});
</script>

<a
	href={destination.route}
	data-sveltekit-replacestate
	class="link"
	class:side-navigation={sideNavigation}
	class:selected={$selected}
>
	<Icon><svelte:component this={destination.icon} /></Icon>
	{i18next.t(destination.titleKey)}
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

	.side-navigation {
		flex-direction: row;
		gap: 0.5em;
		padding: 0.5em 1em;
		border: 2px solid transparent;
		border-radius: 2em;

		@media screen and (min-width: $width-expanded) {
			padding-left: 1.5em;
			padding-right: 1.5em;
		}

		@media screen and (min-height: $height-expanded) {
			padding-bottom: 1em;
			padding-top: 1em;
			gap: 1em;
			border-radius: 1em;
		}

		&:hover:not(.selected) {
			background: var(--color-accent-hover);
		}

		&:active:not(.selected) {
			background: var(--color-accent);
		}

		&.selected {
			border-color: var(--color-accent);
			color: var(--color-accent);
		}
	}

	:not(.side-navigation) {
		flex: 1;
		justify-content: center;

		&.selected {
			color: var(--color-accent);
		}
	}
</style>
