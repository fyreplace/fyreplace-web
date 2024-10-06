<script lang="ts">
	import { derived, writable } from 'svelte/store';
	import { t } from 'i18next';
	import { currentDestination, topLevelDestinations, Destination } from '$lib/destinations';
	import SavedValue from '$lib/components/saved-value.svelte';
	import Icon from '$lib/components/icon.svelte';

	export let destination: Destination;
	export let sideNavigation = false;

	const token = writable<string | null>(null);
	const selected = derived(currentDestination, ($currentDestination) => {
		const isExactDestination = $currentDestination === destination;
		const isChildDestination = $currentDestination?.parent === destination;
		const isTopLevel = topLevelDestinations.includes($currentDestination);
		return isExactDestination || (isChildDestination && !(isTopLevel && sideNavigation));
	});
	const disabled = derived(token, ($token) => destination.requiresAuthentication && !$token);
</script>

<SavedValue name="connection.token" store={token} />

<a
	href={destination.route}
	data-sveltekit-replacestate
	class="link"
	class:side-navigation={sideNavigation}
	class:selected={$selected}
	aria-disabled={$disabled}
>
	<Icon><svelte:component this={destination.icon} /></Icon>
	{t(destination.titleKey)}
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
