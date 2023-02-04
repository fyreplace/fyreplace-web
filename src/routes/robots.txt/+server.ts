import { env } from '$env/dynamic/public';

export function GET(): Response {
	const restrictions =
		env.PUBLIC_ENVIRONMENT === 'production'
			? ['/notifications', '/archive', '/drafts', '/settings']
			: ['/'];
	const robots = ['User-agent: *', ...restrictions.map((path) => `Disallow: ${path}`)];
	return new Response(robots.join('\n'), { headers: { 'Content-Type': 'text/plain' } });
}
