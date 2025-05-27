/**
 * Från
 * https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers (2021-06-09)
 * https://web.dev/offline-cookbook/
 */
const cacheKey = 'cache-v1';

const cacheArray = [
  './index.html',
  './manifest.json',
  './style.css',
  './script.js',
  './img/icon-192x192.png',
  './img/icon-512x512.png',
  './img/icon-256x256.png',
  './img/icon-384x384.png',
  './offline.html'
];

const fallbackPage = './offline.html';

self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(cacheKey)
    .then(cache => {
      return cache.addAll([...cacheArray]);
    })
  );
});

/** Rensar cache */
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
      if (key === cacheKey) { return; }
      return caches.delete(key);
    }))
  }));
});

/** cache-filer först, upddaterar cache från servern */
self.addEventListener('fetch', function (event) {
  if (!(event.request.url.indexOf('http') === 0)) return;
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request).then(function (networkResponse) {
        return caches.open(cacheKey).then(function (cache) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    }).catch(() => caches.match(fallbackPage))
  );
});
