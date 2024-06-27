import { derived } from 'svelte/store';
import { page } from '$app/stores';
import { allDestinations } from '$lib/destinations';

export const currentDestination = derived(page, ($page) =>
	allDestinations.find((i) => i.route === $page.route.id)
);
