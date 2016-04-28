'use strict';
window.mhui = window.mhui || {};
window.mhui.widgets = window.mhui.widgets || {};

(() => {
  var TransformingButton = function(buttonElement) {
    this.buttonElement = buttonElement;
    this.isLiquid = this.buttonElement.classList.contains('liquid');
  }

  /* TODO consider promisifying since these uses animations */
  TransformingButton.prototype.solidify = function() {
    this.isLiquid = false;
    this.buttonElement.classList.remove('liquid');
  }

  /* TODO consider promisifying since these uses animations */
  TransformingButton.prototype.liquify = function() {
    this.isLiquid = true;
    this.buttonElement.classList.add('liquid');
  }

  /* TODO consider promisifying since these uses animations */
  TransformingButton.prototype.toggle = function(toggle) {
    if (arguments.length > 0) { this.isLiquid = toggle; }
    else { this.isLiquid = !this.isLiquid; }

    if (this.isLiquid) {
      this.liquify();
    } else {
      this.solidify();
    }
  }

  window.mhui.widgets.TransformingButton = TransformingButton;
})();
