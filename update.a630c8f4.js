!function(e,r,t,n){var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o="function"==typeof a.parcelRequire&&a.parcelRequire,i="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function u(t,n){if(!r[t]){if(!e[t]){var a="function"==typeof parcelRequire&&parcelRequire;if(!n&&a)return a(t,!0);if(o)return o(t,!0);if(i&&"string"==typeof t)return i(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}f.resolve=function(r){return e[t][1][r]||r},f.cache={};var s=r[t]=new u.Module(t);e[t][0].call(s.exports,f,s,s.exports,this)}return r[t].exports;function f(e){return u(f.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=o,u.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]},a.parcelRequire=u;for(var c=0;c<t.length;c++)u(t[c]);if(t.length){var s=u(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=s:"function"==typeof define&&define.amd&&define((function(){return s}))}}({"2d76700b001e5bc68abef4562dd61779":[function(e,r,t){"use strict";function n(e,r,t,n,a,o,i){try{var u=e[o](i),c=u.value}catch(e){return void t(e)}u.done?r(c):Promise.resolve(c).then(n,a)}function a(e){return function(){var r=this,t=arguments;return new Promise((function(a,o){var i=e.apply(r,t);function u(e){n(i,a,o,u,c,"next",e)}function c(e){n(i,a,o,u,c,"throw",e)}u(void 0)}))}}Object.defineProperty(t,"__esModule",{value:!0}),t.updateApp=t.updater=void 0;var o=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,t=["Bytes","KB","MB","GB"];if(0===e)return"0 "+t[0];var n=1024,a=r<0?0:r,o=Math.floor(Math.log(e)/Math.log(n));return parseFloat((e/Math.pow(n,o)).toFixed(a))+" "+t[o]},i=function(){var r=a(regeneratorRuntime.mark((function r(){var t=arguments;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t.length>0&&void 0!==t[0]?t[0]:"service-worker.js",r.abrupt("return",new Promise((function(r,t){var n,i=function(){n.waiting.postMessage({type:"SKIP_WAITING"}),window.location.reload()},u=function(){var u=a(regeneratorRuntime.mark((function u(){var c;return regeneratorRuntime.wrap((function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,navigator.serviceWorker.register(e("service-worker.js"));case 2:if(n=u.sent,!n.installing||!navigator.storage){u.next=9;break}return u.next=7,navigator.storage.estimate();case 7:(c=u.sent)&&o(c.usage);case 9:n.onupdatefound=a(regeneratorRuntime.mark((function e(){var o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(o=n.installing).onstatechange=a(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("installed"!==o.state){e.next=11;break}if(!navigator.serviceWorker){e.next=8;break}return e.next=4,navigator.serviceWorker.getRegistration();case 4:(n=e.sent)&&n.waiting&&r(i),e.next=9;break;case 8:t("No Service Worker");case 9:e.next=12;break;case 11:t("Not Installed");case 12:case"end":return e.stop()}}),e)})));case 2:case"end":return e.stop()}}),e)})));case 10:case"end":return u.stop()}}),u)})));return function(){return u.apply(this,arguments)}}();"serviceWorker"in navigator?"complete"===document.readyState?u():window.addEventListener("load",u,{once:!0}):t("Service Workers not allowed")})));case 2:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}();t.updater=i;var u=function(){var e=a(regeneratorRuntime.mark((function e(){var r,t,n=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.length>0&&void 0!==n[0]?n[0]:"service-worker.js",e.prev=1,e.next=4,i(r);case 4:return t=e.sent,e.abrupt("return",{updater:t,updateAvailable:!0});case 8:return e.prev=8,e.t0=e.catch(1),console.log(e.t0),e.abrupt("return",!1);case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(){return e.apply(this,arguments)}}();t.updateApp=u},{"service-worker.js":"f0cb8eecbe34eb11e467a343b32473ab"}],f0cb8eecbe34eb11e467a343b32473ab:[function(e,r,t){r.exports=e("./bundle-url").getBundleURL()+e("./relative-path")("29e61d941d853ccd","00aa8ac05abde1c0")},{"./bundle-url":"da3a6c17234c5d68d4f1108f53a7bad4","./relative-path":"23e5b69ae2ffddc223b376d75aff9c28"}]},{},[]);
//# sourceMappingURL=update.a630c8f4.js.map