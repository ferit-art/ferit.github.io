/**
 * Från
 * https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers (2021-06-09)
 * https://web.dev/offline-cookbook/
 */
const cacheKey = 'cache-v1';

const cacheArray = [
  '/miniprojekt_3.2/index.html',
  '/miniprojekt_3.2/manifest.json',
  '/miniprojekt_3.2/style.css',
  '/miniprojekt_3.2/script.js',
  '/miniprojekt_3.2/img/phone.png',
  '/miniprojekt_3.2/img/profilephoto.jpg',
  '/miniprojekt_3.2/img/message.png',
  '/miniprojekt_3.2/img/mail.png',
  '/miniprojekt_3.2/img/link.png',
  '/miniprojekt_3.2/img/info.png',
  '/miniprojekt_3.2/offline.html'
];

const fallbackPage = '/miniprojekt_3.2/offline.html';

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
