(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
!function(e){"use strict";var t=function(){return{escape:function(e){return e.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1")},parseExtension:t,mimeType:function(e){var n=t(e).toLowerCase();return(r="application/font-woff",{woff:r,woff2:r,ttf:"application/font-truetype",eot:"application/vnd.ms-fontobject",png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",tiff:"image/tiff",svg:"image/svg+xml"})[n]||"";var r},dataAsUrl:function(e,t){return"data:"+t+";base64,"+e},isDataUrl:function(e){return-1!==e.search(/^(data:)/)},canvasToBlob:function(e){return e.toBlob?new Promise(function(t){e.toBlob(t)}):function(e){return new Promise(function(t){for(var n=window.atob(e.toDataURL().split(",")[1]),r=n.length,o=new Uint8Array(r),i=0;i<r;i++)o[i]=n.charCodeAt(i);t(new Blob([o],{type:"image/png"}))})}(e)},resolveUrl:function(e,t){var n=document.implementation.createHTMLDocument(),r=n.createElement("base");n.head.appendChild(r);var o=n.createElement("a");return n.body.appendChild(o),r.href=t,o.href=e,o.href},getAndEncode:function(e){var t=3e4;u.impl.options.cacheBust&&(e+=(/\?/.test(e)?"&":"?")+(new Date).getTime());return new Promise(function(n){var r,o=new XMLHttpRequest;if(o.onreadystatechange=function(){if(4!==o.readyState)return;if(200!==o.status)return void(r?n(r):c("cannot fetch resource: "+e+", status: "+o.status));var t=new FileReader;t.onloadend=function(){var e=t.result.split(/,/)[1];n(e)},t.readAsDataURL(o.response)},o.ontimeout=function(){r?n(r):c("timeout of "+t+"ms occured while fetching resource: "+e)},o.responseType="blob",o.timeout=t,o.open("GET",e,!0),o.send(),u.impl.options.imagePlaceholder){var i=u.impl.options.imagePlaceholder.split(/,/);i&&i[1]&&(r=i[1])}function c(e){console.error(e),n("")}})},uid:(e=0,function(){return"u"+("0000"+(Math.random()*Math.pow(36,4)<<0).toString(36)).slice(-4)+e++}),delay:function(e){return function(t){return new Promise(function(n){setTimeout(function(){n(t)},e)})}},asArray:function(e){for(var t=[],n=e.length,r=0;r<n;r++)t.push(e[r]);return t},escapeXhtml:function(e){return e.replace(/#/g,"%23").replace(/\n/g,"%0A")},makeImage:function(e){return new Promise(function(t,n){var r=new Image;r.onload=function(){t(r)},r.onerror=n,r.src=e})},width:function(e){var t=n(e,"border-left-width"),r=n(e,"border-right-width");return e.scrollWidth+t+r},height:function(e){var t=n(e,"border-top-width"),r=n(e,"border-bottom-width");return e.scrollHeight+t+r}};var e;function t(e){var t=/\.([^\.\/]*?)$/g.exec(e);return t?t[1]:""}function n(e,t){var n=window.getComputedStyle(e).getPropertyValue(t);return parseFloat(n.replace("px",""))}}(),n=function(){var e=/url\(['"]?([^'"]+?)['"]?\)/g;return{inlineAll:function(e,t,i){return n(e)?Promise.resolve(e).then(r).then(function(n){var r=Promise.resolve(e);return n.forEach(function(e){r=r.then(function(n){return o(n,e,t,i)})}),r}):Promise.resolve(e)},shouldProcess:n,impl:{readUrls:r,inline:o}};function n(t){return-1!==t.search(e)}function r(n){for(var r,o=[];null!==(r=e.exec(n));)o.push(r[1]);return o.filter(function(e){return!t.isDataUrl(e)})}function o(e,n,r,o){return Promise.resolve(n).then(function(e){return r?t.resolveUrl(e,r):e}).then(o||t.getAndEncode).then(function(e){return t.dataAsUrl(e,t.mimeType(n))}).then(function(r){return e.replace(function(e){return new RegExp("(url\\(['\"]?)("+t.escape(e)+")(['\"]?\\))","g")}(n),"$1"+r+"$3")})}}(),r=function(){return{resolveAll:function(){return e(document).then(function(e){return Promise.all(e.map(function(e){return e.resolve()}))}).then(function(e){return e.join("\n")})},impl:{readAll:e}};function e(){return Promise.resolve(t.asArray(document.styleSheets)).then(function(e){var n=[];return e.forEach(function(e){try{t.asArray(e.cssRules||[]).forEach(n.push.bind(n))}catch(t){console.log("Error while reading CSS rules from "+e.href,t.toString())}}),n}).then(function(e){return e.filter(function(e){return e.type===CSSRule.FONT_FACE_RULE}).filter(function(e){return n.shouldProcess(e.style.getPropertyValue("src"))})}).then(function(t){return t.map(e)});function e(e){return{resolve:function(){var t=(e.parentStyleSheet||{}).href;return n.inlineAll(e.cssText,t)},src:function(){return e.style.getPropertyValue("src")}}}}}(),o=function(){return{inlineAll:function r(o){if(!(o instanceof Element))return Promise.resolve(o);return function(e){var t=e.style.getPropertyValue("background");return t?n.inlineAll(t).then(function(t){e.style.setProperty("background",t,e.style.getPropertyPriority("background"))}).then(function(){return e}):Promise.resolve(e)}(o).then(function(){return o instanceof HTMLImageElement?e(o).inline():Promise.all(t.asArray(o.childNodes).map(function(e){return r(e)}))})},impl:{newImage:e}};function e(e){return{inline:function(n){return t.isDataUrl(e.src)?Promise.resolve():Promise.resolve(e.src).then(n||t.getAndEncode).then(function(n){return t.dataAsUrl(n,t.mimeType(e.src))}).then(function(t){return new Promise(function(n,r){e.onload=n,e.onerror=r,e.src=t})})}}}}(),i={imagePlaceholder:void 0,cacheBust:!1},u={toSvg:c,toPng:function(e,t){return a(e,t||{}).then(function(e){return e.toDataURL()})},toJpeg:function(e,t){return a(e,t=t||{}).then(function(e){return e.toDataURL("image/jpeg",t.quality||1)})},toBlob:function(e,n){return a(e,n||{}).then(t.canvasToBlob)},toPixelData:function(e,n){return a(e,n||{}).then(function(n){return n.getContext("2d").getImageData(0,0,t.width(e),t.height(e)).data})},impl:{fontFaces:r,images:o,util:t,inliner:n,options:{}}};function c(e,n){return function(e){void 0===e.imagePlaceholder?u.impl.options.imagePlaceholder=i.imagePlaceholder:u.impl.options.imagePlaceholder=e.imagePlaceholder;void 0===e.cacheBust?u.impl.options.cacheBust=i.cacheBust:u.impl.options.cacheBust=e.cacheBust}(n=n||{}),Promise.resolve(e).then(function(e){return function(e,n,r){if(!r&&n&&!n(e))return Promise.resolve();return Promise.resolve(e).then(function(e){return e instanceof HTMLCanvasElement?t.makeImage(e.toDataURL()):e.cloneNode(!1)}).then(function(r){return function(e,n,r){var o=e.childNodes;return 0===o.length?Promise.resolve(n):function(e,t,n){var r=Promise.resolve();return t.forEach(function(t){r=r.then(function(){return s(t,n)}).then(function(t){t&&e.appendChild(t)})}),r}(n,t.asArray(o),r).then(function(){return n})}(e,r,n)}).then(function(n){return function(e,n){return n instanceof Element?Promise.resolve().then(function(){var r,o;r=window.getComputedStyle(e),o=n.style,r.cssText?o.cssText=r.cssText:function(e,n){t.asArray(e).forEach(function(t){n.setProperty(t,e.getPropertyValue(t),e.getPropertyPriority(t))})}(r,o)}).then(function(){[":before",":after"].forEach(function(r){!function(r){var o=window.getComputedStyle(e,r),i=o.getPropertyValue("content");if(""!==i&&"none"!==i){var u=t.uid();n.className=n.className+" "+u;var c=document.createElement("style");c.appendChild(function(e,n,r){var o="."+e+":"+n,i=r.cssText?function(e){var t=e.getPropertyValue("content");return e.cssText+" content: "+t+";"}(r):function(e){return t.asArray(e).map(function(t){return t+": "+e.getPropertyValue(t)+(e.getPropertyPriority(t)?" !important":"")}).join("; ")+";"}(r);return document.createTextNode(o+"{"+i+"}")}(u,r,o)),n.appendChild(c)}}(r)})}).then(function(){e instanceof HTMLTextAreaElement&&(n.innerHTML=e.value),e instanceof HTMLInputElement&&n.setAttribute("value",e.value)}).then(function(){n instanceof SVGElement&&(n.setAttribute("xmlns","http://www.w3.org/2000/svg"),n instanceof SVGRectElement&&["width","height"].forEach(function(e){var t=n.getAttribute(e);t&&n.style.setProperty(e,t)}))}).then(function(){return n}):n}(e,n)})}(e,n.filter,!0)}).then(l).then(f).then(function(e){n.bgcolor&&(e.style.backgroundColor=n.bgcolor);n.width&&(e.style.width=n.width+"px");n.height&&(e.style.height=n.height+"px");n.style&&Object.keys(n.style).forEach(function(t){e.style[t]=n.style[t]});return e}).then(function(r){return function(e,n,r){return Promise.resolve(e).then(function(e){return e.setAttribute("xmlns","http://www.w3.org/1999/xhtml"),(new XMLSerializer).serializeToString(e)}).then(t.escapeXhtml).then(function(e){return'<foreignObject x="0" y="0" width="100%" height="100%">'+e+"</foreignObject>"}).then(function(e){return'<svg xmlns="http://www.w3.org/2000/svg" width="'+n+'" height="'+r+'">'+e+"</svg>"}).then(function(e){return"data:image/svg+xml;charset=utf-8,"+e})}(r,n.width||t.width(e),n.height||t.height(e))})}function a(e,n){return c(e,n).then(t.makeImage).then(t.delay(100)).then(function(r){var o=function(e){var r=document.createElement("canvas");if(r.width=n.width||t.width(e),r.height=n.height||t.height(e),n.bgcolor){var o=r.getContext("2d");o.fillStyle=n.bgcolor,o.fillRect(0,0,r.width,r.height)}return r}(e);return o.getContext("2d").drawImage(r,0,0),o})}function s(e,n,r){if(!r&&n&&!n(e))return Promise.resolve();return Promise.resolve(e).then(o).then(function(t){return i(e,t,n)}).then(function(t){return u(e,t)});function o(e){return e instanceof HTMLCanvasElement?t.makeImage(e.toDataURL()):e.cloneNode(!1)}function i(e,n,r){var o=e.childNodes;return 0===o.length?Promise.resolve(n):function(e,t,n){var r=Promise.resolve();return t.forEach(function(t){r=r.then(function(){return s(t,n)}).then(function(t){t&&e.appendChild(t)})}),r}(n,t.asArray(o),r).then(function(){return n});function i(e,t,n){var r=Promise.resolve();return t.forEach(function(t){r=r.then(function(){return s(t,n)}).then(function(t){t&&e.appendChild(t)})}),r}}function u(e,n){return n instanceof Element?Promise.resolve().then(function(){!function(e,n){e.cssText?n.cssText=e.cssText:function(e,n){t.asArray(e).forEach(function(t){n.setProperty(t,e.getPropertyValue(t),e.getPropertyPriority(t))})}(e,n)}(window.getComputedStyle(e),n.style)}).then(function(){[":before",":after"].forEach(function(r){!function(r){var o=window.getComputedStyle(e,r),i=o.getPropertyValue("content");if(""===i||"none"===i)return;var u=t.uid();n.className=n.className+" "+u;var c=document.createElement("style");c.appendChild(function(e,n,r){var o="."+e+":"+n,i=r.cssText?function(e){var t=e.getPropertyValue("content");return e.cssText+" content: "+t+";"}(r):function(e){return t.asArray(e).map(function(t){return t+": "+e.getPropertyValue(t)+(e.getPropertyPriority(t)?" !important":"")}).join("; ")+";"}(r);return document.createTextNode(o+"{"+i+"}")}(u,r,o)),n.appendChild(c)}(r)})}).then(function(){e instanceof HTMLTextAreaElement&&(n.innerHTML=e.value);e instanceof HTMLInputElement&&n.setAttribute("value",e.value)}).then(function(){if(!(n instanceof SVGElement))return;if(n.setAttribute("xmlns","http://www.w3.org/2000/svg"),!(n instanceof SVGRectElement))return;["width","height"].forEach(function(e){var t=n.getAttribute(e);t&&n.style.setProperty(e,t)})}).then(function(){return n}):n;function r(){function r(e,n){if(e.cssText)n.cssText=e.cssText;else r(e,n);function r(e,n){t.asArray(e).forEach(function(t){n.setProperty(t,e.getPropertyValue(t),e.getPropertyPriority(t))})}}r(window.getComputedStyle(e),n.style)}function o(){function r(r){var o=window.getComputedStyle(e,r),i=o.getPropertyValue("content");if(i===""||i==="none")return;var u=t.uid();n.className=n.className+" "+u;var c=document.createElement("style");function a(e,n,r){var o="."+e+":"+n,i=r.cssText?u(r):c(r);return document.createTextNode(o+"{"+i+"}");function u(e){var t=e.getPropertyValue("content");return e.cssText+" content: "+t+";"}function c(e){return t.asArray(e).map(n).join("; ")+";";function n(t){return t+": "+e.getPropertyValue(t)+(e.getPropertyPriority(t)?" !important":"")}}}c.appendChild(a(u,r,o)),n.appendChild(c)}[":before",":after"].forEach(function(e){r(e)})}function i(){if(e instanceof HTMLTextAreaElement)n.innerHTML=e.value;if(e instanceof HTMLInputElement)n.setAttribute("value",e.value)}function u(){if(!(n instanceof SVGElement))return;if(n.setAttribute("xmlns","http://www.w3.org/2000/svg"),!(n instanceof SVGRectElement))return;["width","height"].forEach(function(e){var t=n.getAttribute(e);if(!t)return;n.style.setProperty(e,t)})}}}function l(e){return r.resolveAll().then(function(t){var n=document.createElement("style");return e.appendChild(n),n.appendChild(document.createTextNode(t)),e})}function f(e){return o.inlineAll(e).then(function(){return e})}"undefined"!=typeof module?module.exports=u:e.domtoimage=u}(this);

},{}],2:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _domToImage=_interopRequireDefault(require("dom-to-image"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function asyncGeneratorStep(e,r,t,n,o,a,u){try{var c=e[a](u),s=c.value}catch(e){return void t(e)}c.done?r(s):Promise.resolve(s).then(n,o)}function _asyncToGenerator(e){return function(){var r=this,t=arguments;return new Promise(function(n,o){var a=e.apply(r,t);function u(e){asyncGeneratorStep(a,n,o,u,c,"next",e)}function c(e){asyncGeneratorStep(a,n,o,u,c,"throw",e)}u(void 0)})}}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}var DOMToImage=function e(r){var t=this;_classCallCheck(this,e),this.render=_asyncToGenerator(regeneratorRuntime.mark(function e(){var r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,_domToImage.default.toPng(t.$card);case 3:return r=e.sent,(new Image).src=r,e.abrupt("return",r);case 9:e.prev=9,e.t0=e.catch(0),console.error("oops, something went wrong!",e.t0);case 12:case"end":return e.stop()}},e,null,[[0,9]])})),this.$card=document.querySelector(r)},_default=DOMToImage;exports.default=_default;

},{"dom-to-image":1}]},{},[2]);