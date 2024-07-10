<script lang="ts">
	import { derived } from 'svelte/store';
	import { type Destination } from '$lib/destinations';
	import { currentDestination, navigateTo } from '$lib/stores/destinations';
	import Icon from '$lib/components/icon.svelte';
	import { fakeLink } from '$lib/actions/destinations';

	export let destination: Destination;
	export let vertical = false;

	const active = derived(currentDestination, ($currentDestination) =>
		[$currentDestination, vertical ? null : $currentDestination?.parent].includes(destination)
	);
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a class="link" class:vertical class:active={$active} use:fakeLink={destination}>
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

		&:hover:not(.active) {
			background: var(--color-accent-hover);
		}

		&:active:not(.active) {
			background: var(--color-accent);
		}

		&.active {
			border-color: var(--color-accent);
			color: var(--color-accent);
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
