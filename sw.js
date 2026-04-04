const CACHE = 'weight-tracker-v1';

// Assets to pre-cache on install
const PRECACHE = [
  '/WeightTracker/Tracker.html',
  '/WeightTracker/icon.svg',
  '/WeightTracker/manifest.json',
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE))
  );
});

self.addEventListener('activate', event => {
  // Remove old caches
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Let Firebase/Firestore requests go straight to network (Firebase has its own offline cache)
  if (url.hostname.includes('firestore.googleapis.com') ||
      url.hostname.includes('firebase') ||
      url.hostname.includes('google.com')) {
    return;
  }

  // For our own HTML and assets: cache-first, update in background
  if (url.pathname.startsWith('/WeightTracker/') ||
      url.hostname === 'fonts.googleapis.com' ||
      url.hostname === 'fonts.gstatic.com' ||
      url.hostname === 'cdnjs.cloudflare.com' ||
      url.hostname === 'www.gstatic.com') {
    event.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          const networkFetch = fetch(event.request).then(response => {
            if (response.ok) cache.put(event.request, response.clone());
            return response;
          }).catch(() => null);
          return cached || networkFetch;
        })
      )
    );
  }
});
