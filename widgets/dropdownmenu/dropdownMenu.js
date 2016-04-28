'use strict';
window.mhui = window.mhui || {};
window.mhui.widgets = window.mhui.widgets || {};

/**
  Dependencies: TransformingButton and Slider
**/
(() => {
  var DropdownMenu = function(dropdownMenuContainerElement) {

    this.btn = dropdownMenuContainerElement.getElementsByClassName('dropdownMenuBtn')[0];

    /* create transforming button */
    this.btn.classList.add('transformingBtn');
    this.transformingButtonObj = new mhui.widgets.TransformingButton(this.btn);

    /* create slider */
    var sliderElement = dropdownMenuContainerElement.getElementsByClassName('dropdownMenuContent')[0];
    sliderElement.parentNode.removeChild(sliderElement);
    this.sliderObj = new mhui.widgets.Slider(sliderElement);

    /* move slider element into newly created dropdown container */
    this.menuElement = document.createElement('div');
    this.menuElement.classList.add('dropdownMenuContainer');
    // this.menuElement.classList.add('closed');
    var width = this.btn.getBoundingClientRect().width;
    this.menuElement.appendChild(sliderElement);
    this.close();
    /*
      FIXME shouldn't need a set timeout like this that is in sync with the animation...
      Ideally this is done like so: "this.close().then(() => { this.btn.style.visibility = 'visible'; })"
    */
    this.btn.parentNode.appendChild(this.menuElement);

    document.addEventListener('click', (evt) => {
      /* FIXME IE does not support closest yet. Need to create a shim in the near future */
      if (Element.prototype.closest) {
        if (this.isOpen && !evt.target.closest('.dropdownMenu')) {
          this.close();
        }
      } else {
        /* FIXME this logic shouldn't exist anymore once I add in a shim for closest */
        if (this.isOpen) {
          var current = evt.target;
          var found = false;
          while(current && current != document) {
            if (current.classList.contains('dropdownMenu')) {
              found = true;
              break;
            }
            current = current.parentNode;
          }
          if (!found) {
            this.close();
          }
        }
      }

    });

    this.btn.addEventListener('click', () => {
      this.toggle();
    });
  }

  DropdownMenu.prototype.close = function() {
    this.isOpen = false;
    this.menuElement.classList.add('closed');
    this.transformingButtonObj.liquify();
    this.sliderObj.close();
  }

  DropdownMenu.prototype.open = function() {
    this.isOpen = true;
    this.menuElement.classList.remove('closed');
    this.transformingButtonObj.solidify();
    this.sliderObj.open();
  }

  DropdownMenu.prototype.toggle = function(toggle) {
    if (arguments.length > 0) { this.isOpen = toggle; }
    else { this.isOpen = !this.isOpen; }
    if (this.isOpen) {
      this.open();
    } else {
      this.close();
    }
  }

  window.mhui.widgets.DropdownMenu = DropdownMenu;
})();
