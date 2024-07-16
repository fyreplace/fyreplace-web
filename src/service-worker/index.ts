/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { build, files, version } from '$service-worker';

const worker = self as unknown as ServiceWorkerGlobalScope;
const currentCache = `svelte-cache-${version}`;
const assets = [...build, ...files];

async function createCache() {
	const cache = await caches.open(currentCache);
	await cache.addAll(assets);
}

async function deleteOldCaches() {
	for (const key of await caches.keys()) {
		if (key !== currentCache) {
			await caches.delete(key);
		}
	}
}

async function respond(event: FetchEvent) {
	const url = new URL(event.request.url);
	const cache = await caches.open(currentCache);

	if (assets.includes(url.pathname)) {
		const response = await cache.match(url.pathname);

		if (response) {
			return response;
		}
	}

	const response = await fetch(event.request);

	if (!(response instanceof Response)) {
		throw new Error('Network unavailable');
	}

	if (response.status === 200) {
		cache.put(event.request, response.clone());
	}

	return response;
}

worker.addEventListener('install', (event) => event.waitUntil(createCache()));

worker.addEventListener('activate', (event) => event.waitUntil(deleteOldCaches()));

worker.addEventListener('fetch', (event) => {
	if (event.request.method === 'GET') {
		event.respondWith(respond(event));
	}
});
