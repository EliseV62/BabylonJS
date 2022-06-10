define("UWA/Internal/Polyfill/NativeObjects",[],function(){"use strict";var t=Function("return this")();if(!t.UWA_SKIP_POLYFILLS){var e,r,n,o,i,c,a,l,p,u=Function.prototype.call,f=Object.prototype,s=Array.prototype,h=Object("a"),y="a"!==h[0]||!(0 in h);Function.prototype.bind||(Function.prototype.bind=function(t){var e,r,n=this,o=Array.prototype.slice,i=function(){};if("function"!=typeof n)throw new TypeError("Function.prototype.bind called on incompatible "+n);return e=o.call(arguments,1),r=function(){var i;return this instanceof r?(i=n.apply(this,e.concat(o.call(arguments))),i=Object(i)===i?i:this):i=n.apply(t,e.concat(o.call(arguments))),i},n.prototype&&(i.prototype=n.prototype,r.prototype=new i,i.prototype=null),r}),n="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff",String.prototype.trim&&!n.trim()||(n="["+n+"]",e=new RegExp("^"+n+n+"*"),r=new RegExp(n+n+"*$"),String.prototype.trim=function(){if(null==this)throw new TypeError("can't convert "+this+" to object");return String(this).replace(e,"").replace(r,"")}),i=String.prototype.split,2!=="ab".split(/(?:ab)*/).length||4!==".".split(/(.?)(.?)/).length||"t"==="tesst".split(/(s)*/)[1]||0==="".split(/.?/).length||".".split(/()()/).length>1?(o=void 0===/()??/.exec("")[1],String.prototype.split=function(t,e){var r,n,c,a,l,p,u,f=this;function s(){var t;for(t=1;t<arguments.length-2;t++)void 0===arguments[t]&&(l[t]=void 0)}if(void 0===t&&0===e)r=[];else if("[object RegExp]"!==x(t))r=i.apply(f,[t,e]);else{for(r=[],n=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.extended?"x":"")+(t.sticky?"y":""),c=0,t=new RegExp(t.source,n+"g"),f=String(f),o||(a=new RegExp("^"+t.source+"$(?!\\s)",n)),e=void 0===e?-1>>>0:e>>>0;(l=t.exec(f))&&!((p=l.index+l[0].length)>c&&(r.push(f.slice(c,l.index)),!o&&l.length>1&&l[0].replace(a,s),l.length>1&&l.index<f.length&&Array.prototype.push.apply(r,l.slice(1)),u=l[0].length,c=p,r.length>=e));)t.lastIndex===l.index&&t.lastIndex++;c===f.length?!u&&t.test("")||r.push(""):r.push(f.slice(c)),r=r.length>e?r.slice(0,e):r}return r}):"0".split(void 0,0).length&&(String.prototype.split=function(t,e){return void 0===t&&0===e?[]:i.apply(this,[t,e])}),function(){if("".substr&&"b"!=="0b".substr(-1)){var t=String.prototype.substr;String.prototype.substr=function(e,r){return t.call(this,e<0&&(e=this.length+e)<0?0:e,r)}}}(),String.prototype.repeat||(String.prototype.repeat=(c=function(t,e){var r;return e<1?r="":e%2?r=c(t,e-1)+t:(r=c(t,e/2),r+=r),r},function(t){var e=String(P(this));if((t=E(t))<0||t===1/0)throw new RangeError("Invalid String#repeat value");return c(e,t)})),String.prototype.startsWith||(String.prototype.startsWith=function(t){var e,r,n=String(P(this));if("[object RegExp]"===x(t))throw new TypeError('Cannot call method "startsWith" with a regex');return t=String(t),e=arguments.length>1?arguments[1]:void 0,r=Math.max(E(e),0),n.slice(r,r+t.length)===t}),String.prototype.endsWith||(String.prototype.endsWith=function(t){var e,r,n,o,i=String(P(this));if("[object RegExp]"===x(t))throw new TypeError('Cannot call method "endsWith" with a regex');return t=String(t),e=i.length,n=void 0===(r=arguments.length>1?arguments[1]:void 0)?e:E(r),o=Math.min(Math.max(n,0),e),i.slice(o-t.length,o)===t}),String.prototype.codePointAt||(String.prototype.codePointAt=function(t){var e,r,n=String(P(this)),o=n.length,i=E(t);if(!(i<0||i>=o))return(e=n.charCodeAt(i))<55296||e>56319||i+1===o?e:(r=n.charCodeAt(i+1))<56320||r>57343?e:1024*(e-55296)+(r-56320)+65536}),String.prototype.includes||(String.prototype.includes=function(t,e){return"number"!=typeof e&&(e=0),!(e+t.length>this.length)&&-1!==this.indexOf(t,e)}),Array.isArray||(Array.isArray=function(t){return"[object Array]"===x(t)}),2!==[1,2].splice(0).length&&(a=s.splice,l=s.slice,s.splice=function(t,e){var r=[],n=l.call(arguments);return n.length&&(n[0]=void 0===t?0:t,n[1]=void 0===e?this.length-t:e,r=a.apply(this,n)),r}),1!==[].unshift(0)&&(p=s.unshift,s.unshift=function(){return p.apply(this,arguments),this.length}),s.indexOf&&-1===[0,1].indexOf(1,2)||(s.indexOf=function(t,e){var r=0,n=m(this),o=n.length>>>0;if(!o)return-1;for(arguments.length>1&&(r=E(e)),r=r>=0?r:Math.max(0,o+r);r<o;r++)if(T(n,r)&&n[r]===t)return r;return-1}),s.lastIndexOf&&-1===[0,1].lastIndexOf(0,-3)||(s.lastIndexOf=function(t,e){var r=m(this),n=r.length>>>0,o=n-1;if(!n)return-1;for(arguments.length>1&&(o=Math.min(o,E(e))),o=o>=0?o:n-Math.abs(o);o>=0;o--)if(T(r,o)&&t===r[o])return o;return-1}),s.every||(s.every=function(t,e){var r,n=m(this),o=n.length>>>0;if("function"!=typeof t)throw new TypeError(t+" is not a function");for(r=0;r<o;r++)if(T(n,r)&&!t.call(e,n[r],r,n))return!1;return!0}),s.some||(s.some=function(t,e){var r,n=m(this),o=n.length>>>0;if("function"!=typeof t)throw new TypeError(t+" is not a function");for(r=0;r<o;r++)if(T(n,r)&&t.call(e,n[r],r,n))return!0;return!1}),s.forEach||(s.forEach=function(t,e){var r=0,n=m(this),o=n.length>>>0;if("function"!=typeof t)throw new TypeError(t+" is not a function");for(;r<o;)T(n,r)&&t.call(e,n[r],r,this),r++}),s.map||(s.map=function(t,e){var r,n=m(this),o=n.length>>>0,i=Array(o);if("function"!=typeof t)throw new TypeError(t+" is not a function");for(r=0;r<o;r++)T(n,r)&&(i[r]=t.call(e,n[r],r,n));return i}),s.filter||(s.filter=function(t,e){var r,n,o=m(this),i=o.length>>>0,c=[];if("function"!=typeof t)throw new TypeError(t+" is not a function");for(r=0;r<i;r++)T(o,r)&&(n=o[r],t.call(e,n,r,o)&&c.push(n));return c}),s.reduce||(s.reduce=function(t){var e,r=0,n=m(this),o=n.length>>>0;if("function"!=typeof t)throw new TypeError(t+" is not a function");if(!o&&1===arguments.length)throw new TypeError("reduce of empty array with no initial value");if(arguments.length>=2)e=arguments[1];else for(;;){if(T(n,r)){e=n[r++];break}if(++r>=o)throw new TypeError("reduce of empty array with no initial value")}for(;r<o;r++)T(n,r)&&(e=t(e,n[r],r,n));return e}),s.reduceRight||(s.reduceRight=function(t){var e,r=m(this),n=r.length>>>0,o=n-1;if("function"!=typeof t)throw new TypeError(t+" is not a function");if(!n&&1===arguments.length)throw new TypeError("reduceRight of empty array with no initial value");if(arguments.length>=2)e=arguments[1];else for(;;){if(T(r,o)){e=r[o--];break}if(--o<0)throw new TypeError("reduceRight of empty array with no initial value")}do{T(r,o)&&(e=t(e,r[o],o,r))}while(o--);return e}),s.includes||(s.includes=function(t,e){if(null===this)throw new TypeError('"this" is null or not defined');var r=Object(this),n=r.length>>>0;if(0===n)return!1;for(var o=0|e,i=Math.max(o>=0?o:n-Math.abs(o),0);i<n;){if(r[i]===t)return!0;i++}return!1});var g,b,d,w,O,j=u.bind(f.hasOwnProperty),v=function(t){var e=typeof t;return("object"===e||"function"===e)&&null!==t};if((O=j(f,"__defineGetter__"))&&(g=u.bind(f.__defineGetter__),b=u.bind(f.__defineSetter__),d=u.bind(f.__lookupGetter__),w=u.bind(f.__lookupSetter__)),Object.assign||(Object.assign=function(t){var e,r=m(t);if(1===arguments.length)return r;for(e=1;e<arguments.length;e++){var n=arguments[e];if(null!=n){var o,i=m(n),c=Object.getOwnPropertyNames(i);for(o=0;o<c.length;o++)r[c[o]]=i[c[o]]}}return r}),Object.is||(Object.is=function(t,e){return t===e?0!==t||1/t==1/e:t!=t&&e!=e}),Object.setPrototypeOf||(Object.setPrototypeOf=function(){var t;function e(e,r){return function(t,e){if("function"!=typeof t&&"object"!=typeof t||null===t)throw new TypeError("can not set prototype on a non-object");if("function"!=typeof e&&"object"!=typeof e&&null!==e)throw new TypeError("can only set prototype to an object or null")}(e,r),t.call(e,r),e}try{(t=Object.getOwnPropertyDescriptor(f,"__proto__").set).call({},null)}catch(r){if(f!=={}.__proto__)return;t=function(t){this.__proto__=t},e.polyfill=e(e({},null),f)instanceof Object}return e}()),Object.getPrototypeOf||(Object.getPrototypeOf=function(t){return t.__proto__||(t.constructor?t.constructor.prototype:f)}),Object.getOwnPropertyDescriptor||(Object.getOwnPropertyDescriptor=function(t,e){var r,n,o,i;if(!v(t))throw new TypeError("Object.getOwnPropertyDescriptor called on a non-object:"+t);if(j(t,e))return n={enumerable:!0,configurable:!0},O&&(r=t.__proto__,t.__proto__=f,o=d(t,e),i=w(t,e),t.__proto__=r,o||i)?(o&&(n.get=o),i&&(n.set=i),n):(n.value=t[e],n)}),Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(t){if(!v(t))throw new TypeError("Object.getOwnPropertyNames called on a non-object:"+t);return Object.keys(t)}),Object.create||(Object.create=function(t,e){var r,n=function(){};return null===t?r={__proto__:null}:(n.prototype=t,(r=new n).__proto__=t),void 0!==e&&Object.defineProperties(r,e),r}),function(){function e(t){try{return Object.defineProperty(t,"sentinel",{}),t.hasOwnProperty("sentinel")}catch(t){}}var r=Object.defineProperty,n=r&&e({}),o=r&&void 0===t.document||e(t.document.createElement("div")),i=r&&!n||!o&&Object.defineProperty;r&&!i||(Object.defineProperty=function(t,e,r){var n;if(!v(t))throw new TypeError("Object.defineProperty called on non-object: "+t);if(!v(r))throw new TypeError("Property description must be an object: "+r);if(i)try{return i.call(Object,t,e,r)}catch(t){}if(j(r,"value"))O&&(d(t,e)||w(t,e))?(n=t.__proto__,t.__proto__=f,delete t[e],t[e]=r.value,t.__proto__=n):t[e]=r.value;else{if(!O)throw new TypeError("getters & setters can not be defined on this javascript engine");j(r,"get")&&g(t,e,r.get),j(r,"set")&&b(t,e,r.set)}return t})}(),Object.defineProperties||(Object.defineProperties=function(t,e){if(!v(t))throw new TypeError("Object.defineProperties called on a non-object");var r;for(r in e)j(e,r)&&Object.defineProperty(t,r,e[r]);return t}),Object.seal||(Object.seal=function(t){if(!v(t))throw new TypeError("Object.seal called on a non-object");return t}),Object.freeze||(Object.freeze=function(t){if(!v(t))throw new TypeError("Object.freeze called on a non-object");return t}),Object.preventExtensions||(Object.preventExtensions=function(t){if(!v(t))throw new TypeError("Object.preventExtensions called on a non-object");return t}),Object.isSealed||(Object.isSealed=function(t){if(!v(t))throw new TypeError("Object.isSealed called on a non-object");return!1}),Object.isFrozen||(Object.isFrozen=function(t){if(!v(t))throw new TypeError("Object.isFrozen called on a non-object");return!1}),Object.isExtensible)try{Object.isExtensible(42)}catch(t){var _=Object.isExtensible;Object.isExtensible=function(t){try{return _(t)}catch(t){return!1}}}else Object.isExtensible=function(t){var e,r;if(!v(t))return!1;for(r="";j(t,r);)r+="?";return t[r]=!0,e=j(t,r),delete t[r],e};Object.keys||(Object.keys=function(t){if(!v(t))throw new TypeError("Object.keys called on a non-object");var e,r,n,o,i=[],c=!j({toString:null},"toString"),a=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],l=a.length;for(n in t)j(t,n)&&i.push(n);if(c)for(e=0,r=l;e<r;e++)j(t,o=a[e])&&i.push(o);return i}),Date.now||(Date.now=function(){return(new Date).getTime()}),Date=function(t){var e,r=[0,31,59,90,120,151,181,212,243,273,304,334,365],n=new RegExp("^(\\d{4}|[-+]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$");function o(t,e){var n=e>1?1:0;return r[e]+Math.floor((t-1969+n)/4)-Math.floor((t-1901+n)/100)+Math.floor((t-1601+n)/400)+365*(t-1970)}function i(e,r,n,o,c,a,l){var p,u=arguments.length;return this instanceof t?((p=1===u&&String(e)===e?new t(i.parse(e)):u>=7?new t(e,r,n,o,c,a,l):u>=6?new t(e,r,n,o,c,a):u>=5?new t(e,r,n,o,c):u>=4?new t(e,r,n,o):u>=3?new t(e,r,n):u>=2?new t(e,r):u>=1?new t(e):new t).constructor=i,p):t.apply(this,arguments)}for(e in t)i[e]=t[e];return i.now=t.now,i.UTC=t.UTC,i.prototype=t.prototype,i.prototype.constructor=i,i.parse=function(e){var r,i,c,a,l,p,u,f,s,h,y,g,b=n.exec(e);return b?(r=Number(b[1]),i=Number(b[2]||1)-1,c=Number(b[3]||1)-1,a=Number(b[4]||0),l=Number(b[5]||0),p=Number(b[6]||0),u=Math.floor(1e3*Number(b[7]||0)),f=!b[4]||b[8]?0:Number(new t(1970,0)),s="-"===b[9]?1:-1,h=Number(b[10]||0),y=Number(b[11]||0),a<(l>0||p>0||u>0?24:25)&&l<60&&p<60&&u<1e3&&i>-1&&i<12&&h<24&&y<60&&c>-1&&c<o(r,i+1)-o(r,i)&&-864e13<=(g=1e3*(60*((g=60*(24*(o(r,i)+c)+a+h*s))+l+y*s)+p)+u+f)&&g<=864e13?g:NaN):t.parse.apply(this,arguments)},i}(Date);try{-1===new Date(-621987552e5).toISOString().indexOf("-000001")&&delete Date.prototype.toISOString}catch(t){}Date.prototype.toISOString||(Date.prototype.toISOString=function(){var t,e,r,n;if(!isFinite(this))throw new RangeError("Date.prototype.toISOString called on non-finite value.");for(t=[this.getUTCMonth()+1,this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds()],n=((n=this.getUTCFullYear())<0?"-":n>9999?"+":"")+("00000"+Math.abs(n)).slice(0<=n&&n<=9999?-4:-6),e=t.length;e--;)(r=t[e])<10&&(t[e]="0"+r);return n+"-"+t.slice(0,2).join("-")+"T"+t.slice(2).join(":")+"."+("000"+this.getUTCMilliseconds()).slice(-3)+"Z"});var S=!0;try{new Date(NaN).toJSON()}catch(t){S=!1}Date.prototype.toJSON&&S||(Date.prototype.toJSON=function(){if("function"!=typeof this.toISOString)throw new TypeError("toISOString property is not callable");try{return this.toISOString()}catch(t){return null}})}function E(t){var e=Number(t);return isNaN(e)?e=0:(0!==e||isFinite(e))&&(e=(e<0?-1:1)*Math.floor(Math.abs(e))),e}function m(t){if(null==t)throw new TypeError(t+" is not a object");return t&&y&&t instanceof String?t.split(""):Object(t)}function T(t,e){return e in t}function x(t){return Object.prototype.toString.call(t)}function P(t,e){if(null==t)throw new TypeError(e||"Cannot call method on "+t);return t}});