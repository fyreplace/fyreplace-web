import translations from '$lib/data/translations.json';

function getQuality(language: string) {
	return parseFloat(language.split('q=')[1] || '1');
}

export function getLanguages(request: Request) {
	return (request.headers.get('accept-language') ?? '')
		.split(';')
		.sort((a, b) => getQuality(b) - getQuality(a))
		.flatMap((language) => language.split(','))
		.filter((language) => !language.includes('q='));
}

export function getOptimalLanguage(languages: readonly string[]) {
	return languages.find((language) => Object.keys(translations).includes(language)) ?? 'en';
}
