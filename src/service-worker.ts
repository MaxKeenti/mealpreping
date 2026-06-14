/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

// Precache the built bundle + static files (D4) so the installed PWA — and the
// shopping list in particular — works offline in-store. SvelteKit auto-registers
// this file. `build`/`files`/`version` are injected at build time.
import { build, files, version } from '$service-worker';

const sw = self as unknown as ServiceWorkerGlobalScope;

const CACHE = `mealpreping-cache-${version}`;
const PRECACHE = [...build, ...files];

sw.addEventListener('install', (event) => {
	event.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE);
			await cache.addAll(PRECACHE);
			// Best-effort precache of the SPA shell so the first offline navigation
			// resolves even if the user never visited "/" online.
			try {
				const shell = await fetch('/');
				if (shell.ok) await cache.put('/', shell);
			} catch {
				// offline at install time — the shell gets cached on first navigation
			}
			await sw.skipWaiting();
		})()
	);
});

sw.addEventListener('activate', (event) => {
	event.waitUntil(
		(async () => {
			for (const key of await caches.keys()) {
				if (key !== CACHE) await caches.delete(key);
			}
			await sw.clients.claim();
		})()
	);
});

sw.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	const url = new URL(event.request.url);
	if (url.origin !== location.origin) return;

	event.respondWith(
		(async () => {
			const cache = await caches.open(CACHE);

			// Build/static assets are immutable per version: cache-first.
			if (PRECACHE.includes(url.pathname)) {
				const cached = await cache.match(url.pathname);
				if (cached) return cached;
			}

			// Page navigations: network-first, fall back to the cached shell offline.
			if (event.request.mode === 'navigate') {
				try {
					const response = await fetch(event.request);
					if (response.ok) cache.put(event.request, response.clone());
					return response;
				} catch {
					return (
						(await cache.match(event.request)) ??
						(await cache.match('/')) ??
						Response.error()
					);
				}
			}

			// Anything else: network, falling back to any cached copy.
			try {
				return await fetch(event.request);
			} catch {
				const cached = await cache.match(event.request);
				if (cached) return cached;
				return Response.error();
			}
		})()
	);
});
