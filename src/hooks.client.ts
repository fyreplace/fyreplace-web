import { isUpdateAvailable } from '$lib/stores/updates';

async function setupRegistration() {
  const registration = await navigator.serviceWorker.getRegistration();

  if (!registration) {
    return;
  }

  registration.onupdatefound = function () {
    isUpdateAvailable.set(true);
  };

  if (registration.waiting || registration.installing) {
    isUpdateAvailable.set(true);
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
