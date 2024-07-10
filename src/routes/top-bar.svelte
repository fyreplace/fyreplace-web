<script lang="ts">
	import { derived } from 'svelte/store';
	import { allDestinations, Destination, topLevelDestinations } from '$lib/destinations';
	import { currentDestination } from '$lib/stores/destinations';
	import Segments from './segments.svelte';

	export let vertical = false;

	const choices = derived(currentDestination, ($destination) => {
		const firstDestination = $destination.parent ?? $destination;
		return [firstDestination]
			.concat(allDestinations.filter((d) => d.parent?.route === firstDestination?.route))
			.filter(Boolean)
			.map((d) => d as Destination)
			.filter((d) => d.isVisible());
	});
	const multiChoice = derived(choices, ($choices) => $choices.length > 1);
	const mandatoryMultiChoice = derived(
		choices,
		($choices) => $choices.filter((d) => !topLevelDestinations.includes(d)).length > 1
	);
	const showSegments = derived(
		[multiChoice, mandatoryMultiChoice],
		([$multiChoice, $mandatoryMultiChoice]) => ($multiChoice && !vertical) || $mandatoryMultiChoice
	);
</script>

<div class="top-bar" class:vertical class:centered={$showSegments}>
	{#if $showSegments}
		<Segments destinations={$choices} />
	{:else}
		<span class="title">{$currentDestination.title}</span>
	{/if}
</div>

<style lang="scss">
	@import '$lib/style/mixins';

	.top-bar {
		width: 100%;
		height: 60px;
		padding: 0 1em;
		box-sizing: border-box;
		align-items: center;
		border-bottom: 2px solid var(--color-separator);
		transition: 0.3s;

		@include expanded-height {
			height: 80px;
		}

		&.vertical {
			display: none;

			@include regular {
				display: flex;
			}
		}

		&:not(.vertical) {
			display: flex;

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
