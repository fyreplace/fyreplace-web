import i18next from 'i18next';
import translations from './src/lib/data/translations.json';

if (!i18next.isInitialized) {
	await i18next.init({
		supportedLngs: ['en'],
		lng: 'en',
		resources: translations
	});
}
