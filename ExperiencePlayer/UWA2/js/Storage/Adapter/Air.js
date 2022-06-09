define("UWA/Storage/Adapter/Air",["UWA/Core","UWA/Storage/Adapter/Abstract"],function(t,e){"use strict";var r=e.extend({type:"Air",limit:65536,connect:function(t){this.database=t,this.db=null,this.storage.isReady=!0},isAvailable:function(){return void 0!==window.air},getKey:function(t){return"uwa-"+this.database+"-"+t},get:function(t){this.interruptAccess();var e=air.EncryptedLocalStore.getItem(this.getKey(t));if(null!=e)return String(e)},set:function(t,e){this.interruptAccess();var r=new air.ByteArray;return r.writeUTFBytes(e),air.EncryptedLocalStore.setItem(this.getKey(t),r),e},rem:function(t){this.interruptAccess();var e=this.get(t);return air.EncryptedLocalStore.removeItem(this.getKey(t)),e}});return t.namespace("Storage/Adapter/Air",r,t)});