import i18next from 'i18next';
import translations from './src/lib/data/translations.json';
import { useFakeNavigation } from './src/lib/destinations';
import { useFakeEndpoints } from './src/lib/openapi';

if (!i18next.isInitialized) {
	await i18next.init({
		supportedLngs: ['en'],
		lng: 'en',
		resources: translations
	});
}

useFakeNavigation();
useFakeEndpoints();
