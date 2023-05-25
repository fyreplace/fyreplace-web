import * as Sentry from "@sentry/sveltekit";
import { env } from "$env/dynamic/public";
import { isUpdateAvailable } from '$lib/stores/updates';
import { getNewWorker } from '$lib/utils';

const sentryTunnelPath = '/sentry/tunnel';

Sentry.init({
  dsn: env.PUBLIC_SENTRY_DSN,
  environment: env.PUBLIC_SENTRY_ENVIRONMENT,
  tunnel: sentryTunnelPath,
  ignoreTransactions: [sentryTunnelPath],
  denyUrls: [sentryTunnelPath],
  tracesSampleRate: 0.1,
  integrations: [new Sentry.Replay()],
  replaysSessionSampleRate: 0.0,
  replaysOnErrorSampleRate: 1.0,
});

export const handleError = Sentry.handleErrorWithSentry();

async function setupRegistration() {
  const registration = await navigator.serviceWorker.getRegistration();

  if (!registration) {
    return;
  }

  registration.onupdatefound = function () {
    isUpdateAvailable.set(getNewWorker(this) !== null);
  };

  if (getNewWorker(registration) !== null) {
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
