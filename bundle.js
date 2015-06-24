(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/ferran/projects/flocking-game/index.js":[function(require,module,exports){
"use strict";

require("./src/main");

},{"./src/main":"/Users/ferran/projects/flocking-game/src/main.js"}],"/Users/ferran/projects/flocking-game/src/Boid.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Vec2 = require("./Vec2");

var _Vec22 = _interopRequireDefault(_Vec2);

var _utils = require("./utils");

var Boid = (function () {
  function Boid(flock, position, velocity, mass) {
    _classCallCheck(this, Boid);

    if (flock === "undefined") {
      throw new Error("a flock is required!");
    };
    this.position = position || new _Vec22["default"]();
    this.velocity = velocity || new _Vec22["default"]();
    this.force = new _Vec22["default"]();
    this.mass = mass || 10;
    this.flock = flock;
    this.max_speed = 150;
    this.max_force = 10;
  }

  _createClass(Boid, [{
    key: "getForces",
    value: function getForces() {
      var center = new _Vec22["default"](window.innerWidth / 2, window.innerHeight / 2);
      return this.getFlockForces().add(center.subtract(this.position).truncate(20));
    }
  }, {
    key: "getFlockForces",
    value: function getFlockForces() {
      var cohesionForce = new _Vec22["default"]();
      var avoidanceForce = new _Vec22["default"]();
      var alignmentForce = new _Vec22["default"]();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.flock[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var other = _step.value;

          if (this === other) {
            continue;
          }
          var dist = this.position.dist(other.position);
          if (dist < 100) {
            // avoid close boids, cuadratically
            avoidanceForce = avoidanceForce.add(this.position.subtract(other.position).normalize().multiply(600 / dist));
          }
          if (dist < 250) {
            // go to close boids, linearly
            cohesionForce = cohesionForce.add(other.position.subtract(this.position).truncate(100));
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      cohesionForce = cohesionForce.truncate(10);
      this.force = cohesionForce.add(avoidanceForce).add(alignmentForce);
      return this.force;
    }
  }, {
    key: "update",

    //END TODO

    value: function update(interval) {
      var acceleration = this.getForces().truncate(this.max_force); //(this.getForce().truncate(this.max_force)).divide(this.mass);
      this.velocity = this.velocity.add(acceleration).truncate(this.max_speed);
      this.position = this.position.add(this.velocity.multiply(interval / 1000));
    }
  }, {
    key: "render",
    value: function render(ctx) {
      var scale = Math.sqrt(this.mass);

      ctx.save();

      ctx.translate(this.position.x, this.position.y);
      ctx.rotate(this.velocity.heading());
      ctx.scale(scale, scale);

      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(2, 0);
      ctx.lineTo(-4, 2);
      ctx.lineTo(-2, 0);
      ctx.lineTo(-4, -2);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      ctx.beginPath();
      var _position = this.position;
      var x = _position.x;
      var y = _position.y;

      ctx.moveTo(x, y);
      var p = this.position.add(this.force);
      x = p.x;
      y = p.y;
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
    }
  }], [{
    key: "random",
    value: function random(flock) {
      var b = undefined;
      b = new Boid(flock, new _Vec22["default"]((0, _utils.rand)(0, window.innerWidth), (0, _utils.rand)(0, window.innerHeight)), _Vec22["default"].fromPolar((0, _utils.rand)(1, 100), (0, _utils.rand)(0, 2 * Math.PI)), (0, _utils.rand)(3, 5));
      return b;
    }
  }]);

  return Boid;
})();

exports["default"] = Boid;
module.exports = exports["default"];

},{"./Vec2":"/Users/ferran/projects/flocking-game/src/Vec2.js","./utils":"/Users/ferran/projects/flocking-game/src/utils.js"}],"/Users/ferran/projects/flocking-game/src/Game.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Boid = require('./Boid');

var _Boid2 = _interopRequireDefault(_Boid);

