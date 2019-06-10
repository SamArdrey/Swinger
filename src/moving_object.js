const Util = require("./util");

function MovingObject(options) {
  this.pos = options.pos || [100, 300];
  this.vel = options.vel;
  //radius defaults to 15
  this.radius = options.radius;
  this.color = options.color;

  this.game = options.game;
}

MovingObject.prototype.isCollidedWith = function isCollidedWith(otherObject) {
  const centerDist = Util.dist(this.pos, otherObject.pos);
  return centerDist < (this.radius + otherObject.radius);
};

module.exports = MovingObject;