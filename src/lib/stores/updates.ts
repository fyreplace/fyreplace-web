import { writable, readonly, get } from 'svelte/store';

export const isUpdateAvailable = writable(false);

const _isUpdating = writable(false);
export const isUpdating = readonly(_isUpdating);

export async function commitUpdate() {
  if (get(isUpdating)) {
    return;
  }

  _isUpdating.set(true);
  const registration = await navigator.serviceWorker.getRegistration();
  const worker = registration?.waiting || registration?.installing;
  worker?.postMessage({ action: 'skip-waiting' });
}