var Game = (function () {
	function Game(canvas) {
		_classCallCheck(this, Game);

		this.canvas = canvas;
		var flock = new Set();
		for (var i = 0; i < 150; i++) {
			flock.add(_Boid2['default'].random(flock));
		}
		this.flock = flock;
	}

	_createClass(Game, [{
		key: 'update',
		value: function update(interval) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.flock[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var boid = _step.value;

					boid.update(interval);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: 'render',
		value: function render(ctx) {
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.flock[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var boid = _step2.value;

					boid.render(ctx);
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2['return']) {
						_iterator2['return']();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}
	}]);

	return Game;
})();

exports['default'] = Game;
module.exports = exports['default'];

},{"./Boid":"/Users/ferran/projects/flocking-game/src/Boid.js"}],"/Users/ferran/projects/flocking-game/src/Vec2.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vec2 = (function () {
  function Vec2(x, y) {
    _classCallCheck(this, Vec2);

    this.x = x || 0;
    this.y = y || 0;
  }

  _createClass(Vec2, [{
    key: "copy",
    value: function copy() {
      return new Vec2(this.x, this.y);
    }
  }, {
    key: "length",
    value: function length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var m = undefined;
      m = this.length();
      if (m > 0) {
        return this.divide(m);
      } else {
        return new Vec2(0, 0);
      }
    }
  }, {
    key: "truncate",
    value: function truncate(max_len) {
      if (this.length() > max_len) {
        return this.normalize().multiply(max_len);
      } else {
        return this.copy();
      }
    }
  }, {
    key: "heading",
    value: function heading() {
      return Math.atan2(this.y, this.x);
    }
  }, {
    key: "sqdist",
    value: function sqdist(other) {
      var dx = undefined,
          dy = undefined;
      dx = this.x - other.x;
      dy = this.y - other.y;
      return dx * dx + dy * dy;
    }
  }, {
    key: "dist",
    value: function dist(other) {
      return Math.sqrt(this.sqdist(other));
    }
  }, {
    key: "add",
    value: function add(other) {
      return new Vec2(this.x + other.x, this.y + other.y);
    }
  }, {
    key: "subtract",
    value: function subtract(other) {
      return new Vec2(this.x - other.x, this.y - other.y);
    }
  }, {
    key: "multiply",
    value: function multiply(n) {
      return new Vec2(this.x * n, this.y * n, this.z * n);
    }
  }, {
    key: "divide",
    value: function divide(n) {
      return new Vec2(this.x / n, this.y / n, this.z / n);
    }
  }, {
    key: "dot",
    value: function dot(other) {
      return this.x * other.x + this.y * other.y + this.z * other.z;
    }
  }, {
    key: "rotate",
    value: function rotate(angle) {
      return new Vec2(Math.cos(angle) * this.x - Math.sin(angle) * this.y, Math.sin(angle) * this.x + Math.cos(angle) * this.y);
    }
  }, {
    key: "project",
    value: function project(other) {
      return other.multiply(this.dot(other.norm()));
    }
  }, {
    key: "isValid",
    value: function isValid() {
      return this.x !== Infinity && !isNaN(this.x) && this.y !== Infinity && !isNaN(this.y);
    }
  }], [{
    key: "fromPolar",
    value: function fromPolar(length, angle) {
      var v = undefined;
      v = new Vec2(length, 0);
      return v.rotate(angle);
    }
  }]);

  return Vec2;
})();

exports["default"] = Vec2;
module.exports = exports["default"];

},{}],"/Users/ferran/projects/flocking-game/src/main.js":[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('./utils');

var _Game = require('./Game');

var _Game2 = _interopRequireDefault(_Game);

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  (0, _utils.setCanvasFullscreen)(canvas, ctx);
  window.addEventListener('resize', _utils.setCanvasFullscreen.bind(null, canvas, ctx));

  var game = new _Game2['default'](canvas);

  var now = undefined,
      then = Date.now();
  var mainloop = function mainloop() {
    now = Date.now();
    game.update(now - then);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx);

    requestAnimationFrame(mainloop);
    then = now;
  };
  requestAnimationFrame(mainloop);
});

},{"./Game":"/Users/ferran/projects/flocking-game/src/Game.js","./utils":"/Users/ferran/projects/flocking-game/src/utils.js"}],"/Users/ferran/projects/flocking-game/src/utils.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.rand = rand;
exports.setCanvasFullscreen = setCanvasFullscreen;

function rand(min, max) {
	return Math.random() * (max - min + 1) + min;
}

;

var mouse = { x: 0, y: 0 };
exports.mouse = mouse;
window.addEventListener("mousemove", function (event) {
	mouse.x = event.offsetX || event.clientX;
	mouse.y = event.offsetY || event.clientY;
});

function setCanvasFullscreen(canvas, ctx) {
	var devicePixelRatio = window.devicePixelRatio || 1;
	var backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
	var ratio = devicePixelRatio / backingStoreRatio;

	console.log("ratio:", ratio);
	canvas.height = ratio * window.innerHeight;
	canvas.width = ratio * window.innerWidth;
	canvas.style.height = window.innerHeight;
	canvas.style.width = window.innerWidth;
	ctx.scale(ratio, ratio);
}

;

},{}]},{},["/Users/ferran/projects/flocking-game/index.js"]);
