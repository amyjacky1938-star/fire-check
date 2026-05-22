const CACHE_NAME = 'fire-check-v1';

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(['/', '/index.html'])));
});

self.addEventListener('fetch', (e) => {
  // 關鍵修改：如果是讀取外部資源（如 unpkg, tailwind），直接走網路，不要卡在快取
  if (e.request.url.includes('unpkg.com') || e.request.url.includes('tailwindcss')) {
    e.respondWith(fetch(e.request));
  } else {
    e.respondWith(
      caches.match(e.request).then((res) => res || fetch(e.request))
    );
  }
});
