'use strict';
(() => {
  var isOpen = true;
  var $slideBtn = document.getElementsByClassName('slideBtn')[0];
  var $content = document.getElementsByClassName('myspecialclass')[0];
  var slider = new mhui.widgets.Slider($content);
  $slideBtn.addEventListener('click', () => {
    slider.toggle();
  });
})();
