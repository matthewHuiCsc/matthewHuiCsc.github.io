'use strict';
window.mhui = window.mhui || {};
window.mhui.widgets = window.mhui.widgets || {};

(() => {

  function getElementsWithBounds(elements, onEnter, onExit) {
    if (!Array.isArray(elements)) {
      elements = [elements];
    }
    return elements.map((element) => {
      var bounds = element.getBoundingClientRect();
      return {
        element: element,
        onEnter: onEnter,
        onExit: onExit,
        topBound: window.scrollY + bounds.top,
        bottomBound: window.scrollY + bounds.top + bounds.height,
        leftBound: window.scrollX + bounds.left,
        rightBound: window.scrollX + bounds.left + bounds.width
      }
    });
  }

  function isBetweenOrEqual(value, low, high) {
    return value >= low && value <= high;
  }

  function isBoundsOverlapping(boundA, boundB) {
    return (
        (isBetweenOrEqual(boundA.topBound, boundB.topBound, boundB.bottomBound) ||
        isBetweenOrEqual(boundA.bottomBound, boundB.topBound, boundB.bottomBound)) &&
        (isBetweenOrEqual(boundA.leftBound, boundB.leftBound, boundB.rightBound) ||
        isBetweenOrEqual(boundA.rightBound, boundB.leftBound, boundB.rightBound)));
  }

  var InViewportDetector = function(x, y, widthRatio, heightRatio) {
    this.x = x || 0;
    this.y = y || 0;
    this.widthRatio = widthRatio || 1;
    this.heightRatio = heightRatio || 1;

    this.toDetectElementsList = [];
    this.toDetectBoundsList = [];
    this.inViewList = [];
    this.notInViewList = [];

    this.topBound = this.bottomBound = this.leftBound = this.rightBound = 0;
    this.calculatePositions();
    window.addEventListener('resize', () => {
      /* FIXME will want to debounce, only the last resize is important */
      this.calculatePositions();
    });

    /* FIXME need to debounce */
    window.addEventListener('scroll', () => {
      this.detect();
    });
  }

  InViewportDetector.prototype.detect = function() {
    // console.log('this.toDetectBoundsList.length is: ' + this.toDetectBoundsList.length);
    var topBound = window.scrollY + this.topBound;
    var bottomBound = window.scrollY + this.bottomBound;

    var leftBound = window.scrollX + this.leftBound;
    var rightBound = window.scrollX + this.rightBound;

    var windowBound = {
      topBound: topBound,
      bottomBound: bottomBound,
      leftBound: leftBound,
      rightBound: rightBound
    }
    /*
      This code will see which elements might now be in view, call its handler.
      Then after the loop, it will replace notInViewList with the remainder of items not in view
    */
    var tmp = [];
    for (let idx = 0; idx < this.notInViewList.length; idx++) {
      let toDetectBound = this.notInViewList[idx];

      if (isBoundsOverlapping(toDetectBound, windowBound)||
          isBoundsOverlapping(windowBound, toDetectBound)) {
        this.inViewList.push(toDetectBound);
        if (toDetectBound.onEnter) {
          toDetectBound.onEnter(toDetectBound.element);
        }
      } else {
        tmp.push(toDetectBound);
      }
    }
    this.notInViewList = tmp;

    /*
      This code will see which elements are still in view, update the lists appropriate.
      If an item has just exited, it will call onExit when applicable
    */
    tmp = [];
    for (let idx = 0; idx < this.inViewList.length; idx++) {
      let toDetectBound = this.inViewList[idx];
      if (isBoundsOverlapping(toDetectBound, windowBound) ||
          isBoundsOverlapping(windowBound, toDetectBound)) {
        tmp.push(toDetectBound);
      } else {
        if (toDetectBound.onExit) {
          toDetectBound.onExit(toDetectBound.element);
        }
        this.notInViewList.push(toDetectBound);
      }
    }
    this.inViewList = tmp;
  }

  InViewportDetector.prototype.calculatePositions = function() {
    this.topBound = this.y;
    this.bottomBound = this.topBound + window.innerHeight * this.heightRatio;
    this.leftBound = this.x;
    this.rightBound = this.leftBound + window.innerWidth * this.widthRatio;

    this.toDetectBoundsList = getElementsWithBounds(this.toDetectElementsList);
  }

  InViewportDetector.prototype.register = function(elements, onEnter, onExit) {
    if (!Array.isArray(elements)) {
      elements = [elements];
    }
    var elementsWithBounds = getElementsWithBounds(elements, onEnter, onExit);
    this.toDetectElementsList = this.toDetectElementsList.concat(elements);
    this.notInViewList = this.notInViewList.concat(elementsWithBounds);
    this.toDetectBoundsList = this.toDetectBoundsList.concat(elementsWithBounds);
  }

  InViewportDetector.prototype.unregister = function(elements) {
    if (!Array.isArray(elements)) {
      elements = [elements];
    }

    this.toDetectElementsList = this.toDetectElementsList.map((element) => {
      return elements.indexOf(element) != -1;
    });

    this.toDetectBoundsList = this.toDetectBoundsList.map((element) => {
      return elements.indexOf(element) != -1;
    });
  }

  window.mhui.widgets.InViewportDetector = InViewportDetector;
})();
