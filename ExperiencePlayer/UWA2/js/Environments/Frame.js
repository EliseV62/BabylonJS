define("UWA/Environments/Frame",["UWA/Core","UWA/Utils","UWA/Utils/Client","UWA/Utils/InterCom","UWA/Element","UWA/Event","UWA/Environment","UWA/Controls/Scroller","UWA/Storage/Adapter/Object"],function(e,t,i,n,o,s,r,a){"use strict";var h=r.extend({name:"frame",init:function(e){this._remoteQueue=[],this._parent(e)},getOption:function(e){var t=document.querySelector("body");return t.hasAttribute(e)&&t.getAttribute(e)},onInit:function(){var e=document.querySelector("body"),t=o.getElement.bind(e);t(".moduleFrame")||this.buildSkeleton(e),this.html={wrapper:t(".module"),header:t(".moduleHeader"),content:t(".moduleWrapper"),body:t(".moduleContent"),edit:t(".moduleEdit"),menus:t(".moduleHeader > menu"),footer:t(".moduleFooter"),counter:t(".counter"),title:t(".title"),icon:t(".icon"),shareAction:t(".share"),refreshAction:t(".refresh"),editAction:t(".edit")},!this.scroller&&Number(this.getOption("displayScroller"))&&(this.scroller=new a(this.html.content,{snap:!1,bounce:!0,momentum:!0,lockDirection:!0})),this.onResize()},buildSkeleton:function(t){var i=e.hosts,n=e.i18n,s=i.uwa+e.paths.img+"icon.png",r=["module moduleUwa"],a=this.getOption("chromeColor"),h=Number(this.getOption("displayHeader")),d=Number(this.getOption("displayFooter")),u=Number(this.getOption("displayEdit")),l=[];a&&r.push(a+"-module"),h&&l.push({tag:"div",class:"moduleHeader",html:[{tag:"span",class:"icon",html:{tag:"img",height:16,width:16,src:s}},{tag:"span",class:"counter"},{tag:"span",class:"title",text:n(document.title)||n("Loading...")},{tag:"menu",type:"toolbar",class:"menus"}]}),l.push({tag:"div",class:"moduleWrapper",html:[u&&{tag:"div",class:"moduleEdit"},{tag:"div",class:"moduleContent",html:n("Loading...")}]}),d&&l.push({tag:"div",class:"moduleFooter",html:[{tag:"a",class:"powered",href:i.netvibes,text:n("© Netvibes")},{tag:"a",class:"share",href:i.ecosystem,text:n("Subscribe to this app")}]}),o.setContent.call(t,{tag:"div",class:r.join(" "),html:l})},onResize:function(){var e=this.html,t=e.wrapper.getScrolls(),n=this.scroller?i.getSize():t,o=n.width,s=n.height;if(s>0&&s!==this.prevHeight&&(this.sendRemote("onResizeHeight",s),this.scroller&&(["header","footer"].forEach(function(t){s-=e[t]?e[t].offsetHeight:0}),this.scroller.setOptions({height:s}),this.scroller.onRefresh()),this.prevHeight=s),this.prevWidth===o)return!1;i.Engine.safari&&this.html.wrapper.setStyle("width",o+"px"),this.prevWidth=o},onRegisterWidget:function(){this._parent(),this.sendRemote("onRegisterWidget"),s.onDomReady(function(){this.initRemote()},this)},onLoad:function(){this._parent(),this.sendRemote("onLoad")},onInitConfig:function(e){this._parent(),this.sendRemote("onInitConfig",e)},onUpdateCounter:function(e,t){this._parent(e,t),this.sendRemote("onUpdateCounter",e,t)},onUpdateTitle:function(e){this._parent(e),this.sendRemote("onUpdateTitle",e)},onUpdateIcon:function(e){this._parent(e),this.sendRemote("onUpdateIcon",e)},onUpdateValue:function(e,t){this.widget?this.widget.setValue(e,t):this.setData(e,t),this.sendRemote("onUpdateValue",e,t)},onUpdatePreferences:function(e){this._parent(e),this.sendRemote("onUpdatePreferences",e)},onSearch:function(e){this._parent(e),this.sendRemote("onSearch",e)},onResetSearch:function(){this._parent(),this.sendRemote("onResetSearch")},onViewRequest:function(e){this.sendRemote("onViewRequest",e)},initRemote:function(){if("false"!==t.parseQuery(window.location.search).remote){var e,i=this,o=i.widget;i.socket||(i.remoteCallbacks={},(e=new n.Socket(o.id+"-slave")).subscribeServer("uwa.embedded",window.parent,o.widgetDomain),e.addListener("environmentMessage",function(e){var t=e.args,n=t.shift();i.disableRemote=n,i.dispatchEvent(n,t),i.disableRemote=!1}),i.socket=e,i._runRemoteQueue())}},_runRemoteQueue:function(){var e,t;this.socket&&0!==this._remoteQueue.length&&(t=this._remoteQueue.shift(),!0===this.disableRemote||this.disableRemote===t[0]?this.log("sendRemote message ignored: "+t):(e={id:this.widget.id,args:t},this.log("sendRemote message: "+t),this.socket.dispatchEvent("widgetMessage",e,[e.id+"-master"])),this._runRemoteQueue())},sendRemote:function(){this._remoteQueue.push(t.toArray(arguments)),this._runRemoteQueue()}});return e.namespace("Environments/Frame",h,e)});