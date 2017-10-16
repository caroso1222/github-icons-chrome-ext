// // Listen for messages
// chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
//   // If the received message has the expected format...
//   if (msg.text === "inject_code") {
//     injectScript("script_delay.js");
//   }
// });

// injectScript("script.js");

// function injectScript(script) {
//   var s = document.createElement("script");
//   s.src = chrome.extension.getURL(script);
//   s.onload = function() {
//     setTimeout(function() {
      
//       var evt=document.createEvent("CustomEvent");
//       var url=chrome.runtime.getURL("icons");
//       evt.initCustomEvent("yourCustomEvent", true, true, 'url');
//       document.dispatchEvent(evt);
//     }, 1000);
//     //this.parentNode.removeChild(this);
//   };
//   (document.head || document.documentElement).appendChild(s);


// }


var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');
(document.head || document.documentElement).appendChild(s);

s.onload = function(){

  var url=chrome.runtime.getURL("icons");

  var evt=document.createEvent("CustomEvent");
  evt.initCustomEvent("yourCustomEvent", true, true, url);
  document.dispatchEvent(evt);
};