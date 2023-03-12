import { redirect } from '@sveltejs/kit';
import type { PageLoad } from '../$types';

export const load = ((event) => {
  throw redirect(307, event.url.toString().replace('-precomposed', ''));
}) satisfies PageLoad;
