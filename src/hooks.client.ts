import { handleErrorWithSentry, replayIntegration } from '@sentry/sveltekit';
import * as Sentry from '@sentry/sveltekit';
import { env } from '$env/dynamic/public';

const sentryTunnelPath = '/sentry/tunnel';

Sentry.init({
	enabled: !!env.PUBLIC_SENTRY_DSN,
	dsn: env.PUBLIC_SENTRY_DSN,
	environment: env.PUBLIC_SENTRY_ENVIRONMENT,
	tracesSampleRate: 0.0,
	tunnel: sentryTunnelPath,
	ignoreTransactions: [sentryTunnelPath],
	denyUrls: [sentryTunnelPath],
	integrations: [replayIntegration()],
	replaysOnErrorSampleRate: 1.0
});

export const handleError = handleErrorWithSentry();
