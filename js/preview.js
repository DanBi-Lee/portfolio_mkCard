(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _debouncing=_interopRequireDefault(require("./util/debouncing")),_domScale=_interopRequireDefault(require("./util/domScale"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var debouncing=new _debouncing.default,Preview=function e(){var n=this;_classCallCheck(this,e),this.init=function(){n.setScale(),n.handlingResize()},this.scale=new _domScale.default(".preview",".mk_img_dom"),this.setScale=function(){n.scale.setScale()},this.handlingResize=function(){window.addEventListener("resize",function(){return debouncing.debounce(n.setScale,200)})},window.addEventListener("load",function(){n.init()})},_default=Preview;exports.default=_default;

},{"./util/debouncing":2,"./util/domScale":3}],2:[function(require,module,exports){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var Debouncing=function e(){var t=this;_classCallCheck(this,e),this.timer=void 0,this.debounce=function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200;t.timer&&window.clearTimeout(t.timer),t.timer=setTimeout(e,i)}},_default=Debouncing;exports.default=_default;

},{}],3:[function(require,module,exports){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var DomScale=function(){function e(t,i){var n=this;_classCallCheck(this,e),this.$parent=document.querySelector(t),this.$children=document.querySelector(i),window.addEventListener("load",function(){n.setParentRatio(n.$parent),n.setChilrenRatio(n.$children)})}return _createClass(e,[{key:"setParentRatio",value:function(e){var t=e.clientWidth,i=e.clientHeight;this.parentRatio=t/i}},{key:"setChilrenRatio",value:function(e){var t=e.clientWidth,i=e.clientHeight;this.childrenRatio=t/i}},{key:"setScale",value:function(){if(this.setParentRatio(this.$parent),console.log(this.$parent.clientWidth,this.$children.clientWidth),this.parentRatio<this.childrenRatio){var e=(this.$parent.clientWidth-30)/this.$children.clientWidth;this.$children.style.transform="scale(".concat(e<1?e:1,")")}else{var t=(this.$parent.clientHeight-30)/this.$children.clientHeight;this.$children.style.transform="scale(".concat(t<1?t:1,")")}}}]),e}(),_default=DomScale;exports.default=_default;

},{}]},{},[1]);