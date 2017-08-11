const APP_CACHE_NAME = 'loiane-com-app';
const STATIC_CACHE_NAME = 'loiane-com-static';

const CACHE_STATIC = [
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

const CACHE_APP = [
  '/',
  '/index.html'/*,
  '/about',
  '/speaking',
  '/categories/angular'*/
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME),
      caches.open(APP_CACHE_NAME),
      self.skipWaiting()
    ]).then(function(storage) {
      var static_cache = storage[0];
      var app_cache = storage[1];
      return Promise.all([
        static_cache.addAll(CACHE_STATIC),
        app_cache.addAll(CACHE_APP)
      ]);
    })
  );
});

self.addEventListener('install', function(e) {
  e.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME),
      caches.open(APP_CACHE_NAME),
      self.skipWaiting()
    ]).then(function(storage) {
      var static_cache = storage[0];
      var app_cache = storage[1];
      return Promise.all([
        static_cache.addAll(CACHE_STATIC),
        app_cache.addAll(CACHE_APP)
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  var response;
  event.respondWith(
    caches
      .match(event.request)
      .then(function(match) {
        return match || fetch(event.request);
      })
      .catch(function() {
        return fetch(event.request);
      })
      .then(function(r) {
        response = r;
        caches.open(cacheName).then(function(cache) {
          cache.put(event.request, response);
        });
        return response.clone();
      })
  );
});
