!function(e,t,o,n){var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i="function"==typeof a.parcelRequire&&a.parcelRequire,s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function r(o,n){if(!t[o]){if(!e[o]){var a="function"==typeof parcelRequire&&parcelRequire;if(!n&&a)return a(o,!0);if(i)return i(o,!0);if(s&&"string"==typeof o)return s(o);var c=new Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}l.resolve=function(t){return e[o][1][t]||t},l.cache={};var u=t[o]=new r.Module(o);e[o][0].call(u.exports,l,u,u.exports,this)}return t[o].exports;function l(e){return r(l.resolve(e))}}r.isParcelRequire=!0,r.Module=function(e){this.id=e,this.bundle=r,this.exports={}},r.modules=e,r.cache=t,r.parent=i,r.register=function(t,o){e[t]=[function(e,t){t.exports=o},{}]},a.parcelRequire=r;for(var c=0;c<o.length;c++)r(o[c]);if(o.length){var u=r(o[o.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd&&define((function(){return u}))}}({a8f3bcb152bf53a7519b0cc47cf626ed:[function(e,t,o){"use strict";const n=e("./version").VERSION;importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js"),workbox.setConfig({debug:!1}),workbox.core.setCacheNameDetails({prefix:"mct",suffix:"v0.0.5",precache:"installtime",runtime:"runtime"}),self.addEventListener("message",e=>{if(!e.data||!e.data.message)throw new Error(`Message event handler: event.data=[${e.data}], event.data.message=[${e.data.message}]`);console.log(">>> Message received from client: ",e.data),"SKIP_WAITING"===e.data.message?self.skipWaiting():"CLIENTS_CLAIM"===e.data.message?self.clients.claim():debug.warning(">>>> No idea what to do with that message!")});const{pageCache:a,imageCache:i,staticResourceCache:s,googleFontsCache:r,offlineFallback:c}=workbox.recipes,{registerRoute:u}=workbox.routing,{ExpirationPlugin:l}=workbox.expiration,{RangeRequestsPlugin:f}=workbox.rangeRequests,{CacheableResponse:d,CacheableResponsePlugin:p}=workbox.cacheableResponse,{precacheAndRoute:g}=workbox.precaching,{StaleWhileRevalidate:b,CacheFirst:m}=workbox.strategies;g([{url:"index.html",revision:n}]),a(),r(),s(),i(),c();u(e=>{const{request:t}=e;return"mp3"===t.destination||"media"===t.destination||"audio"===t.destination||t.url.indexOf(".mp3")===t.url.length-4},new m({cacheName:"static-media",plugins:[new p({statuses:[0,200]}),new f]})),u(/^https:\/\/storage\.googleapis\.com\/tfhub-tfjs-modules/,new m({cacheName:"tf-models-googleapi",plugins:[new p({statuses:[0,200]}),new l({maxAgeSeconds:2592e3})]})),u(/^https:\/\/tfhub\.dev\/mediapipe\/tfjs-model/,new m({cacheName:"tf-models-tfhub",plugins:[new p({statuses:[0,200]}),new l({maxAgeSeconds:2592e3})]}))},{"./version":"25488683cc04bb43faf629e105172bc8"}],"25488683cc04bb43faf629e105172bc8":[function(e,t,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.DATE=o.VERSION=void 0;o.VERSION="0.32.0";o.DATE=1611620302529},{}]},{},["a8f3bcb152bf53a7519b0cc47cf626ed"]);
//# sourceMappingURL=service-worker.js.map
