var snowPlayers = [];
makeItSnow();

if (window.PointerEvent) {
  document.body.addEventListener('pointerenter', lightUp, false);
  document.body.addEventListener('pointerleave', dim, false);
} else {
  document.body.addEventListener('mouseenter', lightUp, false);
  document.body.addEventListener('touchstart', lightUp, false);
  document.body.addEventListener('touchend', dim, false);
  document.body.addEventListener('mouseleave', dim, false);
}
document.body.addEventListener('keydown', lightUp, false);
document.body.addEventListener('keyup', dim, false);

function lightUp(e) {
  e.preventDefault();
  document.body.classList.add('huzzah');
  if (snowPlayers.length && snowPlayers[0].playbackRate < 2) {
    snowPlayers.forEach(function(item) {
      item.playbackRate = item.playbackRate * 1.05;
    });
  }
}
function dim(e) {
  e.preventDefault();
  document.body.classList.remove('huzzah');
}

function makeItSnow() {
  var snows = document.querySelectorAll('.snow');
  
  if (!snows[0].animate) {
    return false;
  }

  for (var i = 0, len = snows.length; i < len; ++i) {
    var snowball = snows[i];
    var scale = Math.random() * 0.8 + 0.2;
    var player = snowball.animate([
      { transform: 'translate3d(' + (i/len*100) + 'vw,0,0) scale(' + scale + ')', opacity: scale },
      { transform: 'translate3d(' + (i/len*100 + 10) + 'vw,100vh,0) scale(' + scale + ')', opacity: scale }
    ], {
      duration: Math.random() * 3000 + 2000,
      iterations: Infinity,
      delay: -(Math.random() * 5000)
    });
    
    snowPlayers.push(player);
  }
}