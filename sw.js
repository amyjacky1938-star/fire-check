const CACHE_NAME = 'fire-check-v2'; // 更新版本號
const ASSETS = [
  '/',
  '/index.html',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/html5-qrcode'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      // 若在快取中找到則回傳，否則從網路抓取
      return res || fetch(e.request);
    })
  );
});
