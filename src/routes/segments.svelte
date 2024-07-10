<script lang="ts">
	import { type Destination } from '$lib/destinations';
	import { currentDestination } from '$lib/stores/destinations';
	import { fakeLink } from '$lib/actions/destinations';

	export let destinations: Destination[];
</script>

<div class="segments">
	{#each destinations as destination}
		<!-- svelte-ignore a11y-missing-attribute -->
		<a
			class="segment"
			class:active={destination === $currentDestination}
			use:fakeLink={destination}
		>
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
		border: 2px solid transparent;
		border-radius: 2em;
		display: flex;
		justify-content: center;
		color: currentColor;
		text-decoration: none;
		transition: 0.3s;

		&.active {
			border-color: var(--color-accent);
			color: var(--color-accent);
		}
	}
</style>
