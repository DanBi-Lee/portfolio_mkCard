(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";function asyncGeneratorStep(e,t,n,r,a,o,c){try{var s=e[o](c),u=s.value}catch(e){return void n(e)}s.done?t(u):Promise.resolve(u).then(r,a)}function _asyncToGenerator(e){return function(){var t=this,n=arguments;return new Promise(function(r,a){var o=e.apply(t,n);function c(e){asyncGeneratorStep(o,r,a,c,s,"next",e)}function s(e){asyncGeneratorStep(o,r,a,c,s,"throw",e)}c(void 0)})}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.fetchImg=exports.getFontList=void 0;var key="17163984-867a8b6f54b9fd842905aca26",getFontList=function(){var e=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("./data/fontList.json");case 2:return t=e.sent,e.next=5,t.json();case 5:return n=e.sent,e.abrupt("return",n);case 7:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();exports.getFontList=getFontList;var fetchImg=function(){var e=_asyncToGenerator(regeneratorRuntime.mark(function e(t){var n,r,a,o=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=o.length>1&&void 0!==o[1]?o[1]:1,e.next=3,fetch("https://pixabay.com/api/?key=".concat(key,"&q=").concat(t,"&per_page=36&page=").concat(n));case 3:return r=e.sent,e.next=6,r.json();case 6:return a=e.sent,e.abrupt("return",a);case 8:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}();exports.fetchImg=fetchImg;

},{}]},{},[1]);
