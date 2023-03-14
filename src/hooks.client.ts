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

navigator.serviceWorker.oncontrollerchange = () => window.location.reload();
document.onvisibilitychange = async function () {
  if (!this.hidden) {
    const registration = await navigator.serviceWorker.getRegistration();
    registration?.update();
  }
};
setupRegistration();
