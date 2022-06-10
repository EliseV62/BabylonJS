define("UWA/Controls/Segmented",["UWA/Core","UWA/Event","UWA/Controls/Abstract"],function(t,e,s){"use strict";var i=s.extend({name:"uwa-segmented",defaultOptions:{title:null,multiSelect:!1,atLeastOneSelected:!1,constantItemWidth:!1,className:"",data:null},itemLength:0,init:function(t){this._parent(t),this.options.data=this.options.data||{},this.elements.items={},this.selectedItemsName={},this.buildSkeleton(),this.options.data&&this.addItems(this.options.data)},buildSkeleton:function(){var e=this.elements,s=this.options;e.container=t.createElement("ul",{class:this.getClassNames()}),s.title&&t.createElement("li",{class:this.getClassNames("-title"),html:{tag:"span",text:s.title}}).inject(e.container),e.itemContainer=e.container},updateItemClassNames:function(){var t,e,s=this.elements.items,i=0;for(t in s)s.hasOwnProperty(t)&&((e=s[t]).removeClassName(this.getClassNames("-item-first")),e.removeClassName(this.getClassNames("-item-last")),e.addClassName(this.getClassNames("-item")+" "+t),0===i&&e.addClassName(this.getClassNames("-item-first")),i===this.itemLength-1&&e.addClassName(this.getClassNames("-item-last")),i++)},createItem:function(s,i){var n,a=this.elements.items,l=i.text||"",m=this;return(n=t.createElement("li",{html:{tag:"a",class:s+"-title "+this.getClassNames("-item-title"),html:{tag:"span",text:l},title:t.i18n("Expand"),events:{click:function(t){e.stop(t),m.dispatchEvent("onClick",[s])}}}})).getElement("a")&&i.tooltipText&&(n.getElement("a").title=i.tooltipText),i.title&&(this.options.data[s].text=i.title,n.getElement("span").setHTML(i.title)),a[s]=n,i.pinned&&(n.addClassName("uwa-pinned"),this.selectItem(s,!1)),n},onResize:function(){var t,e,s=this.elements.items,i=0;if(this.options.constantItemWidth){for(t in s)s.hasOwnProperty(t)&&(i=(e=s[t].getDimensions().width)>i?e:i);for(t in s)s.hasOwnProperty(t)&&0!==i&&s[t].setStyle("width",i+"px")}},onClick:function(t){this.options.multiSelect?this.toggleItem(t):this.selectItem(t)},addItems:function(t){var e;for(e in t)t.hasOwnProperty(e)&&this.addItem(e,t[e])},addItem:function(t,e){var s,i,n;if(e=e||{},this.options.data[t]=e,e.where||(e.where="bottom"),s=(i=e.where.split(" "))[0],1!==i.length||"top"!==s&&"bottom"!==s){if(2!==i.length||"before"!==s&&"after"!==s)throw new Error('Has to be "top", "bottom", "before item" of "after item"');n=this.elements.items[i[1]]}else n=this.elements.itemContainer;this.createItem(t,e).inject(n,s),this.itemLength++,this.updateItemClassNames()},setItemTitle:function(t,e){var s=this.elements.items[t];s&&(this.options.data[t].text=e,s.getElement("span").setHTML(e))},setItemState:function(e,s,i){var n=this.options.data[e],a=this.elements.items[e];i=!t.is(i)||i,!s&&this.options.atLeastOneSelected&&1===this.getSelectedItems().length||(a||this.selectedItemsName[e]!==s)&&(this.options.multiSelect||this.unselectItems(),a.toggleClassName("selected",s),!a.getElement("a")||n&&n.tooltipText||(a.getElement("a").title=s?t.i18n("Collapse"):t.i18n("Expand")),this.selectedItemsName[e]=s,i&&this.dispatchEvent("onChange",[e,s,n]))},toggleItem:function(t,e){this.setItemState(t,!this.isSelected(t),e)},unselectItem:function(t,e){this.setItemState(t,!1,e)},selectItem:function(t,e){this.setItemState(t,!0,e)},getSelectedItems:function(){var t,e=this.selectedItemsName,s=[];for(t in e)e.hasOwnProperty(t)&&!0===e[t]&&s.push(t);return s},isSelected:function(t){return this.selectedItemsName[t]},unselectItems:function(t,e){var s,i=this.selectedItemsName,n=this.elements.items;for(s in t=void 0===t||t,n)n.hasOwnProperty(s)&&i[s]&&!n[s].hasClassName("uwa-pinned")&&e!==s&&(n[s].removeClassName("selected"),i[s]=!1,t&&this.dispatchEvent("onChange",[s,!1,this.options.data[s]]))},enable:function(){this.enabled=!0,this.getContent().removeClassName("disabled")},disable:function(){this.enabled=!1,this.getContent().addClassName("disabled")},isEnabled:function(){return this.enabled}});return t.namespace("Controls/Segmented",i,t)});