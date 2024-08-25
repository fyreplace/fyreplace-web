import { getTokensClient } from './openapi';
import { getStoredItem, setStoredItem } from './storage';

let started = false;

export function scheduleTokenRefresh() {
	if (!started) {
		started = true;
		refreshToken();
	}
}

async function refreshToken() {
	setTimeout(scheduleTokenRefresh, 1000 * 60 * 60 * 24);

	if (!getStoredItem('connection.token')) {
		return;
	}

	try {
		const client = await getTokensClient();
		const token = await client.getNewToken();
		setStoredItem('connection.token', token);
	} catch {}
}
