define("UWA/Controls/DatePicker",["UWA/Core","UWA/Date","UWA/Event","UWA/Controls/Calendar","UWA/Controls/Abstract","UWA/Controls/Picker"],function(e,t,n,a,i,s){"use strict";var o;return o=s.extend({name:"uwa-datepicker",options:{format:"%x",calendarOptions:{},button:{tag:"div",class:"uwa-icon uwa-icon-only calendar"},time:!1,utc:!1},setOptions:function(e){return e||(e={}),e.date&&(e.value=e.date/1e3),this._parent(e)},syncInput:function(){var e=this.elements,n=this.getDate();e.value&&e.value.setText(n?t.strftime(n,this.options.format):""),e.calendar&&e.calendar.setDate(n),e.time&&n&&(e.time.getElement(".value").setText(t.strftime(n,"%x")),e.time.getElements("input").forEach(function(e){e.value=n["get"+e.getAttribute("data-action")]()||""}))},onChange:function(){this.dispatchEvent("onDateSelect",[this.getDate()])},onOpen:function(){this._parent();var e=this.elements;e.calendar.refreshLimit(),e.time&&(e.time.hide(),e.calendar.show())},buildContent:function(){var t,i=this;return t=function(e){var t=this,a=n.whichKey(e);1===a.length&&isNaN(a)&&n.preventDefault(e),setTimeout(function(){var e,n,a=i.getDate()||new Date;a["set"+t.getAttribute("data-action")](t.value),i.setDate(a),t.value.length>=2&&(n=((e=i.elements.time.getElements("input")).indexOf(t)+1)%e.length,e[n].select())},1)},i.options.time&&(i.elements.time=e.createElement("div",{class:i.getClassNames("-time"),html:[{tag:"div",class:"value"},{tag:"input",type:"text",class:i.getClassNames("-text"),"data-action":"Hours",events:{keydown:t}},":",{tag:"input",type:"text",class:i.getClassNames("-text"),"data-action":"Minutes",events:{keydown:t}}]}).hide()),i.elements.content=e.createElement("div",{html:[i.elements.calendar=new a(e.extend({_root:!1},i.options.calendarOptions)).setDate(this.getDate()).addEvent("onDateSelect",function(e){var t=i.getDate();t?(t.setDate(e.getDate()),t.setMonth(e.getMonth()),t.setFullYear(e.getFullYear())):t=e,i.setDate(t),i.options.time?(i.elements.calendar.hide(),i.elements.time.show().getElement("input").select(),i.elements.dropdown.updatePosition()):(i.toggle(!1),i.dispatchEvent("onChange",[i.getValue()]))}),i.elements.time]}),i.elements.content},buildNavigationItem:function(e){return e.date&&(e.value=e.date/1e3),this._parent(e)},setDate:function(e){return e&&this.options.utc&&(e=e.getTime()-6e4*e.getTimezoneOffset()),this.setValue(e/1e3||"")},getDate:function(){var e=this.getValue();if(e)return this.options.utc&&(e=Number(e)+60*(new Date).getTimezoneOffset()),new Date(1e3*e)},setLimit:function(e){return this.elements.calendar?this.elements.calendar.setLimit(e):this.setOptions({calendarOptions:{limit:e}}),this}}),e.namespace("Controls/DatePicker",o,e)});