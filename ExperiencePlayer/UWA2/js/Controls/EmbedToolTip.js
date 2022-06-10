define("UWA/Controls/EmbedToolTip",["UWA/Core","UWA/Class/Timed","UWA/Event","UWA/Controls/ToolTip","UWA/Element"],function(t,i,o,e,s){"use strict";var l=e.extend(i,{defaultOptions:{id:"uwa-embedToolTip",className:"uwa-embedToolTip",width:100,overDelay:1e3,margin:5},show:function(){var t,i=this._parent;this._tooltip||this.buildSkeleton(),this.setDelayed("showEmbedToolTip",function(){this._tooltippedSize=s.getSize.call(this._tooltipped),this._originalStyle=s.getStyles.call(this._tooltipped,["z-index","position"]),t=parseInt(this._originalStyle["z-index"],10)+100||1e3,s.setStyles.call(this._tooltipped,{zIndex:String(t),position:"relative"}),s.setStyles.call(this._tooltip,{zIndex:String(t-1),paddingBottom:this._tooltippedSize.height+this.options.margin,width:Math.max(this.options.width,this._tooltippedSize.width)}),i.call(this),this._tooltip.show(),this.setPosition()},this.options.overDelay)},hide:function(){this._parent(),this.clearDelayed("showEmbedToolTip"),this.options.fx||s.setStyles.call(this._tooltipped,this._originalStyle)},setPosition:function(){this._tooltip.setPosition({x:-this.options.margin,y:-this._tooltip.getSize().height+(this._tooltippedSize?this._tooltippedSize.height:this._tooltipped.getSize().height)+this.options.margin},{relative:this._tooltipped})},fxCompleted:function(){this._parent(),this.options.fx&&!this.visible&&s.setStyles.call(this._tooltipped,this._originalStyle)}});return t.namespace("Controls/EmbedToolTip",l,t)});