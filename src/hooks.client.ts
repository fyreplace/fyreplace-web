import { dev } from '$app/environment';
import { isUpdateAvailable } from '$lib/stores/updates';
import { getNewWorker } from '$lib/utils';

async function setupRegistration() {
  const registration = await navigator.serviceWorker.getRegistration();

  if (!registration) {
    return;
  }

  registration.onupdatefound = function () {
    isUpdateAvailable.set(!!getNewWorker(this) && !dev);
  };

  if (getNewWorker(registration)) {
    isUpdateAvailable.set(!dev);
  }
}

navigator.serviceWorker.addEventListener('message', async (event) => {
  if (event.data.action === 'reload') {
    window.location.reload();
  }
});

document.onvisibilitychange = async function () {
  if (!this.hidden) {
    const registration = await navigator.serviceWorker.getRegistration();
    registration?.update();
  }
};

setupRegistration();
