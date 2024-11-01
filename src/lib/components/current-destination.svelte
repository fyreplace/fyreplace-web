<script lang="ts">
	import { onMount } from 'svelte';
	import { derived as derivedStore } from 'svelte/store';
	import { page } from '$app/stores';
	import { allDestinations, Destination } from '$lib/destinations';

	interface Props {
		destination: Destination;
	}

	let { destination = $bindable() }: Props = $props();

	const currentDestination = derivedStore(
		page,
		($page) => allDestinations.find((d) => d.route === $page.url.pathname) ?? Destination.Feed
	);

	onMount(() => currentDestination.subscribe((value) => (destination = value)));
</script>
