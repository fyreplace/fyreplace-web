import { derived, writable } from 'svelte/store';

export const contentScroll = writable(0);

export const isContentScrolled = derived(contentScroll, ($contentScroll) => $contentScroll > 0);
