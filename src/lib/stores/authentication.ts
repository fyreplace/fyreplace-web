import { readonly, writable } from 'svelte/store';

const _isAuthenticated = writable(false);
export const isAuthenticated = readonly(_isAuthenticated);
