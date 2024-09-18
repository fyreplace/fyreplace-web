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
	UsersEndpointApi,
	type ErrorContext,
	type FetchParams,
	type Middleware,
	type RequestContext,
	type TokensEndpointApiInterface,
	type UsersEndpointApiInterface
} from './generated';
import FakeTokensEndpointApi from './fakes/tokens-endpoint';
import FakeUsersEndpointApi from './fakes/users-endpoint';

let useFakes = false;

export function useFakeEndpoints() {
	useFakes = true;
}

export async function getTokensClient(): Promise<TokensEndpointApiInterface> {
	return useFakes ? new FakeTokensEndpointApi() : new TokensEndpointApi(await makeConfiguration());
}

export async function getUsersClient(): Promise<UsersEndpointApiInterface> {
	return useFakes ? new FakeUsersEndpointApi() : new UsersEndpointApi(await makeConfiguration());
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
	onError: (error: ResponseError) => Promise<DisplayableError | void>
) {
	try {
		await action();
	} catch (error: any) {
		let displayableError: DisplayableError | null = null;

		if (error instanceof ResponseError) {
			if (error.response.status === 401) {
				setStoredItem('connection.token', '');
				displayableError = new DisplayableError('errors.401');
			} else {
				displayableError = (await onError(error)) ?? null;
			}
		} else if (error instanceof FetchError) {
			displayableError = new DisplayableError('errors.connection');
		} else {
			displayableError = new DisplayableError();
		}

		if (displayableError) {
			eventBus.publish(displayableError);

			if (displayableError.title === new DisplayableError().title && !useFakes) {
				const Sentry = await import('@sentry/sveltekit');
				Sentry.captureException(error);
			}
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
