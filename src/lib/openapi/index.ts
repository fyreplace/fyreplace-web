import { dev } from '$app/environment';
import urls from '$lib/data/urls.json';
import { getStoredItem, setStoredItem } from '$lib/storage';
import { DisplayableError, eventBus } from '$lib/events';
import { sleep } from '$lib/utils';
import {
	Configuration,
	FetchError,
	ResponseError,
	TokensEndpointApi,
	type ErrorContext,
	type FetchParams,
	type Middleware,
	type RequestContext,
	type TokensEndpointApiInterface
} from './generated';
import FakeTokensEndpointApi from './fakes/tokens-endpoint';

let useFakes = false;

export function useFakeEndpoints() {
	useFakes = true;
}

export async function getTokensClient(): Promise<TokensEndpointApiInterface> {
	return useFakes ? new FakeTokensEndpointApi() : new TokensEndpointApi(await makeConfiguration());
}

async function makeConfiguration() {
	return new Configuration({
		basePath: await getBaseUrl(),
		middleware: [new RequestIdMiddleware()],
		accessToken: getStoredItem('connection.token') ?? undefined
	});
}

async function getBaseUrl() {
	const { env } = await import('$env/dynamic/public');

	if (dev) {
		return urls.local;
	} else if (env.PUBLIC_SENTRY_ENVIRONMENT === 'main') {
		return urls.main;
	} else {
		return urls.dev;
	}
}

export async function call(
	action: () => Promise<void>,
	onError: (error: ResponseError) => DisplayableError | void
) {
	try {
		await action();
	} catch (error: any) {
		if (error instanceof ResponseError) {
			if (error.response.status === 401) {
				setStoredItem('connection.token', null);
				eventBus.publish(new DisplayableError('errors.401'));
			} else {
				const displayableError = onError(error);

				if (displayableError) {
					eventBus.publish(displayableError);
				}
			}
		} else if (error instanceof FetchError) {
			eventBus.publish(new DisplayableError('errors.connection'));
		} else {
			eventBus.publish(new DisplayableError('errors.unknown'));
		}
	}
}

class RequestIdMiddleware implements Middleware {
	private static readonly headerName = 'X-Request-Id';
	private static attempts = new Map<string, number>();

	pre(context: RequestContext): Promise<FetchParams | void> {
		const headers = { ...context.init.headers } as Record<string, string>;

		if (!headers[RequestIdMiddleware.headerName]) {
			headers[RequestIdMiddleware.headerName] = Math.random().toString(36).substring(2);
		}

		context.init.headers = headers;
		return Promise.resolve(context);
	}

	async onError(context: ErrorContext): Promise<Response | void> {
		let promise: ReturnType<RequestIdMiddleware['onError']>;

		if (context.response) {
			promise = Promise.resolve(context.response);
		}

		const headers = context.init.headers as Record<string, string>;
		const requestId = headers[RequestIdMiddleware.headerName]!;
		const retryCount = RequestIdMiddleware.attempts.get(requestId) ?? 1;

		if (retryCount < 3) {
			RequestIdMiddleware.attempts.set(requestId, retryCount + 1);
			await sleep(1000);
			promise = context.fetch(context.url, context.init);
		} else {
			promise = Promise.reject(context.error);
		}

		try {
			return await promise;
		} finally {
			RequestIdMiddleware.attempts.delete(requestId);
		}
	}
}
