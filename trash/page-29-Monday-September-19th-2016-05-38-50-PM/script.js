function curvedText(time) {
  var tl = new TimelineMax({
    repeat: -1
  });
  var text = document.querySelector('svg textpath'),
    path = document.querySelector('svg defs path');
  var from = {
    transformOrigin: 'center center',
    rotation: 0
  };
  var to = {
    rotation: 360,
    ease: Linear.easeInOut
  };
  tl.fromTo([text, path], time, from, to);
  return tl;
}
curvedText(20);