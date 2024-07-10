import { derived, writable } from 'svelte/store';
import { page } from '$app/stores';
import { replaceState } from '$app/navigation';
import { Destination, findDestinationByRoute } from '$lib/destinations';

const actualDestination = writable<Destination | null>(null);

export const currentDestination = derived(
	[page, actualDestination],
	([$page, actualDestination]) => actualDestination ?? findDestinationByRoute($page.url.pathname)
);

export function navigateTo(destination: Destination) {
	replaceState(destination.route, {});
	actualDestination.set(destination);
}
