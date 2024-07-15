import i18next from 'i18next';
import { browser, dev } from '$app/environment';
import translations from '$lib/data/translations.json';
import type { LayoutLoad } from './$types';

export const load = (async (params) => {
	const languages = browser ? navigator.languages : params.data.acceptedLanguages;

	if (!i18next.isInitialized) {
		await i18next.init({
			debug: dev,
			supportedLngs: Object.keys(translations),
			lng: languages.find((lng) => Object.keys(translations).includes(lng)),
			fallbackLng: 'en',
			resources: translations
		});
	}
}) satisfies LayoutLoad;
