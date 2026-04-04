const CACHE_NAME = 'anitas-bakers-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/pages/home.html',
  '/pages/menu.html',
  '/style.css',
  '/app.js',
  '/logo/Anita\'s Bakers.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Only cache GET requests, and not firestore requests
  if (event.request.method !== 'GET' || event.request.url.includes('firestore.googleapis.com')) return;

  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        // Return cached version if found, otherwise fetch from network
        return cached || fetch(event.request).then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      }).catch(() => {
        // Fallback or ignore for disconnected state
      })
  );
});
