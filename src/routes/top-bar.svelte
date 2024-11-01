<script lang="ts">
	import { t } from 'i18next';
	import { allDestinations, topLevelDestinations, Destination } from '$lib/destinations';
	import SavedValue from '$lib/components/saved-value.svelte';
	import Segments from './segments.svelte';
	import CurrentDestination from '$lib/components/current-destination.svelte';

	interface Props {
		sideNavigation?: boolean;
	}

	let { sideNavigation = false }: Props = $props();

	let token = $state<string>();
	let currentDestination = $state(Destination.Feed);
	const firstDestination = $derived(currentDestination?.parent ?? currentDestination);
	const choices = $derived(
		[firstDestination]
			.concat(allDestinations.filter((d) => d.parent?.route === firstDestination?.route))
			.filter(Boolean)
			.map((d) => d as Destination)
			.filter((d) =>
				!token
					? d.route !== Destination.Settings.route
					: ![Destination.Login.route, Destination.Register.route].includes(d.route)
			)
	);
	const multiChoice = $derived(choices.length > 1);
	const mandatoryMultiChoice = $derived(
		choices.filter((d) => !topLevelDestinations.map((d) => d.route).includes(d.route)).length > 1
	);
	const showSegments = $derived((multiChoice && !sideNavigation) || mandatoryMultiChoice);
</script>

<SavedValue name="connection.token" bind:value={token} />
<CurrentDestination bind:destination={currentDestination} />

<div class="top-bar" class:side-navigation={sideNavigation} class:centered={showSegments}>
	{#if showSegments}
		<Segments destinations={choices} />
	{:else if currentDestination}
		<h1 class="title">{t(currentDestination.titleKey)}</h1>
	{/if}
</div>

<style lang="scss">
	@use '$lib/style/mixins';

	.top-bar {
		width: 100%;
		height: 60px;
		margin-top: env(safe-area-inset-top);
		padding: 0 1em;
		padding-right: max(1em, env(safe-area-inset-right));
		box-sizing: border-box;
		align-items: center;
		border-bottom: 2px solid var(--color-border);
		transition: 0.3s;

		@include mixins.expanded {
			height: 80px;
		}

		&.side-navigation {
			display: none;

			@include mixins.regular {
				display: flex;
			}
		}

		&:not(.side-navigation) {
			display: flex;
			padding-left: max(1em, env(safe-area-inset-left));

			@include mixins.regular {
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

		@include mixins.expanded-height {
			font-size: 1.5em;
		}
	}
</style>
