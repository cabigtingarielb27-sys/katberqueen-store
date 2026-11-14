const CACHE='queeny-standalone-2008d3660cb3';
const ASSETS=['./','./index.html','./seed-data.js','./manifest.json','./icon.png','./icon-192.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>(k.startsWith('queeny-standalone-')||k.startsWith('queeny-store-v'))&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(e.request,copy)));}return r;}).catch(()=>caches.match(e.request).then(hit=>hit||(e.request.mode==='navigate'?caches.match('./index.html'):Response.error()))));});
