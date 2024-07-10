<script lang="ts">
	import { type Destination } from '$lib/destinations';
	import { currentDestination, navigateTo } from '$lib/stores/destinations';

	export let destinations: Destination[];
</script>

<div class="segments">
	<span class="border" />
	{#each destinations as destination}
		<!-- svelte-ignore a11y-missing-attribute -->
		<a
			href={destination.route}
			class="segment"
			class:active={destination === $currentDestination}
			on:click|preventDefault={navigateTo.bind(null, destination)}
		>
			{destination.title}
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
		border: 2px solid var(--color-separator);
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

		&:hover:not(.active) {
			background: var(--color-accent-hover);
		}
	}
</style>
