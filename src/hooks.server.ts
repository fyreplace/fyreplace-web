import * as Sentry from '@sentry/sveltekit';
import { env } from '$env/dynamic/public';

Sentry.init({
  dsn: env.PUBLIC_SENTRY_DSN,
  environment: env.PUBLIC_SENTRY_ENVIRONMENT,
  release: process.env.npm_package_name + '@' + env.PUBLIC_SENTRY_RELEASE,
  ignoreTransactions: ['/health'],
  tracesSampleRate: 0.1
});

export const handleError = Sentry.handleErrorWithSentry();

export const handle = Sentry.sentryHandle();
