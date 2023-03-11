/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { build, files, version } from '$service-worker';

const sw = self as unknown as ServiceWorkerGlobalScope;
const svelteCacheName = `svelte-${version}`;
const svelteAssets = build.concat(files);

sw.addEventListener('install', (event) => {
  event.waitUntil(cacheSvelte());
});

sw.addEventListener('activate', (event) => {
  event.waitUntil(evictSvelte());
});

sw.addEventListener('fetch', (event) => {
  if (event.request.method === 'GET') {
    event.waitUntil(respond(event.request));
  }
});

async function cacheSvelte() {
  const cache = await caches.open(svelteCacheName);
  await cache.addAll(svelteAssets);
}

async function evictSvelte() {
  for (const key of await caches.keys()) {
    if (key.startsWith('svelte-') && key !== svelteCacheName) {
      await caches.delete(key);
    }
  }
}

async function respond(request: Request) {
  const cache = await caches.open(svelteCacheName);
  const url = new URL(request.url);

  if (svelteAssets.includes(url.pathname)) {
    return cache.match(request);
  }

  try {
    const response = await fetch(request);

    if (response.ok && url.origin === location.origin) {
      await cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    return cache.match(request);
  }
}
