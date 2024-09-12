import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (() => redirect(307, '/feed')) satisfies PageLoad;
