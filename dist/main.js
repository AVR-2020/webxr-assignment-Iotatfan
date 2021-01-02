/*! For license information please see main.js.LICENSE.txt */
(()=>{var t,e={972:t=>{var e;window,e=function(){return function(t){var e={};function i(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s="./index.js")}({"./index.js":function(t,e,i){"use strict";var n=AFRAME.utils.styleParser;if("undefined"==typeof AFRAME)throw new Error("Component attempted to register before AFRAME was available.");AFRAME.registerComponent("event-set",{schema:{default:"",parse:function(t){return n.parse(t)}},multiple:!0,init:function(){this.eventHandler=null,this.eventName=null},update:function(t){this.removeEventListener(),this.updateEventListener(),this.addEventListener()},remove:function(){this.removeEventListener()},pause:function(){this.removeEventListener()},play:function(){this.addEventListener()},updateEventListener:function(){var t,e,i,n=this,r=this.data,s=this.el;t=r._event||this.id,e=r._target,i=e?s.sceneEl.querySelector(e):s,this.eventName=t;var a=function(){var t;for(t in r)"_event"!==t&&"_target"!==t&&AFRAME.utils.entity.setComponentProperty.call(n,i,t,r[t])};isNaN(r._delay)?this.eventHandler=a:this.eventHandler=function(){setTimeout(a,parseFloat(r._delay))}},addEventListener:function(){this.el.addEventListener(this.eventName,this.eventHandler)},removeEventListener:function(){this.el.removeEventListener(this.eventName,this.eventHandler)}})}})},t.exports=e()},238:()=>{var t,e=AFRAME.utils.debug,i=AFRAME.utils.coordinates,n=e("components:look-at:warn"),r=i.isCoordinates||i.isCoordinate;delete AFRAME.components["look-at"],AFRAME.registerComponent("look-at",{schema:{default:"0 0 0",parse:function(t){return r(t)||"object"==typeof t?i.parse(t):t},stringify:function(t){return"object"==typeof t?i.stringify(t):t}},init:function(){this.target3D=null,this.vector=new THREE.Vector3,this.cameraListener=AFRAME.utils.bind(this.cameraListener,this),this.el.addEventListener("componentinitialized",this.cameraListener),this.el.addEventListener("componentremoved",this.cameraListener)},update:function(){var t,e=this,i=e.data;return!i||"object"==typeof i&&!Object.keys(i).length?e.remove():"object"==typeof i?this.lookAt(new THREE.Vector3(i.x,i.y,i.z)):(t=e.el.sceneEl.querySelector(i))?t.hasLoaded?e.beginTracking(t):t.addEventListener("loaded",(function(){e.beginTracking(t)})):void n('"'+i+'" does not point to a valid entity to look-at')},tick:(t=new THREE.Vector3,function(e){var i=this.target3D;i&&(i.getWorldPosition(t),this.lookAt(t))}),remove:function(){this.el.removeEventListener("componentinitialized",this.cameraListener),this.el.removeEventListener("componentremoved",this.cameraListener)},beginTracking:function(t){this.target3D=t.object3D},cameraListener:function(t){t.detail&&"camera"===t.detail.name&&this.update()},lookAt:function(t){var e=this.vector,i=this.el.object3D;this.el.getObject3D("camera")?e.subVectors(i.position,t).add(i.position):e.copy(t),i.lookAt(e)}})},571:()=>{AFRAME.registerComponent("proxy-event",{schema:{captureBubbles:{default:!1},enabled:{default:!0},event:{type:"string"},from:{type:"string"},to:{type:"string"},as:{type:"string"},bubbles:{default:!1}},multiple:!0,init:function(){var t,e,i,n=this.data,r=this.el,s=this;if(n.from?t="PARENT"===n.from?[r.parentNode]:document.querySelectorAll(n.from):i="CHILDREN"===n.to?r.querySelectorAll("*"):"SELF"===n.to?[r]:document.querySelectorAll(n.to),n.from)for(e=0;e<t.length;e++)this.addEventListenerFrom(t[e]);else r.addEventListener(n.event,(function(t){var n=s.data;if(n.enabled&&(n.captureBubbles||t.target===r))for(e=0;e<i.length;e++)i[e].emit(n.as||n.event,t.detail?t.detail:null,n.bubbles)}))},addEventListenerFrom:function(t){var e=this.data,i=this;t.addEventListener(e.event,(function(e){var n=i.data;n.enabled&&(n.captureBubbles||e.target===t)&&i.el.emit(n.as||n.event,e.detail?e.detail:null,!1)}))}})},479:()=>{if("undefined"==typeof AFRAME)throw new Error("Component attempted to register before AFRAME was available.");AFRAME.registerComponent("slice9",{schema:{width:{default:1,min:0},height:{default:1,min:0},left:{default:0,min:0},right:{default:0,min:0},bottom:{default:0,min:0},top:{default:0,min:0},side:{default:"front",oneOf:["front","back","double"]},padding:{default:.1,min:.01},color:{type:"color",default:"#fff"},opacity:{default:1,min:0,max:1},transparent:{default:!0},debug:{default:!1},src:{type:"map"}},multiple:!1,init:function(){var t=this.data,e=this.material=new THREE.MeshBasicMaterial({color:t.color,opacity:t.opacity,transparent:t.transparent,wireframe:t.debug}),i=this.geometry=new THREE.PlaneBufferGeometry(t.width,t.height,3,3);new THREE.TextureLoader,this.plane=new THREE.Mesh(i,e),this.el.setObject3D("mesh",this.plane),this.textureSrc=null},updateMap:function(){var t=this.data.src;if(t){if(t===this.textureSrc)return;return this.textureSrc=t,void this.el.sceneEl.systems.material.loadTexture(t,{src:t},e.bind(this))}function e(t){this.material.map=t,this.material.needsUpdate=!0,this.regenerateMesh()}this.material.map&&e(null)},regenerateMesh:function(){var t=this.data,e=this.geometry.attributes.position.array,i=this.geometry.attributes.uv.array,n=this.material.map.image;if(n){var r={left:t.left/n.width,right:t.right/n.width,top:t.top/n.height,bottom:t.bottom/n.height};h(1,r.left,1),h(2,r.right,1),h(4,0,r.bottom),h(5,r.left,r.bottom),h(6,r.right,r.bottom),h(7,1,r.bottom),h(8,0,r.top),h(9,r.left,r.top),h(10,r.right,r.top),h(11,1,r.top),h(13,r.left,0),h(14,r.right,0);var s=t.width/2,a=t.height/2,o=-s+t.padding,l=s-t.padding,d=a-t.padding,c=-a+t.padding;u(0,-s,a),u(1,o,a),u(2,l,a),u(3,s,a),u(4,-s,d),u(5,o,d),u(6,l,d),u(7,s,d),u(8,-s,c),u(9,o,c),u(10,l,c),u(11,s,c),u(13,o,-a),u(14,l,-a),u(12,-s,-a),u(15,s,-a),this.geometry.attributes.position.needsUpdate=!0,this.geometry.attributes.uv.needsUpdate=!0}function u(t,i,n){e[3*t]=i,e[3*t+1]=n}function h(t,e,n){i[2*t]=e,i[2*t+1]=n}},update:function(t){var e=this.data;this.material.color.setStyle(e.color),this.material.opacity=e.opacity,this.material.transparent=e.transparent,this.material.wireframe=e.debug,this.material.side=function(t){switch(t){case"back":return THREE.BackSide;case"double":return THREE.DoubleSide;default:return THREE.FrontSide}}(e.side);var i=AFRAME.utils.diff(e,t);"src"in i?this.updateMap():("width"in i||"height"in i||"padding"in i||"left"in i||"top"in i||"bottom"in i||"right"in i)&&this.regenerateMesh()},remove:function(){},pause:function(){},play:function(){}})},596:function(t){var e;"undefined"!=typeof self&&self,e=function(){return function(t){var e={};function i(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=1)}([function(t,e,i){"use strict";var n={};t.exports.select=function(t,e,i){return n[e]||(n[e]=new Function("state","item","return "+d(e)+";")),n[e](t,i)};var r=/\.([A-Za-z][\w_-]*)/g,s=/([=&|!?:+-])(\s*)([\(]?)([A-Za-z][\w_-]*)/g,a=/^([\(]?)([A-Za-z][\w_-]*)/g,o=/state\["item"\]/g,l=/state\["(true|false)"\]/g;function d(t){return(t=(t=(t=(t=t.replace(r,'["$1"]')).replace(a,'$1state["$2"]')).replace(s,'$1$2$3state["$4"]')).replace(o,"item")).replace(l,"$1")}function c(){var t=arguments;return function(){var e;for(e=0;e<t.length;e++)t[e].apply(this,arguments)}}t.exports.generateExpression=d,t.exports.clearObject=function(t){for(var e in t)delete t[e]},t.exports.composeHandlers=function(){var t,e,i,n=arguments;for(i={},e=0;e<n.length;e++)for(t in n[e])t in i?i[t].constructor===Array?i[t].push(n[e][t]):i[t]=[i[t],n[e][t]]:i[t]=n[e][t];for(t in i)i[t].constructor===Array&&(i[t]=c.apply(this,i[t]));return i},t.exports.composeFunctions=c;var u=["||","&&","!=","!==","==","===",">","<","<=",">="],h=/\s+/,f=/\(|\)|\!/g;function m(t){return-1===(t=function(t){return 0===t.indexOf("!!")?t.replace("!!",""):0===t.indexOf("!")?t.replace("!",""):t}(t.trim())).indexOf(".")?t:t.substring(0,t.indexOf("."))}t.exports.parseKeysToWatch=function(t,e,i){var n,r;for(r=y(e,h),n=0;n<r.length;n++)if(-1===u.indexOf(r[n])&&!r[n].startsWith("'")&&-1===t.indexOf(r[n])){if(i&&"item"===r[n])continue;t.push(m(r[n]).replace(f,""))}return t};var p={};function y(t,e){return p[e]||(p[e]={}),p[e][t]||(p[e][t]=t.split(e)),p[e][t]}t.exports.split=y,t.exports.copyArray=function(t,e){var i;for(t.length=0,i=0;i<e.length;i++)t[i]=e[i]}},function(t,e,i){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};i(2);var r,s,a=i(3),o=i(0),l=i(4).wrapArray,d={initialState:{},nonBindedStateKeys:[],handlers:{},computeState:[function(){}]},c="object";AFRAME.registerState=function(t){var e=d.computeState;t.computeState&&e.push(t.computeState),AFRAME.utils.extendDeep(d,t),d.computeState=e},AFRAME.registerSystem("state",{init:function(){var t,e=this;for(t in this.arrays=[],this.dirtyArrays=[],this.diff={},this.state=AFRAME.utils.clone(d.initialState),this.subscriptions=[],this.initEventHandlers(),this.state)this.state[t]&&this.state[t].constructor===Array&&(this.arrays.push(t),this.state[t].__dirty=!0,l(this.state[t]));this.lastState=AFRAME.utils.clone(this.state),this.eventDetail={lastState:this.lastState,state:this.state},this.el.addEventListener("loaded",(function(){var t;for(t=0;t<d.computeState.length;t++)d.computeState[t](e.state,"@@INIT");for(t=0;t<e.subscriptions.length;t++)e.subscriptions[t].onStateUpdate(e.state)}))},dispatch:(s=[],function(t,e){var i,n;for(d.handlers[t](this.state,e),i=0;i<d.computeState.length;i++)d.computeState[i](this.state,t,e);for(n in this.diff)delete this.diff[n];for(a(this.lastState,this.state,this.diff,d.nonBindedStateKeys),this.dirtyArrays.length=0,i=0;i<this.arrays.length;i++)this.state[this.arrays[i]].__dirty&&this.dirtyArrays.push(this.arrays[i]);for(s.length=0,i=0;i<this.subscriptions.length;i++){if("bind-for"===this.subscriptions[i].name){if(!this.state[this.subscriptions[i].keysToWatch[0]].__dirty)continue}else if(!this.shouldUpdate(this.subscriptions[i].keysToWatch,this.diff,this.dirtyArrays))continue;-1===s.indexOf(this.subscriptions[i])&&s.push(this.subscriptions[i])}for(i=0;i<s.length;i++)s[i].onStateUpdate();for(n in this.state)this.state[n]&&this.state[n].constructor===Array&&(this.state[n].__dirty=!1);this.copyState(this.lastState,this.state),this.eventDetail.action=t,this.eventDetail.payload=e,this.el.emit("stateupdate",this.eventDetail)}),copyState:function(t,e,i){var n;for(n in e)if(i||-1===d.nonBindedStateKeys.indexOf(n))if(e[n]&&e[n].constructor===Object){if(!(n in t)){t[n]=AFRAME.utils.clone(e[n]);continue}this.copyState(t[n],e[n],!0)}else t[n]=e[n]},subscribe:function(t){this.subscriptions.push(t)},unsubscribe:function(t){this.subscriptions.splice(this.subscriptions.indexOf(t),1)},shouldUpdate:function(t,e,i){for(var n=0;n<t.length;n++)if(t[n]in e||-1!==i.indexOf(t[n]))return!0;return!1},initEventHandlers:function(){var t,e=[];for(t in i=i.bind(this),d.handlers)-1===e.indexOf(t)&&(e.push(t),i(t));function i(t){var e=this;this.el.addEventListener(t,(function(i){e.dispatch(t,i.detail)}))}},renderTemplate:(r=/{{\s*(\w*\.)?([\w.]+)\s*}}/g,function(t,e,i){var s,a;if(a=t,e)for(;s=r.exec(t);)a=a.replace(s[0],(void 0===e?"undefined":n(e))===c?o.select(e,s[2])||"":e);return i?a:document.createRange().createContextualFragment(a)}),select:o.select}),AFRAME.registerComponent("bind",{schema:{default:{},parse:function(t){var e,i,n,r;if(t.constructor===Object)return t;if(-1===t.indexOf(":"))return t;for(e={},n=o.split(t,";"),i=0;i<n.length;i++)e[(r=o.split(n[i].trim(),":"))[0]]=r[1].trim();return e}},multiple:!0,init:function(){var t;this.data,this.keysToWatch=[],this.onStateUpdate=this.onStateUpdate.bind(this),this.system=this.el.sceneEl.systems.state,this.id&&(t=o.split(this.id,"__")[0]),this.isNamespacedBind=this.id&&t in AFRAME.components&&!AFRAME.components[t].isSingleProp||t in AFRAME.systems,this.lastData={},this.updateObj={},this.system.subscribe(this),this.onStateUpdate=this.onStateUpdate.bind(this)},update:function(){var t,e=this.data;if(this.keysToWatch.length=0,"string"==typeof e)o.parseKeysToWatch(this.keysToWatch,e);else for(t in e)o.parseKeysToWatch(this.keysToWatch,e[t]);this.onStateUpdate()},onStateUpdate:function(){var t,e,i,r,s=!1,a=this.el;if(a.parentNode){if(this.isNamespacedBind&&o.clearObject(this.updateObj),i=this.system.state,n(this.data)!==c){try{r=o.select(i,this.data)}catch(t){throw new Error("[aframe-state-component] Key '"+this.data+"' not found in state. #"+this.el.getAttribute("id")+"["+this.attrName+"]")}if((void 0===r?"undefined":n(r))!==c&&n(this.lastData)!==c&&this.lastData===r)return;return AFRAME.utils.entity.setComponentProperty(a,this.id,r),void(this.lastData=r)}for(t in this.data){e=this.data[t].trim();try{r=o.select(i,e)}catch(t){throw console.log(t),new Error("[aframe-state-component] Key '"+e+"' not found in state. #"+this.el.getAttribute("id")+"["+this.attrName+"]")}if((void 0===r?"undefined":n(r))===c||n(this.lastData[t])===c||this.lastData[t]!==r){if(t in AFRAME.components&&void 0===r)return void a.removeAttribute(t);this.isNamespacedBind?this.updateObj[t]=r:AFRAME.utils.entity.setComponentProperty(a,t,r),this.lastData[t]=r}}for(s in this.updateObj);this.isNamespacedBind&&s&&a.setAttribute(this.id,this.updateObj)}},remove:function(){this.system.unsubscribe(this)}}),AFRAME.registerComponent("bind-toggle",{schema:{type:"string"},multiple:!0,init:function(){this.system=this.el.sceneEl.systems.state,this.keysToWatch=[],this.onStateUpdate=this.onStateUpdate.bind(this),this.system.subscribe(this),this.onStateUpdate()},update:function(){this.keysToWatch.length=0,o.parseKeysToWatch(this.keysToWatch,this.data)},onStateUpdate:function(){var t,e,i=this.el;t=this.system.state;try{e=o.select(t,this.data)}catch(t){throw new Error("[aframe-state-component] Key '"+this.data+"' not found in state. #"+this.el.getAttribute("id")+"["+this.attrName+"]")}e?i.setAttribute(this.id,""):i.removeAttribute(this.id)},remove:function(){this.system.unsubscribe(this)}}),t.exports={composeFunctions:o.composeFunctions,composeHandlers:o.composeHandlers,select:o.select}},function(t,e,i){"use strict";var n,r,s=i(0);AFRAME.registerComponent("bind-for",{schema:{delay:{default:0},for:{type:"string",default:"item"},in:{type:"string"},key:{type:"string"},pool:{default:0},template:{type:"string"},updateInPlace:{default:!1}},init:function(){this.system=this.el.sceneEl.systems.state,this.onStateUpdate=this.onStateUpdate.bind(this),this.keysToWatch=[],this.renderedKeys=[],this.system.subscribe(this),this.el.children[0]&&"TEMPLATE"===this.el.children[0].tagName?this.template=this.el.children[0].innerHTML.trim():this.template=document.querySelector(this.data.template).innerHTML.trim();for(var t=0;t<this.data.pool;t++)this.el.appendChild(this.generateFromTemplate(null,t))},update:function(){this.keysToWatch[0]=s.split(this.data.in,".")[0],this.onStateUpdate()},onStateUpdateNaive:(r=[],function(){var t,e=this.data,i=this.el;try{t=s.select(this.system.state,e.in)}catch(t){throw new Error("[aframe-state-component] Key '"+e.in+"' not found in state. #"+i.getAttribute("id")+"["+this.attrName+"]")}r.length=0;for(var n=0;n<t.length;n++){var a=t[n];r.push(e.key?a[e.key].toString():a.toString())}for(var o=this.getElsToRemove(r,this.renderedKeys),l=0;l<o.length;l++)o[l].parentNode.removeChild(o[l]);t.length&&this.renderItems(t,r,0)}),renderItems:function(t,e,i){var n,r=this,s=this.data,a=this.el,o=t[i],l=s.key?o[s.key].toString():o.toString();if(-1===this.renderedKeys.indexOf(l))n=this.generateFromTemplate(o,i),a.appendChild(n),this.renderedKeys.push(l);else{if(t.length&&t[0].constructor===String){var d=s.key?o[s.key].toString():o.toString();(n=a.querySelector('[data-bind-for-value="'+d+'"]')).setAttribute("data-bind-for-key",i)}else{var c=this.getBindForKey(o,i);n=a.querySelector('[data-bind-for-key="'+c+'"]')}n.emit("bindforupdate",o,!1)}t[i+1]&&(this.data.delay?setTimeout((function(){r.renderItems(t,e,i+1)}),this.data.delay):this.renderItems(t,e,i+1))},onStateUpdateInPlace:function(){var t=[];return function(){var e,i,n=this.data,r=this.el;try{e=s.select(this.system.state,n.in)}catch(t){throw console.log(t),new Error("[aframe-state-component] Key '"+n.in+"' not found in state. #"+r.getAttribute("id")+"["+this.attrName+"]")}t.length=0;for(var a=0;a<e.length;a++){var o=e[a];i=n.key?o[n.key].toString():o.toString(),t.push(i)}for(var l=this.getElsToRemove(t,this.renderedKeys),d=0;d<l.length;d++)l[d].object3D.visible=!1,l[d].setAttribute("data-bind-for-active","false"),l[d].removeAttribute("data-bind-for-key"),l[d].removeAttribute("data-bind-for-value"),l[d].emit("bindfordeactivate",null,!1),l[d].pause();e.length&&this.renderItemsInPlace(e,t,0)}}(),renderItemsInPlace:function(t,e,i){var n,r=this,s=this.data,a=this.el,o=t[i],l=this.getBindForKey(o,i),d=s.key?o[s.key].toString():o.toString();if(-1===this.renderedKeys.indexOf(d)){if(a.querySelector(':scope > [data-bind-for-active="false"]'))(n=a.querySelector('[data-bind-for-active="false"]')).setAttribute("data-bind-for-key",l),n.setAttribute("data-bind-for-value",d),n.object3D.visible=!0,n.play(),n.setAttribute("data-bind-for-active","true"),n.emit("bindforupdateinplace",o,!1);else{var c=this.generateFromTemplate(o,i);c.addEventListener("loaded",(function(){c.emit("bindforupdateinplace",o,!1)})),a.appendChild(c)}this.renderedKeys.push(d)}else-1!==e.indexOf(d)&&(t.length&&t[0].constructor===String?(n=a.querySelector('[data-bind-for-value="'+d+'"]')).setAttribute("data-bind-for-key",i):n=a.querySelector('[data-bind-for-key="'+l+'"]'),n.emit("bindforupdateinplace",o,!1));t[i+1]&&(this.data.delay?setTimeout((function(){r.renderItemsInPlace(t,e,i+1)}),this.data.delay):this.renderItemsInPlace(t,e,i+1))},generateFromTemplate:function(t,e){var i=this.data;this.el.appendChild(this.system.renderTemplate(this.template,t));var n=this.el.children[this.el.children.length-1];if(!t)return n.setAttribute("data-bind-for-key",""),n.setAttribute("data-bind-for-active","false"),n;var r=this.getBindForKey(t,e);return n.setAttribute("data-bind-for-key",r),i.key||n.setAttribute("data-bind-for-value",t),n.setAttribute("data-bind-for-active","true"),n},getElsToRemove:(n=[],function(t,e){var i=this.data,r=this.el;n.length=0;for(var s=0;s<r.children.length;s++)if("TEMPLATE"!==r.children[s].tagName){var a=i.key?r.children[s].getAttribute("data-bind-for-key"):r.children[s].getAttribute("data-bind-for-value");-1===t.indexOf(a)&&-1!==e.indexOf(a)&&(n.push(r.children[s]),e.splice(e.indexOf(a),1))}return n}),getBindForKey:function(t,e){return this.data.key?t[this.data.key].toString():e.toString()},onStateUpdate:function(){this.data.updateInPlace?this.onStateUpdateInPlace():this.onStateUpdateNaive()}}),AFRAME.registerComponent("bind-item",{schema:{type:"string"},multiple:!0,init:function(){this.itemData=null,this.keysToWatch=[],this.prevValues={};var t=this.rootEl=this.el.closest("[data-bind-for-key]");if(!t)throw new Error("bind-item component must be attached to entity under a bind-for item.");t.addEventListener("bindforupdateinplace",this.updateInPlace.bind(this)),t.addEventListener("bindfordeactivate",this.deactivate.bind(this)),this.el.sceneEl.systems.state.subscribe(this)},update:function(){this.parseSelector()},updateInPlace:function(t){var e=this.propertyMap;if("false"!==this.rootEl.getAttribute("data-bind-for-active"))for(var i in t&&(this.itemData=t.detail),e){var n=this.select(this.itemData,e[i]);n!==this.prevValues[i]&&(AFRAME.utils.entity.setComponentProperty(this.el,i,n),this.prevValues[i]=n)}},onStateUpdate:function(){this.updateInPlace()},select:function(t,e){return s.select(this.el.sceneEl.systems.state.state,e,t)},deactivate:function(){this.prevValues={}},parseSelector:function(){var t=this.propertyMap={};this.keysToWatch.length=0;var e=s.split(this.id,"__")[0];if(!(e in AFRAME.components)||AFRAME.components[e].isSingleProp)t[this.id]=this.data,s.parseKeysToWatch(this.keysToWatch,this.data,!0);else for(var i=s.split(this.data,";"),n=0;n<i.length;n++){var r=s.split(i[n],":");t[this.id+"."+r[0].trim()]=r[1].trim(),s.parseKeysToWatch(this.keysToWatch,r[1].trim(),!0)}}})},function(t,e,i){"use strict";var n;t.exports=(n=[],function(t,e,i,r){var s,a,o,l,d,c,u;for(d in l=i||{},n.length=0,t)n.push(d);if(!e)return l;for(o in e)-1===n.indexOf(o)&&n.push(o);for(c=0;c<n.length;c++)d=n[c],r&&-1!==r.indexOf(d)||(s=t[d],a=e[d],((u=s&&a&&s.constructor===Object&&a.constructor===Object)&&!AFRAME.utils.deepEqual(s,a)||!u&&s!==a)&&(l[d]=a));return l})},function(t,e,i){"use strict";var n=["push","pop","shift","unshift","splice"];function r(t,e){var i=t[e];t[e]=function(){i.apply(t,arguments),t.__dirty=!0}}t.exports.wrapArray=function(t){var e;if(!t.__wrapped){for(e=0;e<n.length;e++)r(t,n[e]);t.__wrapped=!0}}}])},t.exports=e()},187:()=>{document.addEventListener("DOMContentLoaded",(function(){let t=document.getElementById("app");t||(t=document.createElement("div"),t.id="app",document.body.appendChild(t)),t.innerHTML='<a-scene\n    background="color: #87ceeb"\n    fog="type: linear; color: #87ceeb; near: 50; far: 80"\n    light="defaultLightsEnabled: false"\n    render-order="playfield, thrower, ball, menu, menuitem, menubutton, menutext, hud"\n    renderer="colorManagement: true"\n    shadow="type: pcf"\n>\n    \x3c!-- SKY --\x3e\n    \x3c!-- <a-sky color="#87ceeb"></a-sky> --\x3e\n\n    \x3c!-- LIGHT --\x3e\n    <a-entity light="type: ambient; intensity: 0.3;"></a-entity>\n    <a-entity light="type: point; \n        intensity: 1.0; \n        decay: 2;\n        castShadow: true; \n        shadowCameraVisible: true;"\n        position="0 50 0" ></a-entity>    \n    \n    <a-entity fps-counter></a-entity>\n  \n    \x3c!-- Load Assets --\x3e\n    <a-assets timeout="5000">\n        \x3c!-- <require path="C:UsersROGDesktopwebxr-assignment-Iotatfansrcassets.html"> --\x3e\n\x3c!-- Image --\x3e\n<img id="cursorMeshImg" src="assets/models/laser/laser.png">\n<img id="sliceImg" src="assets/img/border.png">\n\n\x3c!-- Models --\x3e\n<a-entity id="cursorLaser" obj-model="obj: #laserObj" visible="false"></a-entity>\n<a-asset-item id="ballMesh" src="assets/models/ball.gltf"></a-asset-item>\n<a-asset-item id="cloud" src="assets/models/cloud/cloud.obj"></a-asset-item>\n<a-asset-item id="cloudmtl" src="assets/models/cloud/cloud.mtl"></a-asset-item>\n<a-asset-item id="forest" src="assets/models/tree/forest.obj"></a-asset-item>\n<a-asset-item id="forestmtl" src="assets/models/tree/forest.mtl"></a-asset-item>\n<a-asset-item id="fountain" scale="2 2 2" src="assets/models/fountain/fountain.obj"></a-asset-item>\n<a-asset-item id="fountainmtl" src="assets/models/fountain/fountain.mtl"></a-asset-item>\n<a-asset-item id="gazebo" position="0 0 16.97724" rotation="0 53 0" src="assets/models/gazebo/gazebo.obj"></a-asset-item>\n<a-asset-item id="gazebomtl" src="assets/models/gazebo/gazebo.mtl"></a-asset-item>\n<a-asset-item id="laserObj" src="assets/models/laser/laser.obj"></a-asset-item>\n<a-asset-item id="tank" src="assets/models/tank.gltf"></a-asset-item>\n<a-asset-item id="tree" position="-3.02465 0 -27.95161" src="assets/models/tree/tree.obj"></a-asset-item>\n<a-asset-item id="treemtl" src="assets/models/tree/tree.mtl"></a-asset-item>\n\n\x3c!-- Audio --\x3e\n<a-audio id="bgm" src="assets/audio/bgm_0.mp3" preload="auto"></a-audio>\n\n\x3c!-- Mixin --\x3e\n<a-mixin\n    id="cursorMesh"\n    material="shader: flat; transparent: true; src: #cursorMeshImg; depthTest: false"\n    sub-object="from: #cursorLaser; name: glow"></a-mixin>\n\n<a-mixin\n    id="ball"\n    gltf-model="#ballMesh"></a-mixin>\n\n<a-mixin\n    id="font"></a-mixin>\n    \n<a-mixin\n    id="menuButton"\n    geometry="primitive: plane; width:1.5; height:0.35"\n    render-order="menubutton"></a-mixin>\n\n<a-mixin\n    id="menuText"\n    text="color: #000; align: center; width: 1; wrapCount: 12"></a-mixin>\n\n<a-mixin\n    id="scoreText"\n    text="color: #FFF; align: center; \n        width: 1; height: 24;\n        wrapCount: 12"></a-mixin>\n\n<a-mixin id="slice" slice9="color: #FFF; transparent: true; opacity: 0.6; left: 20; right: 43; top: 20; bottom: 43; padding:0.1; src: #sliceImg;"></a-mixin>\x3c!-- </require> --\x3e</require>\n    </a-assets>\n\n    \x3c!-- Load Templates --\x3e\n    \x3c!-- <require path="C:UsersROGDesktopwebxr-assignment-Iotatfansrc\templatesmenu.html"> --\x3e\n\x3c!-- Menu Container --\x3e\n<a-entity \n    id="menu"\n    bind__visible="menuActive"\n    position= "0 1.4 -2.3">\n\n    <a-entity\n        id="menuBackground"\n        mixin="slice"\n        slice9="width: 3.5; height: 2; side: double; transparent: true; debug: false;"\n        render-order="menu"\n        position="0 0 -2.5"></a-entity>\n\n    <a-entity id="mainMenu">\n        <a-plane\n            id="startButton" material="fog: true; side: front; transparent: false; wireframe: false; visible: true" geometry="skipCache: false"\n            mixin="menuButton"\n            bind-toggle__raycastable="menuActive"\n            proxy-event="event: click; to: a-scene; as: startgame"\n            position="0 0.3 -2.45"\n            render-order="menu">\n            <a-entity \n                id="startButtonText"\n                mixin="menuText" \n                text="value: Start Game; side: double"></a-entity>\n        </a-plane>\n\n        <a-plane\n            id="leaderboardButton"\n            mixin="menuButton"\n            bind-toggle__raycastable="menuActive"\n            proxy-event="event: click; to: a-scene; as: showleaderboard"\n            position="0 -0.3 -2.45"\n            render-order="menu">\n            <a-entity \n                id="startButtonText" \n                mixin="menuText"\n                text="value: Show Leaderboard"></a-entity>\n        </a-plane>\n    \n    </a-entity>\n\n    \x3c!-- <require path="C:UsersROGDesktopwebxr-assignment-Iotatfansrc\templatesleaderboard.html"> --\x3e\n<a-entity\n    id= "leaderboard"\n    position= "3 0 -1.2"\n    rotation= "0 -60 0"\n    bind__visible="menuActive && leaderboardActive"\n    render-order="menuitem">\n\n    <a-entity\n        id="leaderboardBackground"\n        mixin="slice"\n        slice9="width: 2; height: 2; side: double"\n        render-order="menuitem"></a-entity>\n\n</a-entity>\x3c!-- </require> --\x3e</require>\n\n</a-entity>\n\x3c!-- </require> --\x3e</require>\n    \x3c!-- <require path="C:UsersROGDesktopwebxr-assignment-Iotatfansrc\templatesscoreboard.html"> --\x3e\n<a-entity\n    id="scoreboard"\n    bind__visible="isPlaying"\n    render-order="hud"\n    position="3 2 -3"\n    rotation="-10 -40 0">\n\n    \x3c!-- Create Transparent background --\x3e\n    <a-entity\n        id="scoreboardBackground"\n        mixin="slice"\n        slice9="width: 1; height: 0.8;; side: double"           \n        render-order="menu"></a-entity>\n\n    <a-entity id="scoreContainer">\n        <a-entity\n            id="score" text="side: front"\n            bind__text="value: score.score"\n            mixin="scoreText"\n            position="0 0.15 0"></a-entity>\n        <a-entity\n            id="streak"\n            bind__text="value: score.streak + \'x\'"\n            mixin="scoreText"\n            position="0 -0.15 0"></a-entity>\n    </a-entity>\n\n</a-entity>\x3c!-- </require> --\x3e</require>\n    \x3c!-- <require path="C:UsersROGDesktopwebxr-assignment-Iotatfansrc\templateslife.html"> --\x3e\n<a-entity\n    id="life"\n    bind__visible="isPlaying"\n    render-order="hud"\n    position="-3 2 -3"\n    rotation="-10 40 0">\n\n    <a-entity\n        id="lifeTextBackground"\n        mixin="slice"\n        slice9="width: 1; height: 0.5;; side: double"           \n        render-order="menu"></a-entity>\n\n    <a-entity id="lifetextContainer">\n        <a-entity\n            id="lifeText"\n            bind__text="value: \'Life \' + life"\n            mixin="scoreText"\n            position="0 0 0"></a-entity>\n    </a-entity>\n\n</a-entity>\x3c!-- </require> --\x3e</require>\n    \x3c!-- <require path="C:UsersROGDesktopwebxr-assignment-Iotatfansrc\templatesenvironment.html"> --\x3e\n\x3c!-- GROUND --\x3e\n<a-entity id="environment">\n\n    <a-plane\n        id="ground" \n        static-body \n        position="0 0 0" \n        rotation="-90 0 0" \n        width="200" \n        height="200" \n        color="#8ECA58" \n        shadow="receive: true"\n    ></a-plane>\n\n    \x3c!-- Environment Objects --\x3e\n    <a-entity id="tree" position="-3.02465 0 -27.95161" obj-model="obj: #tree; mtl: #treemtl" scale="0.01 0.01 0.01" shadow="receive: true" render-order="playfield"></a-entity>\n    <a-entity id="fountain" position="0 0 6" obj-model="obj: #fountain; mtl: #fountainmtl" scale="2 2 2" shadow="receive: true" render-order="playfield"></a-entity>\n    <a-entity id="gazebo" rotation="0 53 0" position="0 0 16.97724" obj-model="obj: #gazebo; mtl: #gazebomtl" scale="1 1 1" shadow="receive: true" render-order="playfield"></a-entity>\n\n    \x3c!-- Clouds --\x3e\n    <a-entity id="cloud" rotation="0 0 0" position="0 50 -25" obj-model="obj: #cloud; mtl: #cloudmtl" scale="0.03 0.03 0.03" shadow="receive: true" render-order="playfield"></a-entity>\n\n\n    \x3c!-- Tree Barrier --\x3e\n    <a-entity  position="-0 -0.01 0">\n        <a-entity id="forest#1" rotation="0 4.17 0" position="-20 0 -50" obj-model="obj: #forest; mtl: #forestmtl" scale="10 10 10" shadow="receive: true" render-order="playfield"></a-entity>\n        <a-entity id="forest#2" rotation="0 6.02 0" position="-41.93437 0 -40" obj-model="obj: #forest; mtl: #forestmtl" scale="10 10 10" shadow="receive: true" render-order="playfield"></a-entity>\n        <a-entity id="forest#3" rotation="0 0 0" position="-40.06503 0 47.063" obj-model="obj: #forest; mtl: #forestmtl" scale="10 10 10" shadow="receive: true" render-order="playfield"></a-entity>\n        <a-entity id="forest#4" rotation="0 0 0" position="3.75423 0 -54.65186" obj-model="obj: #forest; mtl: #forestmtl" scale="10 10 10" shadow="receive: true" render-order="playfield"></a-entity>\n        <a-entity id="forest#5" rotation="0 -6.47 0" position="27.93435 0 -49.93007" obj-model="obj: #forest; mtl: #forestmtl" scale="10 10 10" shadow="receive: true" render-order="playfield"></a-entity>\n        <a-entity id="forest#6" rotation="0 -7.91 0" position="-57.76219 0 -24.37149" obj-model="obj: #forest; mtl: #forestmtl" scale="10 10 10" shadow="receive: true" render-order="playfield"></a-entity>\n        <a-entity id="forest#7" rotation="0 -36.91 0" position="50.35229 0 -35.96899" obj-model="obj: #forest; mtl: #forestmtl" scale="10 10 10" shadow="receive: true" render-order="playfield"></a-entity>\n        <a-entity id="forest#8" rotation="0 30 0" position="51.79623 0 -11.96787" obj-model="obj: #forest; mtl: #forestmtl" scale="10 10 10" shadow="receive: true" render-order="playfield"></a-entity>\n        <a-entity id="forest#9" rotation="0 35 0" position="-60.37688 0 -4.809" obj-model="obj: #forest; mtl: #forestmtl" scale="10 10 10" shadow="receive: true" render-order="playfield"></a-entity>\n        <a-entity id="forest#10" rotation="0 54.72 0" position="-63.01354 0 15.97112" obj-model="obj: #forest; mtl: #forestmtl" scale="10 10 10" shadow="receive: true" render-order="playfield"></a-entity>\n        <a-entity id="forest#11" rotation="0 75 0" position="-58.24836 0 35.99521" obj-model="obj: #forest; mtl: #forestmtl" scale="10 10 10" shadow="receive: true" render-order="playfield"></a-entity>\n        <a-entity id="forest#12" rotation="0 90 0" position="-15.69636 0 50.60834" obj-model="obj: #forest; mtl: #forestmtl" scale="10 10 10" shadow="receive: true" render-order="playfield"></a-entity>\n        <a-entity id="forest#13" rotation="0 35 0" position="7.59546 0 47.63395" obj-model="obj: #forest; mtl: #forestmtl" scale="10 10 10" shadow="receive: true" render-order="playfield"></a-entity>\n        <a-entity id="forest#14" rotation="0 60 0" position="33.77944 0 48.58182" obj-model="obj: #forest; mtl: #forestmtl" scale="10 10 10" shadow="receive: true" render-order="playfield"></a-entity>\n        <a-entity id="forest#15" rotation="0 70 0" position="53.1873 0 32.42136" obj-model="obj: #forest; mtl: #forestmtl" scale="10 10 10" shadow="receive: true" render-order="playfield"></a-entity>\n        <a-entity id="forest#16" rotation="0 60 0" position="58.77273 0 9.27566" obj-model="obj: #forest; mtl: #forestmtl" scale="10 10 10" shadow="receive: true" render-order="playfield"></a-entity>\n    </a-entity>\n\n    </a-entity>\n\x3c!-- </require> --\x3e</require>\n    \x3c!-- <require path="C:UsersROGDesktopwebxr-assignment-Iotatfansrc\templatesshooter.html"> --\x3e\n\x3c!-- Placeholder for Thrower --\x3e\n<a-entity id="shooter" gun\n    gltf-model="#tank" \n    position="0 0 -30" \n    rotation="0 90 0"\n    scale="3 3 3" \n    shadow="receive: true">\n</a-entity>\n\n<a-entity shooter gun \n    position="-0.09348 1.1676 -26.99741"\n    rotation="0 -180 0"></a-entity>\n\n<a-entity id="ball" ball gltf-model="#ballMesh" position="-0.09348 1.1676 -26.99741" scale="1.2 1.2 1.2" shadow="receive: true"></a-entity>\x3c!-- </require> --\x3e</require>\n\n    \x3c!-- Audio on Player Location --\x3e\n    <a-entity sound="src: #bgm; autoplay: false"></a-entity>\n\n    \x3c!-- Cursor --\x3e\n    <a-entity\n        id="mouseCursor"\n        bind__raycaster="enabled: !inVR"\n        cursor="rayOrigin: mouse"\n        raycaster="objects: [raycastable]; direction: -0.6271414776140996 -0.5657992661654614 -0.5353174361653367; origin: 4.511965796091053 66.82408538416385 53.58748401881879"></a-entity>\n\n    <a-entity\n        id="mouseCursorMesh"\n        mixin="cursorMesh"\n        cursor-mesh="cursorEl: #mouseCursor"\n        bind__cursor-mesh="active: menuActive"\n        render-order="cursor"></a-entity>\n    \n</a-scene>'}))},22:()=>{var t,e,i;AFRAME.registerComponent("ball",{schema:{direction:{type:"vec3"},lifeTime:{default:10,type:"float"},name:{default:"normal",type:"string"},poolSize:{default:8,type:"float"},position:{type:"vec3"},speed:{default:20,type:"float"}},init:function(){var t=this.el;t.object3D.visible=!1,t.addEventListener("object3dset",(e=>{t.sceneEl.systems.ball.registerBall(this)}))},update:function(t){},remove:function(){},tick:function(t,e){},play:function(){}}),AFRAME.registerSystem("ball",{init:function(){var t;(t=document.createElement("a-entity")).id="ballContainer",this.el.sceneEl.appendChild(t),this.container=t.object3D,this.pool={},this.targets=[]},registerBall:function(t){var e,i,n,r;if(r=t.el.object3D)for(i=t.data,this.pool[i.name]=[],n=0;n<i.poolSize;n++)(e=r.clone()).direction=new THREE.Vector3(0,1,-1),e.lifeTime=1e3*i.lifeTime,e.name=i.name+n,e.speed=i.speed,e.time=0,e.visible=!1,this.pool[i.name].push(e)},shoot:function(t,e){var i,n=0,r=0,s=this.pool[t];if(void 0!==s){for(i=0;i<s.length;i++){if(!1===s[i].visible)return this.shootBall(s[i],e);s[i].time>r&&(n=i,r=s[i].time)}return this.shootBall(s[n],e)}},shootBall:function(t,e){return t.visible=!0,t.time=0,e.getWorldPosition(t.position),e.getWorldDirection(t.direction),t.direction.multiplyScalar(-t.speed),this.container.add(t),t},tick:(t=new THREE.Box3,e=new THREE.Vector3,i=new THREE.Box3,function(n,r){var s,a,o,l,d;for(a=0;a<this.container.children.length;a++)if((s=this.container.children[a]).visible)if(s.time+=r,s.time>=s.lifeTime)this.destroyBall(s);else for(e.copy(s.direction).multiplyScalar(r/850),s.position.add(e),t.setFromObject(s),d=0;d<this.targets.length;d++){let e=this.targets[d];if(e.getAttribute("target").active&&(l=e.object3D).visible&&(o=!1,l.boundingBox?o=l.boundingBox.intersectsBox(t):(i.setFromObject(l),o=i.intersectsBox(t)),o)){this.destroyBall(s),e.components.target.onballHit(s),e.emit("hit",null);break}}}),destroyBall:function(t){t.visible=!1}})},28:()=>{AFRAME.registerComponent("leaderboard",{schema:{},init:function(){},update:function(){},remove:function(){},tick:function(t,e){}})},597:()=>{},968:()=>{AFRAME.registerComponent("score",{schema:{},init:function(){},update:function(){},remove:function(){},tick:function(t,e){}})},134:()=>{AFRAME.registerComponent("shooter",{schema:{activeBall:{type:"string",default:"normal"},ballTypes:{type:"array",default:["normal"]},cycle:{default:!1},isPlaying:{default:!1},shootingDelay:{default:1e3},lastShootTime:{default:0}},init:function(){this.el.addEventListener("shoot",this.onShoot.bind(this)),this.ballSystem=this.el.sceneEl.systems.ball},onShoot:function(){this.ballSystem.shoot(this.data.activeBall,this.el.object3D)},tick:function(t,e){var i=this.data,n=this.el;this.isPlaying=n.sceneEl.systems.state.state.isPlaying,t-i.lastShootTime>=i.shootingDelay&&this.isPlaying&&(i.lastShootTime=t,n.emit("shoot"))},play:function(){}})},383:()=>{AFRAME.registerState({initialState:{isGameOver:!1,isPlaying:!1,leaderboard:[],leaderboardActive:!1,life:3,menuActive:!0,score:{catch:0,highestStreak:0,score:0,streak:0},shooter:{direction:"0 1 0",speed:2}},handlers:{startgame:t=>{console.log("Entering Playing State"),t.isPlaying=!0,t.menuActive=!1,t.leaderboardActive=!1,t.life=3,function(t){t.score.catch=0,t.score.highestStreak=0,t.score.score=0,t.score.streak=0}(t)},showleaderboard:t=>{t.menuActive=!0,t.leaderboardActive=!0}},computeState:t=>{t.isPlaying=!t.isGameOver&&!t.menuActive&&!t.leaderboardActive}})},775:(t,e,i)=>{var n={"./ball.js":22,"./leaderboard.js":28,"./play-sound.js":597,"./score.js":968,"./shooter.js":134};function r(t){var e=s(t);return i(e)}function s(t){if(!i.o(n,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return n[t]}r.keys=function(){return Object.keys(n)},r.resolve=s,t.exports=r,r.id=775}},i={};function n(t){if(i[t])return i[t].exports;var r=i[t]={exports:{}};return e[t].call(r.exports,r,r.exports,n),r.exports}n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n(972),n(238),n(571),n(479),n(596),n(187),n(383),(t=n(775)).keys().forEach(t)})();