'use strict';

((namespace) => {

  const FOCUS_CLASS = 'focused';
  /* class to look for to add onto navbar to change opacity */
  const NAV_GHOST_CLASS = 'nav-ghost';
  const NAV_LIQUID_CLASS = 'nav-liquid';

  /**
    Input: bounds = [0, 200, 250, 300] -- bounds of each sections
           scrollY starting position of the nav
  **/
  var Nav = function(navElement, scrollY) {
    if (!navElement) {
      throw new Error('Nav being called / instantiated container holding navables');
    }
    this.navElement = navElement;
    {
      let anchors = navElement.querySelectorAll('li > a');
      this.updateBounds(anchors);
      this.updateFocused(scrollY);
    }

  }

  /**
    Input: array of <a> elements. The href should match ID of section to search.
    Output: Array of objects that holds bound and related information.

    [{
      top: 55,
      pageElement: [DOMElement element],
      anchor: [DOMElement element]
    }]
  **/
  Nav.prototype.getBounds = function() {
    return this.bounds;
  }

  Nav.prototype.updateBounds = function(anchors) {
    var bounds = [];

    for (let idx = 0; idx < anchors.length; idx++) {
      let anchor = anchors[idx];
      let pageSelector = anchor.attributes.href.value;
      let pageElement = document.body.querySelector(pageSelector);

      /*
        Using element.getBoundingClientRect() gives positions relative to viewport.
        Because of that, we need to add pageYOffset to get the actual position on the page.
      */
      bounds.push({
        top: Math.round(window.pageYOffset + pageElement.getBoundingClientRect().top),
        pageElement: pageElement,
        anchor: anchor
      });
    }

    this.bounds = bounds.sort((a, b) => {return a.top > b.top;});
  }

  /**
    Updates the focused element in the navlist.
  **/
  Nav.prototype.updateFocused = function(scrollY) {
    var activeAnchor;
    for (let idx = 1; idx < this.bounds.length; idx++) {
      let start = this.bounds[idx-1];
      let end = this.bounds[idx];
      if (scrollY >= start.top && scrollY < end.top) {
        start.anchor.classList.add(FOCUS_CLASS);
        /* FIXME this needs to be elsewhere -- and the logic needs to compare hitboxes */
        // if (start.pageElement.classList.contains(NAV_GHOST_CLASS)) {
        //   this.navElement.classList.add(NAV_LIQUID_CLASS);
        // } else {
        //   this.navElement.classList.remove(NAV_LIQUID_CLASS);
        // }
      } else {
        start.anchor.classList.remove(FOCUS_CLASS);
      }
    }
    let lastBound = this.bounds[this.bounds.length-1];
    if (scrollY >= lastBound.top) {
      lastBound.anchor.classList.add(FOCUS_CLASS);
      /* FIXME this needs to be elsewhere -- and the logic needs to compare hitboxes instead */
      // if (start.pageElement.classList.contains(NAV_GHOST_CLASS)) {
      //   this.navElement.classList.add(NAV_LIQUID_CLASS);
      // } else {
      //   this.navElement.classList.remove(NAV_LIQUID_CLASS);
      // }
    } else {
      lastBound.anchor.classList.remove(FOCUS_CLASS);
    }
  }

  namespace.Nav = Nav;
})(mhui.portfolio);
