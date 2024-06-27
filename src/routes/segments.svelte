<script lang="ts">
	import { type Destination } from '$lib/destinations';
	import { currentDestination } from '$lib/stores/destinations';

	export let destinations: Destination[];
</script>

<div class="segments">
	{#each destinations as destination}
		<a href={destination.route} class="segment" class:active={destination === $currentDestination}>
			{destination.title}
		</a>
	{/each}
</div>

<style lang="scss">
	.segments {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		border: 1px solid var(--color-separator);
		border-radius: 2em;
	}

	.segment {
		padding: 0.5em 1em;
		border-radius: 2em;
		display: flex;
		justify-content: center;
		color: currentColor;
		text-decoration: none;
		transition: 0.3s;

		&.active {
			background: var(--color-accent);
			color: var(--color-on-accent);
		}
	}
</style>
