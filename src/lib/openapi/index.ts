import { dev } from '$app/environment';
import urls from '$lib/data/urls.json';
import { getStoredItem, setStoredItem } from '$lib/storage';
import { DisplayableError, eventBus } from '$lib/events';
import {
	Configuration,
	FetchError,
	ResponseError,
	TokensEndpointApi,
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
