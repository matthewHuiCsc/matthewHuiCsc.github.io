'use strict';
(() => {
    let navObj = new mhui.widgets.DropdownMenu(document.getElementsByClassName('dropdownMenu')[0]);

    var isNav = false;
    var header = new mhui.portfolio.Header(document.getElementsByClassName('whoami')[0]);
    /* This is a little brittle because I happen to know what nav will shrink into */
    var inViewDetector = new mhui.widgets.InViewportDetector(0,window.innerHeight * 0.4,0, 0.25);
    /* First page is header */
    var pageElements = document.getElementsByClassName('page');
    pageElements = Array.prototype.slice.call(pageElements, 1);
    inViewDetector.register(pageElements, (element) => {
      element.classList.add('focused');
    }, (element) => {
      element.classList.remove('focused');
    });

    Array.prototype.forEach.call(document.getElementsByClassName('navlink'), (element) => {
      element.addEventListener('click', () => {
        navObj.close();
      });
    });

    window.addEventListener('scroll', (evt) => {
      var headerThreshold = header.getHeight() * 0.80;
      var navBoundary = window.scrollY;
      if (isNav) {
        if (window.scrollY < headerThreshold) {
          isNav = false;
          header.setToHeaderPageMode();
          /* FIXME does the animations screw up the height calculations? */
          inViewDetector.calculatePositions();

        }
      } else {
        if (window.scrollY >= headerThreshold) {
          isNav = true;
          header.setToStaticMenuMode();
          /* FIXME does the animations screw up the height calculations? */
          inViewDetector.calculatePositions();
        }
      }
    });
})();
