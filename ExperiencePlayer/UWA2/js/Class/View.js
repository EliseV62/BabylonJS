define("UWA/Class/View",["UWA/Core","UWA/Element","UWA/Class","UWA/Class/Listener","UWA/Controls/Abstract"],function(t,e,n,i,s){"use strict";var r,o,a;function c(e,n){var i;return e&&(i=e[n],t.is(i,"function")&&(i=i.call(e))),i}return a=["model","collection","container","id","attributes","className","tagName","domEvents"],o=0,r=s.extend(i,{tagName:"div",init:function(e){var n,i,s,r=Array.prototype.slice.call(arguments);for(this.cid="c"+ ++o,e=t.clone(e||{},!1),i=a.length-1;i>=0;i--)s=a[i],e.hasOwnProperty(s)&&(this[s]=e[s],delete e[s]);this._parent(e),this.container?this._ensureContainer(c(this,"container")):(n=t.extend({},c(this,"attributes")),this.id&&(n.id=c(this,"id")),this.className&&(n.class=c(this,"className")),this.container=t.createElement(c(this,"tagName"),n)),this.setup.apply(this,r),this.delegateDOMEvents()},setup:function(){},destroy:function(){this.undelegateDOMEvents(),this._parent()},render:function(){return this},setContainer:function(t){return this.undelegateDOMEvents(),this._ensureContainer(t),this.delegateDOMEvents(),this},_ensureContainer:function(n){var i;if(n instanceof e)this.container=n;else if("element"===(i=t.typeOf(n)))this.container=t.extendElement(n);else{if("object"!==i)throw new Error("Invalid type of container");this.container=t.createElement(n.tag,n)}},getElement:function(t){return this.container.getElement(t)},getElements:function(t){return this.container.getElements(t)},delegateDOMEvents:function(e){var n,i;if(t.is(e)||(e=c(this,"domEvents")),!e)return this;for(n in this.undelegateDOMEvents(),e){if("function"!=typeof(i=e[n])){if("string"!=typeof i)throw new Error("Invalid type of value in hash of domEvents!");i=this[i]}if(!i)throw new Error("Method '"+e[n]+"' does not exist");i=i.bind(this),this.container.addEvent(n,i)}return this},undelegateDOMEvents:function(){if(!this.container)throw new Error("unexpected error");return this.container.removeEvent(),this}}),t.namespace("View",r,n)});