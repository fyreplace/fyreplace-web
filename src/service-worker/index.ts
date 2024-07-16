/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { build, files, version } from '$service-worker';

const worker = self as unknown as ServiceWorkerGlobalScope;
const assets = [...build, ...files];
const cacheKeyPrefix = 'svelte';
const cacheKeySuffix = version;

async function getCacheKey() {
	const keys = await caches.keys();
	const key = keys.find((key) => key.endsWith(cacheKeySuffix));
	return key || `${cacheKeyPrefix}-${Date.now()}-${cacheKeySuffix}`;
}

async function onInstall() {
	worker.skipWaiting();
	const cache = await caches.open(await getCacheKey());
	await cache.addAll(assets);
}

async function onActivate() {
	for (const key of (await caches.keys()).sort().reverse().slice(3)) {
		await caches.delete(key);
	}

	worker.clients.claim();
}

async function onFetch(event: FetchEvent) {
	const url = new URL(event.request.url);
	const cache = await caches.open(await getCacheKey());

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

worker.addEventListener('install', (event) => event.waitUntil(onInstall()));

worker.addEventListener('activate', (event) => event.waitUntil(onActivate()));

worker.addEventListener('fetch', (event) => {
	if (event.request.method === 'GET') {
		event.respondWith(onFetch(event));
	}
});
