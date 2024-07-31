import { t } from 'i18next';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import * as Sentry from '@sentry/sveltekit';
import { handleErrorWithSentry, sentryHandle } from '@sentry/sveltekit';
import { env } from '$env/dynamic/public';
import { getLanguages, getOptimalLanguage } from '$lib/i18n';

Sentry.init({
	enabled: !!env.PUBLIC_SENTRY_DSN,
	dsn: env.PUBLIC_SENTRY_DSN,
	environment: env.PUBLIC_SENTRY_ENVIRONMENT,
	tracesSampleRate: 0.0,
	ignoreTransactions: ['/health']
});

const languageHandler = (({ event, resolve }) =>
	resolve(event, {
		transformPageChunk(input) {
			return input.html
				.replace(/%app.language%/g, getOptimalLanguage(getLanguages(event.request)))
				.replace(/%app.name%/g, t('app.name'))
				.replace(/%app.description%/g, t('app.description'));
		}
	})) satisfies Handle;

export const handle = sequence(sentryHandle(), languageHandler);

export const handleError = handleErrorWithSentry();
