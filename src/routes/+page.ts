import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (() => {
  throw redirect(307, '/feed');
}) satisfies PageLoad;
