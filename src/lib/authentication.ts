import { readonly, writable } from 'svelte/store';

const AUTHENTICATION_TOKEN = 'authentication/token';

const _isAuthenticated = writable(false);
export const isAuthenticated = readonly(_isAuthenticated);

export function storeToken(token: string) {
	localStorage.setItem(AUTHENTICATION_TOKEN, token);
	_isAuthenticated.set(true);
}

export function clearToken() {
	localStorage.removeItem(AUTHENTICATION_TOKEN);
	_isAuthenticated.set(false);
}

export function getToken() {
	return localStorage.getItem(AUTHENTICATION_TOKEN);
}
