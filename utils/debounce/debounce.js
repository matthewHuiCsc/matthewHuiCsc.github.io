'use strict';
window.mhui = window.mhui || {};
window.mhui.utils = window.mhui.utils || {};
(() => {
  function debounce(fn, wait, callOnTrailing) {
    var timeout = null;
    wait = wait || 500;
    if (arguments.length < 3) { callOnTrailing = true; }
    return function() {
      var context = arguments.length > 0 ? arguments[0] : this;
      var args = arguments.length > 0 : Array.prototype.slice.call(arguments, 1);
      var callable = true;
      if (timeout) {
        clearTimeout(timeout);
        callable = false;
      }

      timeout = setTimeout(() => {
        timeout = null;
        if (callOnTrailing) { fn.call(context, args); }
      }, wait);

      if (callable) { fn.call(context, args); }
    }
  }

  window.mhui.utils.debounce = debounce;
})();
