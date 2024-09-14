import { handleErrorWithSentry, httpClientIntegration, replayIntegration } from '@sentry/sveltekit';
import * as Sentry from '@sentry/sveltekit';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/public';
import { scheduleTokenRefresh } from '$lib/background';

const sentryTunnelPath = '/sentry/tunnel';

Sentry.init({
	enabled: !!env.PUBLIC_SENTRY_DSN,
	dsn: env.PUBLIC_SENTRY_DSN,
	environment: env.PUBLIC_SENTRY_ENVIRONMENT,
	tracesSampleRate: dev ? 1 : undefined,
	profilesSampleRate: dev ? 1 : undefined,
	replaysOnErrorSampleRate: 1,
	tunnel: sentryTunnelPath,
	ignoreTransactions: [sentryTunnelPath],
	denyUrls: [sentryTunnelPath],
	integrations: [httpClientIntegration(), replayIntegration()],
	spotlight: dev
});

scheduleTokenRefresh();

export const handleError = handleErrorWithSentry();
