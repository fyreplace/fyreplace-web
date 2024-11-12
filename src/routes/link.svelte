<script lang="ts">
	import { t } from 'i18next';
	import { isTopLevelDestination, Destination } from '$lib/destinations';
	import SavedValue from '$lib/components/saved-value.svelte';
	import CurrentDestination from '$lib/components/current-destination.svelte';
	import Icon from '$lib/components/icon.svelte';

	interface Props {
		destination: Destination;
		sideNavigation?: boolean;
	}

	let { destination, sideNavigation = false }: Props = $props();

	let token = $state<string>();
	let currentDestination = $state(Destination.Feed);

	const isExactDestination = $derived(currentDestination.route === destination.route);
	const isChildDestination = $derived(
		currentDestination.parent?.route === destination.route ||
			currentDestination.route.startsWith(destination.route)
	);
	const isTopLevel = $derived(isTopLevelDestination(currentDestination));
	const selected = $derived(
		isExactDestination || (isChildDestination && !(isTopLevel && sideNavigation))
	);
	const disabled = $derived(destination.requiresAuthentication && !token);
</script>

<SavedValue name="connection.token" bind:value={token} />
<CurrentDestination bind:destination={currentDestination} />

<a
	href={destination.route}
	data-sveltekit-replacestate
	class="link"
	class:side-navigation={sideNavigation}
	class:selected
	aria-disabled={disabled}
>
	<Icon><destination.icon /></Icon>
	{t(destination.titleKey)}
</a>

<style lang="scss">
	@use '$lib/style/mixins';

	.link {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25em;
		color: unset;
		text-decoration: none;
		transition: 0.3s;

		&[aria-disabled='true'] {
			opacity: 40%;
			pointer-events: none;
		}
	}

	.side-navigation {
		flex-direction: row;
		gap: 0.5em;
		padding: 0.5em 1em;
		border: 2px solid transparent;
		border-radius: 2em;

		@include mixins.expanded-width {
			padding-left: 1.5em;
			padding-right: 1.5em;
		}

		@include mixins.expanded-height {
			padding-bottom: 1em;
			padding-top: 1em;
			gap: 1em;
			border-radius: 1em;
		}

		@media (hover: hover) {
			&:hover:not(.selected) {
				background: var(--color-accent-hover);
			}
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
