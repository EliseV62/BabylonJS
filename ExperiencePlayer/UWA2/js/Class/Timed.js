define("UWA/Class/Timed",["UWA/Core","UWA/Class","UWA/Utils","UWA/Utils/Client"],function(e,i,t,a){"use strict";var r,n=1,l=a.getVendorProperty(window,"cancelAnimationFrame")||clearTimeout,o=a.getVendorProperty(window,"requestAnimationFrame")||function(e){return setTimeout(e,1e3/60)};function s(e,i,a,r){return function(l,o,s,c,d){var m=this,u=m;return"function"==typeof l&&(d=c,c=s,s=o,o=l,u=l=n++),o=t.attempt.bind(null,o,function(t){throw m[e](l),new Error("The "+i.slice(0,-1)+' "'+l+'" failed with error "'+t+'".')},d||m),m[e](l),m[i]=m[i]||Object.create(null),m[i][l]=a(function(){r&&m[e](l),o()},s),c&&o(),u}}function c(e,i){return function(t){var a,r=this[e];if(r)if(void 0===t)for(a in r)i(r[a]),delete r[a];else r[t]&&(i(r[t]),delete r[t]);return this}}function d(e){return function(i){var t=this[e];return Boolean(t&&t[i])}}return r=i.extend({setPeriodical:s("clearPeriodical","periodicals",window.setInterval),clearPeriodical:c("periodicals",window.clearInterval),hasPeriodical:d("periodicals"),setDelayed:s("clearDelayed","delays",window.setTimeout,!0),clearDelayed:c("delays",window.clearTimeout),hasDelayed:d("delays"),setAnimate:s("clearAnimate","animates",o,!0),clearAnimate:c("animates",l),hasAnimate:d("animates"),setImmediate:s("clearImmediate","immediates",t.setImmediate,!0),clearImmediate:c("immediates",t.clearImmediate),hasImmediate:d("immediates"),clearAllTimed:function(){return this.clearImmediate(),this.clearAnimate(),this.clearDelayed(),this.clearPeriodical(),this}}),e.namespace("Timed",r,i)});