import { writable } from 'svelte/store';

export const isVisible = writable(false);

export const message = writable('');

export const buttonLabel = writable('');

export const buttonAction = writable(() => {});

export const isButtonDisabled = writable(false);

export const isButtonLoading = writable(false);
