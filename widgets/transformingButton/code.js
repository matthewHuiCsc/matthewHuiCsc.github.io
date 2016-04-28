'use strict';
(() => {
  var isOpen = true;
  var $transformingButton = document.getElementsByClassName('transformingBtn')[0];
  var transformingButton = new mhui.widgets.TransformingButton($transformingButton);
  $transformingButton.addEventListener('click', () => {
    transformingButton.toggle();
  });
})();
