import { sequence } from '@sveltejs/kit/hooks';
import { handleErrorWithSentry, sentryHandle } from '@sentry/sveltekit';
import * as Sentry from '@sentry/sveltekit';
import { env } from '$env/dynamic/public';

Sentry.init({
	enabled: !!env.PUBLIC_SENTRY_DSN,
	dsn: env.PUBLIC_SENTRY_DSN,
	environment: env.PUBLIC_SENTRY_ENVIRONMENT,
	tracesSampleRate: 0.0,
	ignoreTransactions: ['/health']
});

export const handle = sequence(sentryHandle());

export const handleError = handleErrorWithSentry();
