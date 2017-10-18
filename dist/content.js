webpackJsonp([1],[
/* 0 */
/***/ (function(module, exports) {

var webpack = document.createElement("script");
webpack.src = chrome.extension.getURL("vendor.js");
(document.head || document.documentElement).appendChild(webpack);
webpack.onload = () => {
    var s = document.createElement("script");
    s.src = chrome.extension.getURL("script.js");
    (document.head || document.documentElement).appendChild(s);
    s.onload = () => {
        var url = chrome.runtime.getURL("icons");
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent("assetsURLEvent", true, true, url);
        document.dispatchEvent(evt);
    };
};


/***/ })
],[0]);