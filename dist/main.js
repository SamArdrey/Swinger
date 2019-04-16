/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Swinger = __webpack_require__(/*! ./swinger */ \"./src/swinger.js\");\n// const Platform = require('./platform');\n\nGame.BG_COLOR = \"#000000\";\nGame.DIM_X = 1000;\nGame.DIM_Y = 600;\nGame.FPS = 32;\n\nfunction Game() {\n  this.swinger = [new Swinger({\n    game: this\n  })];\n}\n\nGame.prototype.draw = function draw(ctx) {\n  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n  ctx.fillStyle = Game.BG_COLOR;\n  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n\n  this.allObjects().forEach(function(object) {\n    object.draw(ctx);\n  });\n};\n\nGame.prototype.step = function step(delta) {\n  this.moveObjects(delta);\n  // this.checkCollisions();\n};\n\nGame.prototype.moveObjects = function moveObjects(delta) {\n  this.allObjects().forEach(object => {\n    object.move(delta);\n  });\n};\n\nGame.prototype.allObjects = function allObjects() {\n  return [].concat(this.swinger);\n};\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function GameView(game, ctx) {\n  this.ctx = ctx;\n  this.game = game;\n}\n\nGameView.prototype.bindKeyHandlers = function bindKeyHandlers() {\n  let that = this;\n  key(\"space\", function () {\n    that.game.swinger[0].jump();\n  });\n};\n\nGameView.prototype.start = function start() {\n  this.bindKeyHandlers();\n  this.lastTime = 0;\n  // start the animation\n  requestAnimationFrame(this.animate.bind(this));\n};\n\nGameView.prototype.animate = function animate(time) {\n  const timeDelta = time - this.lastTime;\n\n  this.game.step(timeDelta);\n  this.game.draw(this.ctx);\n  this.lastTime = time;\n\n  // every call to animate requests causes another call to animate\n  requestAnimationFrame(this.animate.bind(this));\n};\n\nmodule.exports = GameView;\n\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const canvasEl = document.getElementsByTagName(\"canvas\")[0];\n  canvasEl.width = Game.DIM_X;\n  canvasEl.height = Game.DIM_Y;\n  const ctx = canvasEl.getContext(\"2d\");\n\n  const game = new Game();\n  new GameView(game, ctx).start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction MovingObject(options) {\n  this.pos = options.pos || [100, 300];\n  this.vel = options.vel;\n  //radius defaults to 15\n  this.radius = options.radius;\n  this.color = options.color;\n\n  this.game = options.game;\n\n  //This is for future effects.\n  //Once the game gets harder,\n  //gravity changes and so does wind.\n  // this.gravity = options.gravity;\n  this.wind = options.wind;\n}\n\nMovingObject.prototype.isCollidedWith = function isCollidedWith(otherObject) {\n  const centerDist = Util.dist(this.pos, otherObject.pos);\n  return centerDist < (this.radius + otherObject.radius);\n};\n\nMovingObject.prototype.draw = function draw(ctx) {\n  ctx.fillStyle = this.color;\n\n  ctx.beginPath();\n  ctx.arc(\n    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n  );\n  ctx.fill();\n};\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/swinger.js":
/*!************************!*\
  !*** ./src/swinger.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nSwinger.RADIUS = 15;\nfunction Swinger(options) {\n  options.radius = Swinger.RADIUS;\n  options.vel = options.vel || [10, 10];\n  options.color = \"#EFEFEF\";\n  // this.forward = true;\n\n  this.armLength = 200;\n  //angular velocity\n  this.aVelocity = 0.0;\n  this.gravity = 0.4;\n  this.angle = -Math.PI/3;\n  //angular accelleration\n  this.aAccelleration = 0.0;\n  this._type = 'swinging';\n\n  //For jump\n  this.velocity = [0.0, 0.0];\n  this.accelleration = [0.0, 0.0];\n  MovingObject.call(this, options);\n}\n\nUtil.inherits(Swinger, MovingObject);\n\nSwinger.prototype.jump = function jump() {\n  if(this._type === 'jumping'){\n    this._type = 'falling';\n  } else {\n    this._type = 'jumping';\n    this.jumpTime = new Date;\n  }\n};\n\nSwinger.prototype.move = function move(delta) {\n  this.getNextPos(delta);\n};\n\nSwinger.prototype.getNextPos = function updateFallingPos(timeDelta) {\n  if (this._type === \"falling\") {\n    this.velocity = [this.velocity[0], this.velocity[1] + (this.gravity * timeDelta)/300];\n\n    this.pos = [\n      this.pos[0] + this.velocity[0] * timeDelta,\n      this.pos[1] + this.velocity[1] * timeDelta\n    ];\n    this.acceleration = 0.0;\n  } else {\n    //calculate accelleration\n    this.aAccelleration = -(this.gravity / this.armLength) * Math.sin(this.angle);\n    //increment velocity\n    this.aVelocity += this.aAccelleration;\n    this.velocity[0] = -this.aVelocity * Math.sin((-Math.PI/2)+this.angle) * 20;\n    this.velocity[1] = -this.aVelocity * Math.cos((-Math.PI/2)+this.angle) * 20;\n\n    //increment angle\n    this.angle += this.aVelocity;\n    this.pos = [\n      300 + (this.armLength * Math.sin(this.angle)),\n      100 + (this.armLength * Math.cos(this.angle))\n    ];\n  }\n};\n\nmodule.exports = Swinger;\n\n//# sourceURL=webpack:///./src/swinger.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n  dist(pos1, pos2) {\n    return Math.sqrt(\n      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)\n    );\n  },\n  inherits(ChildClass, BaseClass) {\n    ChildClass.prototype = Object.create(BaseClass.prototype);\n    ChildClass.prototype.constructor = ChildClass;\n  },\n\n\n}\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });