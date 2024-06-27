<script lang="ts">
	import { derived } from 'svelte/store';
	import { page } from '$app/stores';
	import { allDestinations, Destination } from '$lib/destinations';
	import Segments from './segments.svelte';

	export let segmented = false;

	const destination = derived(page, ($page) =>
		allDestinations.find((d) => d.route === $page.route.id)
	);
	const choices = derived(
		[page, destination],
		([$page, $destination]) =>
			[$destination?.replacement, $destination]
				.concat(allDestinations.filter((d) => d.replacement?.route === $page.route.id))
				.filter(Boolean) as Destination[]
	);
	const multiChoice = derived(choices, ($choices) => $choices.length > 1);
</script>

<div class="top-bar" class:segmented class:centered={$multiChoice}>
	{#if $multiChoice && segmented}
		<Segments destinations={$choices} />
	{:else}
		<span class="title">{$destination?.title}</span>
	{/if}
</div>

<style lang="scss">
	@import '$lib/style/mixins';
	@import '$lib/style/values';

	.top-bar {
		width: 100%;
		height: 60px;
		padding: 0 1em;
		box-sizing: border-box;
		align-items: center;
		border-bottom: 1px solid var(--color-separator);
		transition: 0.3s;

		@media screen and (min-height: $height-expanded) {
			height: 80px;
		}

		&.segmented {
			display: flex;

			@include regular {
				display: none;
			}

			&.centered {
				justify-content: center;
			}
		}

		&:not(.segmented) {
			display: none;

			@include regular {
				display: flex;
			}
		}
	}

	.title {
		font-size: 1.25em;
		font-weight: bold;

		@media screen and (min-height: $height-expanded) {
			font-size: 1.5em;
		}
	}
</style>
