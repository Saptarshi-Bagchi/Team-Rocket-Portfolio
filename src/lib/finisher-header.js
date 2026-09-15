"use strict";
var _cc = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

(function (window) {
  // Converts a skew angle (degrees) into a pixel offset needed to compensate for it
  function skewOffset(angleDeg, width) {
    var slope = Math.tan(0.017453 * Math.abs(angleDeg)); // 0.017453 ≈ PI/180
    return Math.ceil(width * slope);
  }

  // Parses a hex color string ("#RGB" or "#RRGGBB") into an {r, g, b} object
  function hexToRgb(hex) {
    var parts;
    if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      return { r: 0, g: 0, b: 0 };
    }
    parts = hex.substring(1).split("");
    if (parts.length === 3) {
      parts = [parts[0], parts[0], parts[1], parts[1], parts[2], parts[2]];
    }
    var num = "0x" + parts.join("");
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: 255 & num,
    };
  }

  // A single drifting/pulsing particle
  var Particle = (function () {
    function Particle(colorHex, cornerIndex, options) {
      _classCallCheck(this, Particle);
      this.o = options;
      this.r = hexToRgb(colorHex);
      this.d = this.randomDirection(); // pulse direction: 1 or -1
      this.h = this.randomShape(); // shape: 'c' circle, 't' triangle, 's' square
      this.s = Math.abs(this.randomInRange(this.o.size)); // current size
      this.setStartPosition(cornerIndex);
      this.vx = this.randomInRange(this.o.speed.x) * this.randomDirection();
      this.vy = this.randomInRange(this.o.speed.y) * this.randomDirection();
    }

    return _cc(Particle, [
      {
        // Places the particle near one of the 4 quadrants of the canvas, based on cornerIndex (0-3)
        key: "setStartPosition",
        value: function (cornerIndex) {
          var quadrant = this.getQuadrantSize();
          if (cornerIndex === 3) {
            this.x = quadrant.x + quadrant.halfWidth;
            this.y = quadrant.y;
          } else if (cornerIndex === 2) {
            this.x = quadrant.x;
            this.y = quadrant.y + quadrant.halfHeight;
          } else if (cornerIndex === 1) {
            this.x = quadrant.x + quadrant.halfWidth;
            this.y = quadrant.y + quadrant.halfHeight;
          } else {
            this.x = quadrant.x;
            this.y = quadrant.y;
          }
        },
      },
      {
        key: "getQuadrantSize",
        value: function () {
          var halfWidth = this.o.c.w / 2;
          var halfHeight = this.o.c.h / 2;
          return {
            x: Math.random() * halfWidth,
            y: Math.random() * halfHeight,
            halfHeight: halfHeight,
            halfWidth: halfWidth,
          };
        },
      },
      {
        // Random float between range.min and range.max
        key: "randomInRange",
        value: function (range) {
          if (range.min === range.max) return range.min;
          var span = range.max - range.min;
          return Math.random() * span + range.min;
        },
      },
      {
        key: "randomDirection",
        value: function () {
          return Math.random() > 0.5 ? 1 : -1;
        },
      },
      {
        key: "randomShape",
        value: function () {
          return this.o.shapes[Math.floor(Math.random() * this.o.shapes.length)];
        },
      },
      {
        // Builds an rgba() string from an {r,g,b} object + alpha
        key: "toRgbaString",
        value: function (rgb, alpha) {
          return "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + alpha + ")";
        },
      },
      {
        // Advances this particle by one animation frame and draws it
        key: "step",
        value: function (ctx, canvasWidth, canvasHeight) {
          // Pulse the size up/down between min and max, if configured
          if (this.o.size.pulse) {
            this.s += this.o.size.pulse * this.d;
            if (this.s > this.o.size.max || this.s < this.o.size.min) {
              this.d *= -1;
            }
            this.s = Math.abs(this.s);
          }

          // Move, bouncing off the canvas edges
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 0) {
            this.vx *= -1;
            this.x += 1;
          } else if (this.x > canvasWidth) {
            this.vx *= -1;
            this.x -= 1;
          }
          if (this.y < 0) {
            this.vy *= -1;
            this.y += 1;
          } else if (this.y > canvasHeight) {
            this.vy *= -1;
            this.y -= 1;
          }

          ctx.beginPath();
          if (this.o.blending && this.o.blending !== "none") {
            ctx.globalCompositeOperation = this.o.blending;
          }

          var centerColor = this.toRgbaString(this.r, this.o.opacity.center);
          var edgeColor = this.toRgbaString(this.r, this.o.opacity.edge);

          // Radial gradient "radius" depends on the particle's shape
          var gradientRadius =
            this.h === "c" ? this.s / 2 : this.h === "t" ? 0.577 * this.s : this.h === "s" ? 0.707 * this.s : this.s;

          var gradient = ctx.createRadialGradient(this.x, this.y, 0.01, this.x, this.y, gradientRadius);
          gradient.addColorStop(0, centerColor);
          gradient.addColorStop(1, edgeColor);
          ctx.fillStyle = gradient;

          var halfSize = Math.abs(this.s / 2);

          if (this.h === "c") {
            ctx.arc(this.x, this.y, halfSize, 0, 6.283185, false); // 6.283185 ≈ 2*PI
          }

          if (this.h === "s") {
            var left = this.x - halfSize;
            var right = this.x + halfSize;
            var top = this.y - halfSize;
            var bottom = this.y + halfSize;
            ctx.moveTo(left, bottom);
            ctx.lineTo(right, bottom);
            ctx.lineTo(right, top);
            ctx.lineTo(left, top);
          }

          if (this.h === "t") {
            var triangleOffset = skewOffset(30, halfSize);
            var baseY = this.y + triangleOffset;
            ctx.moveTo(this.x - halfSize, baseY);
            ctx.lineTo(this.x + halfSize, baseY);
            ctx.lineTo(this.x, this.y - 2 * triangleOffset);
          }

          ctx.closePath();
          ctx.fill();
        },
      },
    ]);
  })();

  // The main controller: owns the canvas, the particle list, and the animation loop
  var FinisherHeader = (function () {
    function FinisherHeader(options) {
      var self = this;
      _classCallCheck(this, FinisherHeader);

      this.canvas = document.createElement("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.canvas.setAttribute("id", "finisher-canvas");
      this.getHostElement(options.className).appendChild(this.canvas);

      var resizeTimeout;
      window.addEventListener(
        "resize",
        function () {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(self.resize.bind(self), 150);
        },
        false
      );

      this.init(options);
      window.requestAnimationFrame(this.animate.bind(this));
    }

    return _cc(FinisherHeader, [
      {
        // Finds the DOM element this canvas should live inside (default class: "finisher-header")
        key: "getHostElement",
        value: function (className) {
          var matches = document.getElementsByClassName(className || "finisher-header");
          if (!matches.length) {
            throw new Error("No .finisher-header element found");
          }
          return matches[0];
        },
      },
      {
        // Recalculates canvas size + re-applies the skew transform (called on init and on window resize)
        key: "resize",
        value: function () {
          var host = this.getHostElement(this.o.className);
          this.o.c = { w: host.clientWidth, h: host.clientHeight };
          this.canvas.width = this.o.c.w;
          this.canvas.height = this.o.c.h;

          var offset = skewOffset(this.o.skew, this.o.c.w / 2);
          var transform = "skewY(" + this.o.skew + "deg) translateY(-" + offset + "px)";

          this.canvas.setAttribute(
            "style",
            "position:absolute;z-index:-1;top:0;left:0;right:0;bottom:0;" +
              "-webkit-transform:" + transform + ";transform:" + transform + ";" +
              "outline: 1px solid transparent;" +
              "background-color:rgba(" + this.bg.r + "," + this.bg.g + "," + this.bg.b + ",1);"
          );
        },
      },
      {
        key: "init",
        value: function (options) {
          this.o = options;
          this.bg = hexToRgb(this.o.colors.background);
          this.particles = [];
          this.resize();
          this.createParticles();
        },
      },
      {
        // Builds the particle list, cycling through the configured color list.
        // Halves the count on narrow (<600px) screens if count > 5.
        key: "createParticles",
        value: function () {
          var colorIndex = 0;
          this.particles = [];
          this.o.activeCount =
            window.innerWidth < 600 && this.o.count > 5 ? Math.round(this.o.count / 2) : this.o.count;

          for (var i = 0; i < this.o.activeCount; i++) {
            var cornerIndex = i % 4;
            var particle = new Particle(this.o.colors.particles[colorIndex], cornerIndex, this.o);
            colorIndex++;
            if (colorIndex >= this.o.colors.particles.length) colorIndex = 0;
            this.particles[i] = particle;
          }
        },
      },
      {
        // The main render loop — clears the canvas and steps every particle, every frame
        key: "animate",
        value: function () {
          window.requestAnimationFrame(this.animate.bind(this));
          this.ctx.clearRect(0, 0, this.o.c.w, this.o.c.h);
          for (var i = 0; i < this.o.activeCount; i++) {
            this.particles[i].step(this.ctx, this.o.c.w, this.o.c.h);
          }
        },
      },
    ]);
  })();

  window.FinisherHeader = FinisherHeader;
})(window);