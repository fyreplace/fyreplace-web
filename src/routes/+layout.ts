import i18next from 'i18next';
import { browser, dev } from '$app/environment';
import translations from '$lib/data/translations.json';
import type { LayoutLoad } from './$types';
import { getOptimalLanguage } from '$lib/i18n';

export const load = (async (params) => {
	if (!i18next.isInitialized) {
		await i18next.init({
			debug: dev,
			supportedLngs: Object.keys(translations),
			lng: getOptimalLanguage(browser ? navigator.languages : params.data.acceptedLanguages),
			fallbackLng: 'en',
			resources: translations
		});
	}
}) satisfies LayoutLoad;
