define("UWA/Controls/TabView",["UWA/Core","UWA/Utils/Client","UWA/Event","UWA/Element","UWA/Controls/Abstract","UWA/Controls/Carousel"],function(e,t,s,n,i,o){"use strict";var l=i.extend({defaultOptions:{element:null,selectedTab:null,className:"",classNames:{tabView:"uwa-tabview",tabList:"uwa-tablist",tabPanels:"uwa-tabview-panel",tabPanel:"uwa-tab-panel",tab:"uwa-tab",selected:"selected",disabled:"disabled"},scroller:{scrollSize:1,nextButton:null,previousButton:null},tabScroller:!1,tabSelector:".uwa-tab",allowReload:!1,noContent:!1},tabs:null,selectedTab:null,init:function(t){this._parent(t),this.tabs=[],this.selectedTab=null,this.buildContainer(),this.initEvents(),e.is(this.options.tabs,"array")&&(this.options.tabs.forEach(this.addTab,this),delete this.options.tabs),(this.options.tabScroller||this.options.scroller.nextButton||this.options.scroller.previousButton)&&this.createScroller()},addTab:function(t,s){return t instanceof l.Tab==!1&&(t=new l.Tab(t)),t.setOption("classNames",this.options.classNames),e.is(s,"number")&&s<this.tabs.length&&s>=0?(t.tabElement().inject(this.getTab(s).tabElement(),"before"),this.tabs.splice(s,0,t)):(this.elements.tabList.grab(t.tabElement()),this.tabs.push(t)),this.elements.contentNode&&t.contentElement()&&this.elements.contentNode.grab(t.contentElement()),t.options.selected&&this.selectTab(t),this.onResize(),this.dispatchEvent("onAddTab",[t]),this},removeTab:function(e){var t=this.getTab(e);return t&&(t.remove(),this.tabs.splice(this.tabs.indexOf(t),1),this.onResize(),this.dispatchEvent("onRemoveTab",[t])),this},selectTab:function(e,t){var s,n,i=this.getTab(e);i&&((i!==this.selectedTab||this.options.allowReload)&&((s=this.selectedTab)?s.setSelected(!1):n=0,this.dispatchEvent("onPreSelectTab",[i,s,t]),this.selectedTab=i.setSelected(!0),this.onResize(),this.dispatchEvent("onSelectTab",[i,s,t])),this.ensureTabIsVisible(i,!1,n))},enableTab:function(e,t){var s=this.getTab(e);s&&s.setDisabled(void 0!==t&&!t)},getTab:function(t){var s,n,i=!1;if(e.is(t))if(t instanceof l.Tab)i=t;else for(s=0,n=this.tabs.length;s<n&&(i=this.tabs[s],!t||!t.nodeType||i.tabElement()!==t)&&(s!==t&&i.getId()!==t&&i.getName()!==t);s+=1)i=!1;else i=this.selectedTab;return i},moveTab:function(e,t){var s,n,i=t+1>=this.tabs.length;return s=this.getTab(e),(n=this.tabs.indexOf(s))!==t&&(this.tabs.splice(t,0,this.tabs.splice(n,1)[0]),i?s.tabElement().inject(this.getTab(t-1).tabElement(),"after"):s.tabElement().inject(this.getTab(t+1).tabElement(),"before"),!0)},selectDefaultTab:function(){var e,t,s;for(t=0,s=this.tabs.length;t<s;t+=1)if((e=this.tabs[t]).isSelectable())return this.selectTab(e),e;return!1},setTabContent:function(e,t){return this.getTab(e).setContent(t),this},getTabContent:function(e){return this.getTab(e).contentElement()},buildContainer:function(){this.options.element?(this.elements.container=e.extendElement(this.options.element),delete this.options.element):this.elements.container=e.createElement("div"),this.elements.container.addClassName(this.options.classNames.tabView+" "+this.options.className),this.elements.tabList=e.createElement("ul",{class:this.options.classNames.tabList}).inject(this.elements.container),this.options.noContent||(this.elements.contentNode=e.createElement("div",{class:this.options.classNames.tabPanels}).inject(this.elements.container))},initEvents:function(){this.elements.container.addEvent("click",this.handleEvent.bind(this))},handleEvent:function(t){var n=this.getTabFromEvent(t);n&&(s.preventDefault(t),e.is(n.handleEvent,"function")&&n.handleEvent(t,this),n.isDisabled()||this.selectTab(n,t))},getTabFromEvent:function(e){var t=s.getElement(e).getClosest(this.options.tabSelector);return t&&this.getTab(t)},createScroller:function(){this.elements.container.setAttribute("scrollable","true"),this.scroller=this.getScroller(),this.scroller.addEvent("onScrollerResize",this.onScrollerResize.bind(this))},getScroller:function(){return this.scroller||(this.scroller=new o(this.elements.tabList,this.options.scroller)),this.scroller},onScrollerResize:function(e){var t=this.overflow;this.overflow=this.scroller.hasOverflow(),this.overflow&&this.selectedTab&&e&&Math.abs(e.deltaScroll)>100&&this.ensureTabIsVisible(this.selectedTab,!1,0),t!==this.overflow&&(this.elements.container.setAttribute("overflow",String(this.overflow)),this.dispatchEvent("onOverflowChange",[{overflow:this.overflow}]))},reload:function(){var e=this.selectedTab;this.selectedTab=null,this.selectTab(e)},showTabList:function(){this.elements.tabList.show()},hideTabList:function(){this.elements.tabList.hide()},isTabVisible:function(e,t){var s=!1,n=this.getTab(e);return n&&(s=this.scroller&&this.scroller.isItemVisible(n.tabElement(),t)),s},ensureTabIsVisible:function(e,t,s){this.scroller&&(this.isTabVisible(e,t)||this.scrollToTab(e,s))},scrollNext:function(){this.scroller&&this.scroller.scrollNext()},scrollPrevious:function(){this.scroller&&this.scroller.scrollPrevious()},scrollToTab:function(e,t){var s=this.getTab(e).tabElement();s&&this.scroller.scrollToItem(s,void 0,t)},selectTabItem:function(e,t,s,n){var i=this.getTab(e);return i instanceof l.DropdownTab&&i.items.forEach(function(e){e[t]===s&&i.selectItem(e,this,!1!==n)},this),this},onResize:function(){this.scroller&&this.scroller.onRefresh()},onPreInject:function(){null===this.options.selectedTab&&this.selectDefaultTab()},onPostInject:function(){null!==this.options.selectedTab&&this.selectTab(this.options.selectedTab)}});return l.Tab=i.extend({defaultOptions:{id:"",disabled:!1,selected:!1,text:"",icon:"",name:"",content:null,className:""},init:function(e){!e||e.id||0===e.id||e.name||(e.id=Date.now().toString(36)),this._parent(e)},getId:function(){return this.options.id},getName:function(){return this.options.name},getText:function(){return this.options.text},setIcon:function(t){return t?this.elements.icon?this.options.icon!==t&&(this.options.icon=t,this.elements.icon.src=t):this.elements.icon=e.createElement("img",{class:"icon",src:t}).inject(this.tabElement().getElement(".title"),"before"):this.elements.icon&&this.elements.icon.remove(),this},setText:function(e){return this.tabElement().getElement(".title").setText(e),this},setDisabled:function(e){return void 0===e&&(e=!0),this.tabElement().toggleClassName("disabled",e),this.elements.content&&this.elements.content.toggleClassName("disabled",e),this.options.disabled=e,this},setSelected:function(e){return this.tabElement().toggleClassName("selected",e),this.elements.content&&this.elements.content.toggleClassName("selected",e).toggleClassName("hidden",!e),this.options.selected=e,this},setContent:function(e){return this.contentElement().setHTML(e),this},isSelectable:function(){return!this.isDisabled()},isSelected:function(){return this.options.selected},isDisabled:function(){return this.options.disabled},remove:function(){this.tabElement().remove(),this.elements.content&&this.elements.content.remove()},tabElement:function(){return this.elements.container||(this.elements.container=this._createTabElement(),this.options.name&&this.elements.container.addClassName(this.options.name),this.options.className&&this.elements.container.addClassName(this.options.className),this.options.icon&&this.setIcon(this.options.icon)),this.elements.container},contentElement:function(){return this.elements.content||(this.elements.content=this._createContentElement(),this.elements.content&&this.elements.content.addClassName("hidden "+this.options.name)),this.elements.content},_createTabElement:function(){var t=e.createElement("li",{class:this.options.classNames.tab});return t.grab(this._createInnerTabElement(t))},_createInnerTabElement:function(){return e.createElement("a",{href:this.options.id?"#"+this.options.id:""}).grab(e.createElement("span",{class:"title",text:this.options.text}))},_createContentElement:function(){var t=e.createElement("div",{id:this.options.id,html:this.options.content||e.i18n("Loading..."),class:this.options.classNames.tabPanel});return delete this.options.content,t}}),l.DropdownTab=l.Tab.extend({defaultOptions:{autohide:!0,popupMenuItemSelector:".uwa-popup-menu-item",classNames:{dropdownTab:"uwa-tab-dropdown",popupMenu:"uwa-popup-menu",popupMenuItem:"uwa-popup-menu-item"}},init:function(t,s){this.items=s,this.selectedItem=s[0],this._parent(e.merge({name:String(t)},this.selectedItem))},setSelected:function(e){return this._parent(e),this.options.autohide&&this.elements.container.getElement(".dropdown").toggleClassName("hidden",!e),this},handleEvent:function(e,t){this.isSelected()&&(s.stop(e),this.tabView=t,this.togglePopupMenu())},togglePopupMenu:function(){var e=this.elements.container.hasClassName("open");return e?this.hidePopupMenu():this.showPopupMenu(),!e},showPopupMenu:function(){this.createPopupMenu(),this.elements.container.addClassName("open")},hidePopupMenu:function(t){if(t&&e.Event.getElement(t).getClosest("."+this.options.classPopupMenu))return;this.elements.container.removeClassName("open"),this.elements.popupMenu&&(this.elements.popupMenu.destroy(),delete this.elements.popupMenu),this.boundHidePopupMenu&&(n.removeEvent.apply(document.body,["click",this.boundHidePopupMenu]),delete this.boundHidePopupMenu),this.tabView&&(this.tabView=null,delete this.tabView)},createPopupMenu:function(){var t,s,i,o;for(this.elements.popupMenu&&this.elements.popupMenu.remove(),this.elements.popupMenu=e.createElement("ul",{class:this.options.classNames.popupMenu,events:{click:this.onPopupMenuItemClick.bind(this)}}),t=0,s=this.items.length;t<s;t++)this.selectedItem!==this.items[t]&&this._createPopupMenuItem(this.items[t]).inject(this.elements.popupMenu).setAttribute("data-index",t);return this.elements.popupMenu.inject(this.elements.container.getParent("."+this.options.classNames.tabView)).setPosition({x:0,y:this.elements.container.getDimensions().height},{relative:this.elements.container,boundary:"auto",fit:"resize-max"}),i=this.elements.popupMenu.getDimensions(),o=this.elements.container.getDimensions(),i.width<o.width&&this.elements.popupMenu.setStyle("width",o.width+"px"),this.boundHidePopupMenu||(this.boundHidePopupMenu=this.hidePopupMenu.bind(this),n.addEvent.apply(document.body,["click",this.boundHidePopupMenu])),this.elements.popupMenu},selectItem:function(t,s,n){if(e.is(t,"object")){if(e.is(t.handler,"function"))t.handler.call(this);else if(t!==this.selectedItem){var i=s||this.tabView;this.tabElement().getElement(".title").setText(t.text||""),t.icon&&this.setIcon(t.icon),this.previousItem=this.selectedItem,this.selectedItem=t,i&&!1!==n&&(i.selectedTab=null,i.selectTab(this))}this.hidePopupMenu()}},onPopupMenuItemClick:function(t){s.stop(t);var n,i,o=e.Event.getElement(t).getClosest(this.options.popupMenuItemSelector);o&&(n=Number(o.getAttribute("data-index")),(i=this.items[n])&&this.selectItem(i))},_createPopupMenuItem:function(t){var s=e.createElement("li",{class:this.options.classNames.popupMenuItem}),n=e.createElement("a").inject(s);return t.icon&&n.grab(e.createElement("img",{src:t.icon,class:"icon"})),n.grab(e.createElement("span",{text:t.text})),s},_createTabElement:function(){return this._parent().addClassName(this.options.classNames.dropdownTab)},_createInnerTabElement:function(){return e.createElement("a",{href:this.options.id?"#"+this.options.id:""}).grab(e.createElement("span",{class:"title",text:this.options.text})).grab(e.createElement("span",{class:"dropdown hidden"}))}}),e.namespace("Controls/TabView",l,e)});