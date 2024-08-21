<script lang="ts">
	import { derived, writable } from 'svelte/store';
	import { t } from 'i18next';
	import {
		allDestinations,
		currentDestination,
		Destination,
		topLevelDestinations
	} from '$lib/destinations';
	import SavedValue from '$lib/components/saved-value.svelte';
	import Segments from './segments.svelte';

	export let sideNavigation = false;

	const token = writable<string | null>(null);
	const choices = derived([currentDestination, token], ([$destination, $token]) => {
		const firstDestination = $destination.parent ?? $destination;
		return [firstDestination]
			.concat(allDestinations.filter((d) => d.parent?.route === firstDestination?.route))
			.filter(Boolean)
			.map((d) => d as Destination)
			.filter((d) =>
				$token === ''
					? d !== Destination.Settings
					: [Destination.Login, Destination.Register].indexOf(d) === -1
			);
	});
	const multiChoice = derived(choices, ($choices) => $choices.length > 1);
	const mandatoryMultiChoice = derived(
		choices,
		($choices) => $choices.filter((d) => !topLevelDestinations.includes(d)).length > 1
	);
	const showSegments = derived(
		[multiChoice, mandatoryMultiChoice],
		([$multiChoice, $mandatoryMultiChoice]) =>
			($multiChoice && !sideNavigation) || $mandatoryMultiChoice
	);
</script>

<SavedValue name="connection.token" store={token} />

<div class="top-bar" class:side-navigation={sideNavigation} class:centered={$showSegments}>
	{#if $showSegments}
		<Segments destinations={$choices} />
	{:else}
		<span class="title">{t($currentDestination.titleKey)}</span>
	{/if}
</div>

<style lang="scss">
	@import '$lib/style/mixins';

	.top-bar {
		width: 100%;
		height: 60px;
		margin-top: env(safe-area-inset-top);
		padding: 0 1em;
		padding-right: max(1em, env(safe-area-inset-right));
		box-sizing: border-box;
		align-items: center;
		border-bottom: 2px solid var(--color-separator);
		transition: 0.3s;

		@include expanded {
			height: 80px;
		}

		&.side-navigation {
			display: none;

			@include regular {
				display: flex;
			}
		}

		&:not(.side-navigation) {
			display: flex;
			padding-left: max(1em, env(safe-area-inset-left));

			@include regular {
				display: none;
			}
		}

		&.centered {
			justify-content: center;
		}
	}

	.title {
		font-size: 1.25em;
		font-weight: bold;

		@include expanded-height {
			font-size: 1.5em;
		}
	}
</style>
