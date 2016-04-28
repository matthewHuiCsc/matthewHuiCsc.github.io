'use strict';
(() => {
  var detectorElement = document.getElementsByClassName('detectionBox')[0];
  var detectorBoundingBox = detectorElement.getBoundingClientRect();
  var detectorTop = detectorBoundingBox.top;
  console.log('top of detectorElement: ' + detectorTop);

  var toDetectElement = document.getElementsByClassName('toDetect')[0];
  var toDetectBoundingBox = toDetectElement.getBoundingClientRect();

  var detector = new mhui.widgets.InViewportDetector(0, 0, 1, 0.5);
  var toDetectLocation = toDetectBoundingBox.top + window.scrollY;

  detector.register(toDetectElement, (element) => {
    console.log('element detected!!!');
  }, () => {
    console.log('element is no longer in view!');
  });

  var horizontalToDetectElement = document.getElementsByClassName('horizontalToDetect')[0];

  detector.register(horizontalToDetectElement, (element) => {
    console.log('HORIZONTAL_ELEMENT ENTERED1');
  }, (element) => {
    console.log('HORIZONTAL ELEMENT EXIT!');
  });
})();
