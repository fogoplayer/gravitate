const VERSION = "1.4.2";

// This is the "Offline copy of assets" service worker

const CACHE = "pwabuilder-offline";

importScripts("./lib/workbox-sw.js");

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  new RegExp("/*"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE,
  })
);
