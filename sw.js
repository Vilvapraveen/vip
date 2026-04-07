'use strict';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JAYA'S ORGANIC — Service Worker v2.0
// Strategies: Cache-First (images), StaleWhileRevalidate (HTML/JS), Network-First (API)
// Features: Offline support, Background sync, Push notifications, Auto-update
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CACHE_VERSION    = 'v2.0.0';
const STATIC_CACHE     = `jaya-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE    = `jaya-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE      = `jaya-images-${CACHE_VERSION}`;
const ALL_CACHES       = [STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE];

// Core app shell — cached immediately on install
const STATIC_ASSETS = [
  '/index.html',
  '/script.js',
  '/manifest.json',
  // Fallback offline page (served when navigation fails)
  // '/offline.html', // create if needed
];

// ─── INSTALL ──────────────────────────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => {
        console.log(`[SW v${CACHE_VERSION}] Installed & cached app shell`);
        return self.skipWaiting(); // Activate immediately
      })
      .catch(err => console.warn('[SW] Install failed:', err))
  );
});

// ─── ACTIVATE ────────────────────────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      // Delete old caches
      caches.keys().then(keys =>
        Promise.all(
          keys.filter(k => !ALL_CACHES.includes(k)).map(k => {
            console.log('[SW] Deleting old cache:', k);
            return caches.delete(k);
          })
        )
      ),
      // Take control of all open tabs immediately
      self.clients.claim(),
    ]).then(() => {
      console.log(`[SW v${CACHE_VERSION}] Activated & controlling all clients`);
      // Notify all clients of SW update
      self.clients.matchAll().then(clients =>
        clients.forEach(c => c.postMessage({ type: 'SW_ACTIVATED', version: CACHE_VERSION }))
      );
    })
  );
});

// ─── FETCH ────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip: non-GET, chrome-extension, browser-sync, analytics
  if (request.method !== 'GET') return;
  if (request.url.startsWith('chrome-extension://')) return;
  if (url.hostname.includes('google-analytics.com')) return;
  if (url.hostname.includes('googletagmanager.com')) return;
  if (url.hostname.includes('ws.') || url.hostname.includes('sockjs')) return;

  // Strategy 1: API/Network calls → Network First
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(_networkFirst(request));
    return;
  }

  // Strategy 2: Images (Unsplash, etc.) → Cache First (long TTL)
  if (request.destination === 'image' || url.hostname.includes('unsplash.com') || url.hostname.includes('images.')) {
    event.respondWith(_cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // Strategy 3: CDN resources (Tailwind, fonts) → Cache First
  if (url.hostname.includes('cdn.tailwindcss.com') || url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fontshare.com')) {
    event.respondWith(_cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Strategy 4: App Shell (HTML, JS) → Stale While Revalidate
  if (request.destination === 'document' || url.pathname.endsWith('.js') || url.pathname.endsWith('.css')) {
    event.respondWith(_staleWhileRevalidate(request, STATIC_CACHE));
    return;
  }

  // Default: Stale While Revalidate
  event.respondWith(_staleWhileRevalidate(request, DYNAMIC_CACHE));
});

// ─── CACHING STRATEGIES ───────────────────────────────────────────────────────

/** Network First: Try network, fall back to cache */
async function _networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || _offlineFallback(request);
  }
}

/** Cache First: Try cache, fetch + cache if miss */
async function _cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return _offlineFallback(request);
  }
}

/** Stale While Revalidate: Return cache immediately, update in background */
async function _staleWhileRevalidate(request, cacheName) {
  const cache  = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);

  return cached || await fetchPromise || _offlineFallback(request);
}

