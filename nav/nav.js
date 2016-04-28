'use strict';

(() => {

  var Nav = function(fabElement, menuElement) {
    this.fabElement = fabElement;
    this.menuElement = menuElement;
    this.close();

    this.fabElement.addEventListener('click', this.toggle.bind(this));
  }

  Nav.prototype.toggle = function() {
    this.menuElement.classList.toggle('open');
    this.fabElement.classList.toggle('open-below');
  }

  Nav.prototype.open = function() {
    this.menuElement.classList.add('open');
    this.fabElement.classList.add('open-below');
  }

  Nav.prototype.close = function() {
    this.menuElement.classList.remove('open');
    this.fabElement.classList.remove('open-below');
  }

  var fabElement = document.getElementsByClassName('nav-btn')[0];
  var menuElement = document.getElementsByClassName('nav-menu')[0];
  var nav = new Nav(fabElement, menuElement);
  nav.close();
})();
