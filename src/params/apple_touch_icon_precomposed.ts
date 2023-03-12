import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
  return /^apple-touch-icon-precomposed.*\.png$/.test(param);
}) satisfies ParamMatcher;
