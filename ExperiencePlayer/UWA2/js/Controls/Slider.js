define("UWA/Controls/Slider",["UWA/Core","UWA/Utils","UWA/Utils/Client","UWA/Event","UWA/Element","UWA/Controls/Abstract"],function(t,e,s,n,i,o){"use strict";var a=o.extend({name:"uwa-slider",defaultOptions:{className:"",isTouch:s.Features.touchEvents,value:0,handleButton:!1,handleDragTreshold:40,slider:{html:[{tag:"div",class:"scrubber-wrapper",html:{tag:"div",class:"scrubber",html:[{tag:"div",class:"progress"},{tag:"div",class:"loaded"},{tag:"div",class:"handle handle-hide"}]}}],scrubberClass:"scrubber",progressClass:"progress",handleClass:"handle",loadedClass:"loaded"}},init:function(t){t=t||{},this._parent(t),this.eventNames={start:this.options.isTouch?"touchstart":"mousedown",move:this.options.isTouch?"touchmove":"mousemove",end:this.options.isTouch?"touchend":"mouseup"},this.body=t.body||document.body,this.bodyEvents={},this.options.handleButton&&(this.bodyEvents[this.eventNames.move]=this.onHandleDrag.bind(this),this.bodyEvents[this.eventNames.end]=this.onHandleDragEnd.bind(this)),this._buildSkeleton(),this._attachEvents(),this.reset()},reset:function(){var t=this.elements;this.loadedPercent=0,t.progress.setStyle("width",0),this._updatePosition(0)},show:function(){this.container.show()},hide:function(){this.container.hide()},setValue:function(t){t<0||t>100?console.log("The value should be an integer between 0 and 100"):(this.setOption("value",t),this._updatePosition(t))},setLoadedValue:function(t){this.elements.loaded.setStyle("width",t+"%")},onInjected:function(){this.options.value>0&&this._updatePosition(this.options.value)},onHandleDragStart:function(t){var e=this.elements.handle,s=n.getPosition(t).x-e.getPosition(document).x;Math.abs(s)<=this.options.handleDragTreshold&&(n.stop(t),i.addEvents.call(this.body,this.bodyEvents))},onHandleDrag:function(t){n.stop(t);var e=n.getPosition(t).x,s=this.elements.scrubber.getParent().getClientRects()[0].left;(s=e-s)<0?s=0:s>this.elements.scrubber.offsetWidth&&(s=this.elements.scrubber.offsetWidth),this._updateValue(s)},onHandleDragEnd:function(t){n.stop(t),i.removeEvents.call(this.body,this.bodyEvents),this.drag=null},onProgressBarClick:function(t){var e;e=n.getPosition(t).x-this.elements.scrubber.getPosition(document).x,this._updateValue(e)},_buildSkeleton:function(){var e,s,n=this.options,i=n.slider;return n.container&&t.is(n.container.getElement(".controls-slider"),"element")?((e=n.container.getElement(".controls-slider")).addClassName(this.getClassNames()),e.addContent(n.slider.html)):e=t.createElement("div",{class:this.getClassNames(),html:n.slider.html}),s=e.getElement.bind(e),this.elements={scrubber:s("."+i.scrubberClass),progress:s("."+i.progressClass),handle:s("."+i.handleClass),loaded:s("."+i.loadedClass)},n.handleButton&&this.elements.handle.removeClassName("handle-hide"),this.container=e,this},_attachEvents:function(){var t=this.elements,e=this.dispatchEvent.bind(this);return this.options.handleButton&&this.container.addEvent(this.eventNames.start,this.onHandleDragStart.bind(this)),t.scrubber.addEvent("click",e.bind(this,"onProgressBarClick")),this},_updateValue:function(t){var e=this.elements.scrubber.offsetWidth,s=Math.round(100*t/e);this.setOption("value",s),this._updatePosition(s),this.dispatchEvent("onChange",s)},_updatePosition:function(t){if(this.container&&this.container.isInjected()){var e=this.elements.progress,s=this.elements.scrubber,n=this.elements.handle,i=n.offsetWidth/2/s.offsetWidth*100;e.setStyle("width",t+"%"),n.setStyle("left",t-i+"%")}}});return t.namespace("Controls/Slider",a,t)});