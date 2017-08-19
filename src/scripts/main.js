'use strict';

/*(function () {
  if (typeof window.CustomEvent === "function") {
      return false;
  }

  function CustomEvent(event, params) {
      params = params || {bubbles: false, cancelable: false, detail: undefined};
      var evt = document.createEvent("CustomEvent");
      evt.initCustomEvent (event, params.bubbles, params.cancelable, params.detail);
      return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();

var myLazyLoad = new LazyLoad();*/

(function() {

  function loadJS(path){
    var theScript = document.createElement('script');
    theScript.type = 'text/javascript';
    theScript.src = path;

    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(theScript, s);
  }

  if (window.matchMedia) {
    if (window.matchMedia('(min-width: 850px)').matches) {
     loadJS('https://apis.google.com/js/platform.js');
     loadJS('/assets/js/twitter.js');
    }
  } else { //not supported, load js
    loadJS('https://apis.google.com/js/platform.js');
    loadJS('/assets/js/twitter.js');
  }
})();
