// v9：此 Service Worker 只負責清除舊版快取後自行解除註冊。
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter(key => key.startsWith('service-approval-mobile-'))
        .map(key => caches.delete(key))
    );
    await self.registration.unregister();
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
