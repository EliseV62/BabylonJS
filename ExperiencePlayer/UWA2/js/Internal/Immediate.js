define("UWA/Internal/Immediate",function(){"use strict";var e,t,a,i=new Function("return this")();return i.setImmediate&&i.clearImmediate?e={set:i.setImmediate.bind(i),clear:i.clearImmediate.bind(i)}:i.addEventListener&&i.postMessage?(t={},a=0,i.addEventListener("message",function(e){var a;try{a="string"==typeof e.data&&"{"===e.data[0]&&JSON.parse(e.data)}catch(e){}a&&"uwa-setImmediate"===a.type&&e.source===i&&(e.stopPropagation(),t[a.id]&&(t[a.id](),delete t[a.id]))},!0),e={set:function(e){var n=a++;return t[n]=e,i.postMessage(JSON.stringify({type:"uwa-setImmediate",id:n}),"*"),n},clear:function(e){delete t[e]}}):e={set:function(e){return i.setTimeout(e,0)},clear:i.clearTimeout},e});