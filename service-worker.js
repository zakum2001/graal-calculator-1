// ✅ GraalCalc Service Worker (Auto-Update + Offline Support)
const CACHE_NAME = "graalcalc-v3"; // ⬅ bump version on each update
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./images/icon-192.png",
  "./images/icon-512.png",
];

// 🧱 Install: cache essential files immediately
self.addEventListener("install", (event) => {
  self.skipWaiting(); // activate immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// 👑 Activate: remove old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  return self.clients.claim(); // control all clients immediately
});

// ⚙️ Fetch: network first, fallback to cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request)) // offline fallback
  );
});
