import { useNewStoringEventBus } from './events';
import { setStoredItem } from './storage';
import FakeTokensEndpointApi from './openapi/fakes/tokens-endpoint';

export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function makeId(): string {
	return Math.random().toString(36).substring(2);
}

export function setUpTesting(options: { withToken: boolean }) {
	useNewStoringEventBus();
	window.localStorage.clear();

	if (options.withToken) {
		setStoredItem('connection.token', FakeTokensEndpointApi.token);
	}
}
