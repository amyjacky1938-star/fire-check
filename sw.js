const CACHE_NAME = 'fire-check-v4';
// 改為絕對路徑，確保與您的 GitHub Pages 路徑對齊
const ASSETS = [
  '/fire-check/',
  '/fire-check/index.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      // 離線優先：有快取就用，沒快取就去網路上抓
      return res || fetch(e.request);
    })
  );
});
