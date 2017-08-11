const VERSION = '0.0.1';

const APP_CACHE_NAME = 'loiane-com-app';

const CACHE_APP = [
  '/',
  '/index.html',
  '/images/loiane.jpg',
  '/css/main.css',
  '/fonts/tt-regular-webfont.woff2',
  '/fonts/tt-medium-webfont.woff2',
  '/fonts/materialdesignicons-webfont.woff2?v=2.0.46',
  '/images/favicons/apple-touch-icon.png',
  '/images/favicons/favicon-16x16.png',
  '/images/favicons/favicon-32x32.png',
  '/images/favicons/android-chrome-192x192.png',
  '/images/favicons/android-chrome-512x512.png',
  '/images/tags/angular.svg',
  '/images/tags/pt-br.svg',
  '/images/icons/prev.svg',
  '/images/icons/next.svg',
  '/js/bundle.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(APP_CACHE_NAME).then(cache => {
      return cache
        .addAll(CACHE_APP)
        .then(self.skipWaiting())
        .catch(err => console.log(err));
    })
  );
});

self.addEventListener('activate', function(event) {
  return self.clients.claim();
});

this.addEventListener('fetch', function(event) {
  // Ignore non-get request like when accessing the admin panel
  if (event.request.method !== 'GET') {
    return;
  }
  // Don't try to handle non-secure assets because fetch will fail
  if (/http:/.test(event.request.url)) {
    return;
  }

  event.respondWith(
    caches.open(APP_CACHE_NAME).then(function(cache) {
      return fetch(event.request)
        .then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
        .catch(function() {
          return cache.match(event.request);
        });
    })
  );
});
