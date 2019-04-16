const Util = require("./util");

function MovingObject(options) {
  this.pos = options.pos || [100, 300];
  this.vel = options.vel;
  //radius defaults to 15
  this.radius = options.radius;
  this.color = options.color;

  this.game = options.game;

  //This is for future effects.
  //Once the game gets harder,
  //gravity changes and so does wind.
  // this.gravity = options.gravity;
  this.wind = options.wind;
}

MovingObject.prototype.isCollidedWith = function isCollidedWith(otherObject) {
  const centerDist = Util.dist(this.pos, otherObject.pos);
  return centerDist < (this.radius + otherObject.radius);
};

MovingObject.prototype.draw = function draw(ctx) {
  ctx.fillStyle = this.color;

  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  );
  ctx.fill();
};

module.exports = MovingObject;