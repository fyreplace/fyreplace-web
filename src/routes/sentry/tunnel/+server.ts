import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export const POST = (async (event) => {
	if (!env.PUBLIC_SENTRY_DSN) {
		return new Response(null, { status: 403 });
	}

	const allowedDsnUrl = new URL(env.PUBLIC_SENTRY_DSN);
	const credentials = `${allowedDsnUrl.username}:${allowedDsnUrl.password}`;
	const envelope = await event.request.clone().text();

	try {
		const requestHeader = JSON.parse(envelope.split('\n')[0]);

		if (requestHeader.dsn !== env.PUBLIC_SENTRY_DSN) {
			return new Response(null, { status: 400 });
		}
	} catch (error) {
		return new Response(null, { status: 400 });
	}

	allowedDsnUrl.username = '';
	allowedDsnUrl.password = '';
	allowedDsnUrl.pathname = `/api${allowedDsnUrl.pathname}/envelope/`;

	const response = await fetch(allowedDsnUrl.toString(), {
		method: 'POST',
		headers: {
			Authorization: 'Basic ' + Buffer.from(credentials).toString('base64')
		},
		credentials: 'include',
		body: await event.request.blob()
	});

	// Responses from fetch have immutable headers, but SvelteKit needs to modify them
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers: new Headers(response.headers)
	});
}) satisfies RequestHandler;
