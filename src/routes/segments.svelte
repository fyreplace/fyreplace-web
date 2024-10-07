<script lang="ts">
	import { writable } from 'svelte/store';
	import { t } from 'i18next';
	import { currentDestination, Destination } from '$lib/destinations';
	import SavedValue from '$lib/components/saved-value.svelte';

	export let destinations: Destination[];

	const isWaitingForRandomCode = writable(false);
</script>

<SavedValue name="account.isWaitingForRandomCode" store={isWaitingForRandomCode} />

<div class="segments">
	<span class="border" />
	{#each destinations as destination}
		<a
			href={destination.route}
			data-sveltekit-replacestate
			class="segment"
			class:selected={destination === $currentDestination}
			aria-disabled={$isWaitingForRandomCode}
		>
			{t(destination.titleKey)}
		</a>
	{/each}
</div>

<style lang="scss">
	@import '$lib/style/mixins';

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
