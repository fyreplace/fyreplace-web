export function getNewWorker(registration: ServiceWorkerRegistration) {
  return registration.waiting || registration.installing;
}

export function doOnEnterPressed(action: Function) {
  return function (event: KeyboardEvent) {
    if (event.key === 'Enter') {
      action();
    }
  };
}
