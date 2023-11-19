//Asignar nombre y version de la cache 

const CACHE_NAME= 'v1_cache_JennyPWA';

//ficheros a cachear en la aplicación
var urlsToCache=[
    './',
    './img/menny.png', 
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png', 
    './img/instagram.png', 
    './img/twitter.png', 
    './img/favicon-1024.jpg', 
    './img/favicon-512.jpg',
    './img/favicon-384.jpg',
    './img/favicon-256.jpg',
    './img/favicon-192.jpg',
    './img/favicon-128.jpg',
    './img/favicon-96.jpg',
    './img/favicon-64.jpg',
    './img/favicon-32.jpg',
    './img/favicon-16.jpg',
]; 

//evento install
//Instalacion del serviceWorker y guarda en cache 
self.addEventListener('install', e=>{
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                    .then(() =>{
                        self.skipWaiting();
                    });
        })
        .catch(err => console.log('No se ha registrado el cache', err))
    );
});


//EVENTO ACTIVATE
//QUE LA APP FUNCIONE SIN CONEXION 
self.addEventListener('activate', e =>{
    const cacheWhitelist =[CACHE_NAME];

    e.waitUntil(
        caches.keys()
            .then(cacheNames =>{
                return Promise.all(
                    cacheNames.map(cacheName =>{

                        if(cacheWhitelist.indexOf(cacheName) === -1){
                            //BORRAR ELEMENTOS QUE NO SE NECESITAN
                            return caches.delete(cacheName);
                        }
                        
                    })
                );
            })
            .then(() =>{
                //activar cache
                self.clients.claim(); 
            })
    );
});

//EVENTO FECTH
self.addEventListener('fetch', e=>{

    e.respondWith(
        caches.match(e.request)
        .then(res =>{
            if(res){
                return res;
            }
            return fetch(e.request);
        })
    );
});