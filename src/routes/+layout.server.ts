import type { LayoutServerLoad } from './$types';

export const load = (async (params) => ({
	acceptedLanguages: (params.request.headers.get('accept-language') ?? '')
		.split(';')
		.sort((a, b) => getQuality(b) - getQuality(a))
		.flatMap((language) => language.split(','))
		.filter((language) => !language.includes('q='))
})) satisfies LayoutServerLoad;

function getQuality(language: string) {
	return parseFloat(language.split('q=')[1] || '1');
}
