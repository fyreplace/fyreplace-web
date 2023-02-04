import { describe, it, expect } from 'vitest';
import { GET } from './+server';
import { env } from '$env/dynamic/public';

describe('robots.txt', () => {
	it('disallows crawling', async () => {
		const result = await GET().text();
		expect(result).toBe(
			env.PUBLIC_ENVIRONMENT === 'production'
				? 'User-agent: *\nDisallow: /notifications\nDisallow: /archive\nDisallow: /drafts\nDisallow: /settings'
				: 'User-agent: *\nDisallow: /'
		);
	});
});
