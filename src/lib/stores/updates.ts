import { writable, readonly, get } from 'svelte/store';
import { getNewWorker } from '$lib/utils';

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

  const worker = getNewWorker(registration);

  if (!worker) {
    return;
  }

  _isUpdating.set(true);
  worker.postMessage({ action: 'skip-waiting' });
  setTimeout(() => window.location.reload(), 1000);
}
