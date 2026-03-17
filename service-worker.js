const CACHE_NAME = "comida-lucrativa-v2";

const urlsToCache = [
"/",
"/index.html",
"/acesso.html",
"/app.html",
"/gerador-cardapio.html",
"/gerador-nomes.html",
"/gerador-combos.html",
"/gerador-post.html",
"/icon-192.png",
"/icon-512.png"
];

self.addEventListener("install", event => {

event.waitUntil(

caches.open(CACHE_NAME)
.then(cache => {
return cache.addAll(urlsToCache);
})

);

});

self.addEventListener("activate", event => {

event.waitUntil(

caches.keys().then(cacheNames => {

return Promise.all(

cacheNames.map(cache => {

if (cache !== CACHE_NAME) {
return caches.delete(cache);
}

})

);

})

);

});

self.addEventListener("fetch", event => {

event.respondWith(

caches.match(event.request)
.then(response => {

if(response){
return response;
}

return fetch(event.request);

})

);

});
