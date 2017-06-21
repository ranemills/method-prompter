importScripts('serviceworker-cache-polyfill.js');

self.addEventListener('install', function (e) {
  e.waitUntil(
  caches.open('methodPrompter').then(function (cache) {
    return cache.addAll([
      '',
      'index.html',
      'app.js',
      'third-party.css',
      'third-party.js',
    ]);
  })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
  caches.open('methodPrompter').then(function(cache) {
    return cache.match(event.request).then(function (response) {
      return response || fetch(event.request).then(function(response) {
        console.log('adding ' + event.request + ' to the cache');
        cache.put(event.request, response.clone());
        return response;
      });
    });
  })
  );
});