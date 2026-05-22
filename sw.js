const CACHE_NAME = 'fire-check-v3';
// 移除開頭的 /，使用相對路徑
const ASSETS = [
  './',
  './index.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch(err => console.log('部分資源快取失敗', err));
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      // 如果有快取就用快取，沒有就去網路抓
      return res || fetch(e.request);
    })
  );
});
