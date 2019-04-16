const Util = require('./util');
const MovingObject = require('./moving_object');

Swinger.RADIUS = 15;
function Swinger(options) {
  options.radius = Swinger.RADIUS;
  options.vel = options.vel || [10, 10];
  options.color = "#EFEFEF";
  // this.forward = true;

  this.armLength = 200;
  //angular velocity
  this.aVelocity = 0.0;
  this.gravity = 0.4;
  this.angle = -Math.PI/3;
  //angular accelleration
  this.aAccelleration = 0.0;
  this._type = 'swinging';

  //For jump
  this.velocity = [0.0, 0.0];
  this.accelleration = [0.0, 0.0];
  MovingObject.call(this, options);
}

Util.inherits(Swinger, MovingObject);

Swinger.prototype.jump = function jump() {
  if(this._type === 'jumping'){
    this._type = 'falling';
  } else {
    this._type = 'jumping';
    this.jumpTime = new Date;
  }
};

Swinger.prototype.move = function move(delta) {
  this.getNextPos(delta);
};

Swinger.prototype.getNextPos = function updateFallingPos(timeDelta) {
  if (this._type === "falling") {
    this.velocity = [this.velocity[0], this.velocity[1] + (this.gravity * timeDelta)/300];

    this.pos = [
      this.pos[0] + this.velocity[0] * timeDelta,
      this.pos[1] + this.velocity[1] * timeDelta
    ];
    this.acceleration = 0.0;
  } else {
    //calculate accelleration
    this.aAccelleration = -(this.gravity / this.armLength) * Math.sin(this.angle);
    //increment velocity
    this.aVelocity += this.aAccelleration;
    this.velocity[0] = -this.aVelocity * Math.sin((-Math.PI/2)+this.angle) * 20;
    this.velocity[1] = -this.aVelocity * Math.cos((-Math.PI/2)+this.angle) * 20;

    //increment angle
    this.angle += this.aVelocity;
    this.pos = [
      300 + (this.armLength * Math.sin(this.angle)),
      100 + (this.armLength * Math.cos(this.angle))
    ];
  }
};

module.exports = Swinger;