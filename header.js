'use strict';
((namespace) => {
  var Header = function(header) {
    this.header = header;
  }

  Header.prototype.setToHeaderPageMode = function() {
    this.header.classList.add('header-mode');
    this.header.classList.remove('nav-mode');
  }

  Header.prototype.setToStaticMenuMode = function() {
    this.header.classList.remove('header-mode');
    this.header.classList.add('nav-mode');
  }

  Header.prototype.getHeight = function() {
    return this.header.getBoundingClientRect().height;
  }
  namespace.Header = Header;
})(mhui.portfolio);