/** Offline fallback */
async function _offlineFallback(request) {
  if (request.destination === 'document') {
    const cached = await caches.match('/index.html');
    if (cached) return cached;
    return new Response(
      `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Offline — Jaya's Organic</title><style>body{font-family:system-ui;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:linear-gradient(135deg,#fef2f2,#f0fdf4);text-align:center;padding:2rem}h1{color:#ef4444;font-size:2rem}p{color:#666}</style></head><body><div><div style="font-size:4rem">🌿</div><h1>Jaya's Organic</h1><p>You're offline. Check your internet connection and try again.</p><p>📱 You can still <a href="https://wa.me/919600572691" style="color:#ef4444;font-weight:bold">WhatsApp us</a> to place your order!</p></div></body></html>`,
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    );
  }
  if (request.destination === 'image') {
    return new Response(
      `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f3f4f6"/><text y="50%" dominant-baseline="middle" text-anchor="middle" x="50%" font-size="40">🍲</text></svg>`,
      { status: 200, headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
  return new Response('Offline', { status: 503 });
}

// ─── BACKGROUND SYNC ──────────────────────────────────────────────────────────
self.addEventListener('sync', event => {
  console.log('[SW] Background sync:', event.tag);
  if (event.tag === 'sync-pending-orders') {
    event.waitUntil(_syncPendingOrders());
  }
  if (event.tag === 'sync-reviews') {
    event.waitUntil(_syncPendingReviews());
  }
});

async function _syncPendingOrders() {
  // In production: read from IndexedDB, POST to backend API
  console.log('[SW] Syncing pending orders...');
  try {
    // const db = await openDB();
    // const orders = await db.getAll('pending_orders');
    // for (const order of orders) { await fetch('/api/orders', {...}); await db.delete('pending_orders', order.id); }
    console.log('[SW] Orders synced');
  } catch(e) {
    console.warn('[SW] Order sync failed:', e);
  }
}

async function _syncPendingReviews() {
  console.log('[SW] Syncing pending reviews...');
}

// ─── PUSH NOTIFICATIONS ───────────────────────────────────────────────────────
self.addEventListener('push', event => {
  if (!event.data) return;

  let data = { title: "Jaya's Organic", body: 'You have a new update!', icon: '/icon-192.png', badge: '/icon-72.png', tag: 'jaya-notification', url: '/' };

  try { Object.assign(data, event.data.json()); }
  catch { data.body = event.data.text(); }

  const options = {
    body:    data.body,
    icon:    data.icon    || 'https://placehold.co/192x192/ef4444/ffffff?text=JO',
    badge:   data.badge   || 'https://placehold.co/72x72/ef4444/ffffff?text=JO',
    tag:     data.tag,
    data:    data,
    vibrate: [200, 100, 200],
    actions: [
      { action: 'order', title: '🛒 Order Now',    icon: 'https://placehold.co/48x48/22c55e/fff?text=🛒' },
      { action: 'view',  title: '👀 View Details', icon: 'https://placehold.co/48x48/3b82f6/fff?text=👀' },
    ],
    requireInteraction: data.urgent || false,
    timestamp: Date.now(),
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const { action, notification: { data } } = event;

  let targetUrl = data?.url || '/';
  if (action === 'order') targetUrl = 'https://wa.me/919600572691?text=Hi+order+please!';
  if (action === 'view')  targetUrl = data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
      // Focus existing tab if open
      const existing = clients.find(c => c.url.includes(self.location.origin));
      if (existing) { existing.focus(); existing.navigate(targetUrl); }
      else           { self.clients.openWindow(targetUrl); }
    })
  );
});

self.addEventListener('notificationclose', event => {
  console.log('[SW] Notification dismissed:', event.notification.tag);
  // In production: track dismissal analytics
});

// ─── MESSAGES FROM APP ────────────────────────────────────────────────────────
self.addEventListener('message', event => {
  const { type, payload } = event.data || {};

  if (type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (type === 'CACHE_PRODUCT_IMAGES') {
    // Pre-cache product images when user browses
    caches.open(IMAGE_CACHE).then(cache => {
      cache.addAll(payload?.urls || []).catch(() => {});
    });
  }

  if (type === 'CLEAR_CACHE') {
    caches.delete(DYNAMIC_CACHE).then(() => {
      event.source?.postMessage({ type: 'CACHE_CLEARED' });
    });
  }
});

console.log(`[SW v${CACHE_VERSION}] Service Worker script parsed ✅`);
