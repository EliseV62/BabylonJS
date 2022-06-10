define("UWA/Controls/FeedView/Ticker",["UWA/Core","UWA/String","UWA/Controls/FeedView","UWA/Controls/Flash"],function(e,t,s,r){"use strict";var i=s.extend({viewName:"ticker",color:"blank",colors:{blue:["014446","6eb8bd","1fd3e3","6EB8BD"],green:["232908","787F57","B6D800","787F57"],red:["5B0000","D5827C","E9440B","D5827C"],orange:["440121","C57C9A","FE4792","C57C9A"],white:["343434","8E8D8D","FFFFFF","8E8D8D"],yellow:["502200","BF934E","FCBC13","BF934E"],blank:["transparent","8E8D8D","333333","333333"],borderless:["transparent","8E8D8D","333333","333333"]},buildSkeleton:function(){var t,s=this.colors,i=this.color,n=this.options;return this.container=e.createElement("div",{class:"uwa-feedview content uwa-feedview-"+this.viewName}),t=new r({_root:!1,url:e.hosts.uwa+e.paths.img+"flash/ticker.swf",height:80,width:"100%",allowScriptAccess:"always",flashVars:{background:s[i][0],arrow:s[i][1],text:s[i][2],subtext:s[i][3],shareLabel:e.i18n("Share"),direction:n.direction,share:n.displayShare?"1":"0"}}).inject(this.container),this.elements.flash=t.getFlashContainer(),this.registerOnFlashLoad(),this.container},registerOnFlashLoad:function(){var e=this;setTimeout(function t(){e.onFlashLoad()||setTimeout(t,500)},1e3)},onFlashLoad:function(){var e,s,r,i=this.options,n=i.source.getItems(),a=this.elements.flash;if("function"==typeof a.addItem){for(e=0,s=n.length;e<s;e++)r=n[e],a.addItem(e,t.stripTags(r.title),i.showDate?t.parseRelativeTime(r.date):"");return a.start(),!0}return!1},onResize:function(){},refreshItems:function(){}});return e.namespace("Controls/FeedView_Ticker",i,e)});