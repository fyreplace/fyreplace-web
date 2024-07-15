import { getLanguages } from '$lib/i18n';
import type { LayoutServerLoad } from './$types';

export const load = (async (params) => ({
	acceptedLanguages: getLanguages(params.request)
})) satisfies LayoutServerLoad;
