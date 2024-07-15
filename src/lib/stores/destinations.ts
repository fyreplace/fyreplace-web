import { derived } from 'svelte/store';
import { page } from '$app/stores';
import { findDestinationByRoute } from '$lib/destinations';

export const currentDestination = derived(page, ($page) =>
	findDestinationByRoute($page.url.pathname)
);
