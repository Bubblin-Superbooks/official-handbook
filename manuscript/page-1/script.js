(function (d, w) {
  var canvas = d.getElementById('main-canvas')
  var ctx = canvas.getContext('2d')
  var width = canvas.width = w.innerWidth || d.documentElement.clientWidth || d.getElementsByTagName('body')[0].clientWidth
  var height = canvas.height = w.innerHeight || d.documentElement.clientHeight || d.getElementsByTagName('body')[0].clientHeight

  var starCanvas = d.getElementById('star-canvas')
  var ctx2 = starCanvas.getContext('2d')
  starCanvas.width = w.innerWidth || d.documentElement.clientWidth || d.getElementsByTagName('body')[0].clientWidth
  starCanvas.height = w.innerHeight || d.documentElement.clientHeight || d.getElementsByTagName('body')[0].clientHeight
  var rocket = d.querySelector('.rocket')
  var showers = []
  var stars = []
  var moving = !1
  var hasMoved = !1
  var timeout
  var colors = ['#EAEAFE', '#16FAE7', '#CF267E ', '#FED705', '#A33EEC', '#F578DF']
  var gravity = 0.05
  var particlesDensity = 7

  var cursorPos = { x: width / 2, y: height - 200 }

  canvas.addEventListener('mousemove', mousemove)
  canvas.addEventListener('touchmove', touchmove)

  function mousemove (e) {
    hasMoved = !0
    if (hasMoved) rocket.classList.remove('shadow')
    mouseHasStopped()
    cursorPos = {
      x: e.offsetX,
      y: e.offsetY
    }
  }

  function touchmove (e) {
    hasMoved = !0
    if (hasMoved) rocket.classList.remove('shadow')
    mouseHasStopped()
    cursorPos = {
      x: e.targetTouches[0].offsetX,
      y: e.targetTouches[0].offsetY
    }
  }

  w.addEventListener('resize', resize)

  function resize () {
    width = canvas.width = w.innerWidth || d.documentElement.clientWidth || d.getElementsByTagName('body')[0].clientWidth
    height = canvas.height = w.innerHeight || d.documentElement.clientHeight || d.getElementsByTagName('body')[0].clientHeight
    starCanvas.width = w.innerWidth || d.documentElement.clientWidth || d.getElementsByTagName('body')[0].clientWidth
    starCanvas.height = w.innerHeight || d.documentElement.clientHeight || d.getElementsByTagName('body')[0].clientHeight
    makeStars.createStars()
  }

  function mouseHasStopped () {
    clearTimeout(timeout)
    moving = !0
    timeout = setTimeout(function () {
      moving = !1
    }, 100)
  }

  function random (min, max) {
    if (max === null) {
      max = min
      min = 0
    }
    return Math.random() * (max - min) + min
  }

  var makeParticles = (function () {
    function Particle (x, y, vx, vy, size, color, life) {
      var _this = this

      this.x = x
      this.y = y
      this.vx = vx
      this.vy = vy
      this.size = size
      this.color = color
      this.life = life
      this.opacity = 1
      this.update = function () {
        _this.opacity -= _this.opacity / (life / 0.1)
        _this.size -= _this.size / (life / 0.1)
        if (_this.size < 0) _this.size = 0
        _this.life -= 0.1
        _this.vy += gravity
        _this.x += _this.vx
        _this.y += _this.vy
        _this.draw()
      }
      this.draw = function () {
        ctx.beginPath()
        ctx.globalAlpha = _this.opacity
        ctx.fillStyle = _this.color
        ctx.arc(_this.x, _this.y, _this.size, 0, Math.PI * 2, false)
        ctx.fill()
        ctx.closePath()
      }
      this.remove = function () {
        return _this.life <= 0
      }
    }

    function Shower (x, y) {
      this.particles = []

      this.initParticles = function () {
        for (var i = 1; i <= particlesDensity; i++) {
          var vx = -2 + random(0, 4)
          var vy = random(0, 2)
          var size = random(1, 5)
          var life = random(7, 9)
          var color = colors[Math.floor(Math.random() * colors.length)]
          var p = new Particle(x, y, vx, vy, size, color, life)
          this.particles.push(p)
        }
      }

      if (moving) this.initParticles()

      this.explode = function () {
        for (var i = 0; i < this.particles.length; i++) {
          this.particles[i].update()

          if (this.particles[i].remove() === true) {
            this.particles.splice(i, 1)
          }
        }
      }
    }

    function animate () {
      ctx.clearRect(0, 0, width, height)
      var n = new Shower(cursorPos.x, cursorPos.y)
      showers.push(n)

      for (var i = 0; i < showers.length; i++) {
        showers[i].explode()
      }

      w.requestAnimationFrame(animate)
    }

    return {
      init: function init () {
        animate()
      }
    }
  }())

  var rotateCursor = (function () {
    var lastCursorPos = { x: 0, y: 0 }
    var angle = 0
    var cursor = d.getElementById('cursor')

    function updateCursor () {
      var delta = {
        x: lastCursorPos.x - cursorPos.x,
        y: lastCursorPos.y - cursorPos.y
      }
      if (Math.abs(delta.x) < 10 && Math.abs(delta.y) < 10) return
      angle = Math.atan2(delta.y, delta.x) * 180 / Math.PI

                        // set cursor css
      if (moving) {
        cursor.style.transform = 'translate(' + cursorPos.x + 'px, ' + cursorPos.y + 'px) rotate(' + (angle - 90) + 'deg) '
      } else {
        cursor.style.transform = 'translate(' + cursorPos.x + 'px, ' + cursorPos.y + 'px)'
      }

      lastCursorPos = cursorPos
    }

    function render () {
      updateCursor()
      requestAnimationFrame(render)
    }

    return {
      init: function init () {
        render()
      }
    }
  }())

  var makeStars = (function () {
    function Star (x, y, size, opacity) {
      var _this2 = this

      this.x = x
      this.y = y
      this.size = size
      this.opacity = opacity
      this.addOpacity = 0.005
      this.update = function () {
        if (_this2.opacity < 0.1) {
          _this2.addOpacity = -_this2.addOpacity
        }
        if (_this2.opacity > 0.8) {
          _this2.addOpacity = -_this2.addOpacity
        }
        _this2.opacity -= _this2.addOpacity
        _this2.draw()
      }
      this.draw = function () {
        ctx2.beginPath()
        ctx2.globalAlpha = _this2.opacity
        ctx2.fillStyle = '#ffffff'
        ctx2.arc(_this2.x, _this2.y, _this2.size, 0, Math.PI * 2, false)
        ctx2.fill()
        ctx2.closePath()
      }
    }

    var _createStars = function _createStars () {
      stars = []
      for (var i = 1; i <= 150; i++) {
        var x = random(0, width)
        var y = random(0, height)
        var size = random(0.1, 1.5)
        var opacity = random(0.1, 0.8)
        var s = new Star(x, y, size, opacity)
        stars.push(s)
      }
    }

    function animate () {
      ctx2.clearRect(0, 0, width, height)
      for (var i = 0; i < stars.length; i++) {
        stars[i].update()
      }
      w.requestAnimationFrame(animate)
    }

    return {
      init: function init () {
        _createStars()
        animate()
      },
      createStars: function createStars () {
        _createStars()
      }
    }
  }())

        // d.addEventListener("DOMContentLoaded", function() {
  rotateCursor.init()
  makeParticles.init()
  makeStars.init()
        // })
})(document, window)
