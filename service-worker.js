importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js"),workbox.setConfig({debug:!0}),workbox.core.setCacheNameDetails({prefix:"mct",suffix:"v0.0.5",precache:"installtime",runtime:"runtime"}),self.addEventListener("message",(e=>{if(!e.data||!e.data.message)throw new Error(`Message event handler: event.data=[${e.data}], event.data.message=[${e.data.message}]`);console.log(">>> Message received from client: ",e.data),"SKIP_WAITING"===e.data.message?self.skipWaiting():"CLIENTS_CLAIM"===e.data.message?self.clients.claim():debug.warning(">>>> No idea what to do with that message!")}));const{pageCache:e,imageCache:a,staticResourceCache:s,googleFontsCache:t,offlineFallback:o}=workbox.recipes,{registerRoute:i}=workbox.routing,{ExpirationPlugin:n}=workbox.expiration,{RangeRequestsPlugin:r}=workbox.rangeRequests,{CacheableResponse:c,CacheableResponsePlugin:g}=workbox.cacheableResponse,{precacheAndRoute:l}=workbox.precaching,{StaleWhileRevalidate:d,CacheFirst:m}=workbox.strategies;l([{url:"/index.html",revision:0}]),e(),t(),s(),a(),o();i((e=>{const{request:a}=e;return"mp3"===a.destination||"media"===a.destination||"audio"===a.destination||a.url.indexOf(".mp3")===a.url.length-4}),new m({cacheName:"static-media",plugins:[new g({statuses:[0,200]}),new r]})),i(/^https:\/\/storage\.googleapis\.com\/tfhub-tfjs-modules/,new m({cacheName:"tf-models-googleapi",plugins:[new g({statuses:[0,200]}),new n({maxAgeSeconds:2592e3})]})),i(/^https:\/\/tfhub\.dev\/mediapipe\/tfjs-model/,new m({cacheName:"tf-models-tfhub",plugins:[new g({statuses:[0,200]}),new n({maxAgeSeconds:2592e3})]}));var u={};export{u as default};
//# sourceMappingURL=service-worker.js.map