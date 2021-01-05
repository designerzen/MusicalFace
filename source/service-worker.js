// Not compiled so best add the ; to the es5

const WORKBOX_DEBUG_LOGGING = false;
// Workbox version - update manually when there are new releases.
const WORKBOX_VERSION = '6.0.2';
// Cache naming and versioning.
const APP_CACHE_PREFIX = 'mct';
const APP_CACHE_SUFFIX = `v${BUILD_MMR}`;

// importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.1/workbox-sw.js');
importScripts(`https://storage.googleapis.com/workbox-cdn/releases/${WORKBOX_VERSION}/workbox-sw.js`);

workbox.setConfig({debug: WORKBOX_DEBUG_LOGGING});
workbox.core.setCacheNameDetails({
    prefix: APP_CACHE_PREFIX,
    suffix: APP_CACHE_SUFFIX,
    precache: 'installtime',
    runtime: 'runtime',
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.message) {
      console.log(`>>> Message received from client: `, event.data);
      if (event.data.message === 'SKIP_WAITING') {
          self.skipWaiting();
      } else if (event.data.message === 'CLIENTS_CLAIM') {
          self.clients.claim();
      } else {
          debug.warning('>>>> No idea what to do with that message!');
      }
  } else {
      throw new Error(`Message event handler: event.data=[${event.data}], event.data.message=[${event.data.message}]`);
  }
});


// Load caching routines
const {
  pageCache,
  imageCache,
  staticResourceCache,
  googleFontsCache,
  offlineFallback,
} = workbox.recipes;

const {registerRoute} = workbox.routing;
const {StaleWhileRevalidate,CacheFirst} = workbox.strategies;
const {CacheableResponse, CacheableResponsePlugin} = workbox.cacheableResponse;
const {precacheAndRoute} = workbox.precaching;

// import { registerRoute } from 'workbox-routing';
// import { StaleWhileRevalidate } from 'workbox-strategies';
// import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// import {
//   pageCache,
//   imageCache,
//   staticResourceCache,
//   googleFontsCache,
//   offlineFallback,
// } from 'workbox-recipes';
// import { precacheAndRoute } from 'workbox-precaching';

// Include offline.html in the manifest
precacheAndRoute(self.__WB_MANIFEST);

pageCache();

googleFontsCache();

staticResourceCache();

imageCache();

offlineFallback();


// Music files!
const cacheName = 'static-resources';
const catchMedia = ({ request }) =>
  request.destination === 'mp3' ||
  request.destination === 'media' ||
  request.destination === 'audio';

// registerRoute(
//   matchCallback,
//   new StaleWhileRevalidate({
//     cacheName: CACHE_MEDIA,
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//     ],
//   }),
// );

registerRoute(
  catchMedia,
  new CacheFirst({
    cacheName: CACHE_MEDIA,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

// TF json
// https://storage.googleapis.com/tfhub-tfjs-modules/mediapipe/tfjs-model/facemesh/1/default/1/model.json

// Now the TF models...
// https://tfhub.dev/mediapipe/tfjs-model/iris/1/default/2/model.json?tfjs-format=file