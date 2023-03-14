import { writable, readonly, get } from 'svelte/store';

export const isUpdateAvailable = writable(false);

const _isUpdating = writable(false);
export const isUpdating = readonly(_isUpdating);

export async function commitUpdate() {
  if (get(isUpdating)) {
    return;
  }

  const registration = await navigator.serviceWorker.getRegistration();

  if (!registration) {
    return;
  }

  _isUpdating.set(true);
  const worker = registration.waiting || registration.installing;
  worker?.postMessage({ action: 'skip-waiting' });
}
