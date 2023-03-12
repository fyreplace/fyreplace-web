import { isUpdateAvailable } from '$lib/stores/updates';

function onWorkerStateChange(this: ServiceWorker) {
  switch (this.state) {
    case 'installed':
      isUpdateAvailable.set(true);
      break;

    case 'activated':
      isUpdateAvailable.set(false);
      break;
  }
}

async function setupRegistration() {
  const registration = await navigator.serviceWorker.getRegistration();

  if (!registration) {
    return;
  }

  registration.onupdatefound = function () {
    this.installing!.onstatechange = onWorkerStateChange;
  };

  const worker = registration.waiting || registration.installing;

  if (worker) {
    isUpdateAvailable.set(true);
    worker.onstatechange = onWorkerStateChange;
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
