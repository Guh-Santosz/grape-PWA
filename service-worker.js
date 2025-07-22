const CACHE_NAME = 'grape-cache-v1';
const urlsToCache = [
  './',
  'index.html',
  'index.css',
  'index.js',
  'pagina-secundaria/pagina-edica-valores.html',
  'pagina-secundaria/pagina-edica-valores.css',
  'pagina-secundaria/pagina-edica-valores.js',
  'icones/png/logo-app1.png',
  'icones/png/logo-app2.png',
  'icones/svg/icone-calendario.svg',
  'icones/svg/icone-relogio.svg',
  'icones/svg/icone-voltar.svg',
  'icones/svg/icone-menos.svg',
  'icones/svg/icone-piracicabana.svg',
  'icones/svg/icone-sou-americana.svg',
  'icones/svg/icone-sou-limeira.svg',
  'manifest.json',
  'fontes/static/Sen-Regular.woff2',
];

self.addEventListener('install', event => 
{
  event.waitUntil
  (
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => 
{

  event.waitUntil
  (
    caches.keys().then(keys =>
      Promise.all(keys.map(key => 
      {
        if (key !== CACHE_NAME) return caches.delete(key);
      })))
  );
  self.clients.claim(); 
});

self.addEventListener('fetch', event => 
{
  event.respondWith
  (
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    ));
});
