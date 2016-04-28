'use strict';
window.mhui = window.mhui || {};
window.mhui.widgets = window.mhui.widgets || {};

(() => {
  var Slider = function(contentElement) {
    this.contentElement = contentElement;

    this.contentElement.classList.add('slider');
    this.isOpen = !this.contentElement.classList.contains('closed');
  }

  /* TODO consider promisifying since these uses animations */
  Slider.prototype.open = function() {
    this.isOpen = true;
    this.contentElement.classList.remove('closed');
  }

  /* TODO consider promisifying since these uses animations */
  Slider.prototype.close = function() {
    this.isOpen = false;
    this.contentElement.classList.add('closed');
  }

  /* TODO consider promisifying since these uses animations */
  Slider.prototype.toggle = function(toggle) {
    if (arguments.length > 0) { this.isOpen = toggle; }
    else { this.isOpen = !this.isOpen }
    if (this.isOpen ) {
      this.open();
    } else {
      this.close();
    }
  }

  window.mhui.widgets.Slider = Slider;
})();
