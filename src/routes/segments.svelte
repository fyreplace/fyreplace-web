<script lang="ts">
	import { t } from 'i18next';
	import { Destination } from '$lib/destinations';
	import SavedValue from '$lib/components/saved-value.svelte';
	import CurrentDestination from '$lib/components/current-destination.svelte';

	interface Props {
		destinations: Destination[];
	}

	let { destinations }: Props = $props();

	let isWaitingForRandomCode = $state(false);
	let currentDestination = $state(Destination.Feed);
</script>

<SavedValue name="account.isWaitingForRandomCode" bind:value={isWaitingForRandomCode} />
<CurrentDestination bind:destination={currentDestination} />

<div class="segments">
	<span class="border"></span>
	{#each destinations as destination}
		<a
			href={destination.route}
			data-sveltekit-replacestate
			class="segment"
			class:selected={destination.route === currentDestination.route}
			aria-disabled={isWaitingForRandomCode}
		>
			{t(destination.titleKey)}
		</a>
	{/each}
</div>

<style lang="scss">
	@use '$lib/style/mixins';

	.segments {
		position: relative;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	.border {
		position: absolute;
		z-index: -1;
		width: 100%;
		height: 100%;
		border: 2px solid var(--color-border);
		border-radius: 2em;
		box-sizing: border-box;
	}

	.segment {
		padding: 0.5em 1em;
		border: 2px solid transparent;
		border-radius: 2em;
		display: flex;
		justify-content: center;
		align-items: center;
		color: currentColor;
		text-decoration: none;
		transition: 0.3s;

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

		&[aria-disabled='true'] {
			opacity: 40%;
			pointer-events: none;
		}
	}
</style>
