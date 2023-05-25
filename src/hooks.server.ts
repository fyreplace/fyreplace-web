import * as Sentry from '@sentry/sveltekit';
import { env } from '$env/dynamic/public';

Sentry.init({
  dsn: env.PUBLIC_SENTRY_DSN,
  environment: env.PUBLIC_SENTRY_ENVIRONMENT,
  ignoreTransactions: ['/health'],
  tracesSampleRate: 0.1
});

export const handleError = Sentry.handleErrorWithSentry();

export const handle = Sentry.sentryHandle();
