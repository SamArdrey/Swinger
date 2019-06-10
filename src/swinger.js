const Util = require('./util');
const MovingObject = require('./moving_object');

Swinger.RADIUS = 15;
function Swinger(options) {
  options.radius = Swinger.RADIUS;
  options.color = "#66ffcc";

  this.armLength = 150;
  //angular velocity
  this.aVelocity = 0.0;
  this.gravity = 0.335;
  this.angle = -Math.PI/3;
  //angular accelleration
  this.aAccelleration = 0.0;
  this._type = 'swinging';

  //or fall
  this.velocity = [0.0, 0.0];
  this.accelleration = [0.0, 0.0];
  MovingObject.call(this, options);
}

Util.inherits(Swinger, MovingObject);

Swinger.prototype.jump = function jump() {
  if(this._type === 'swinging'){
    this._type = 'falling';
  } else {
    this._type = 'swinging';
  }
};

Swinger.prototype.move = function move(delta, stop) {
  this.getNextPos(delta, stop);
};

Swinger.prototype.getNextPos = function getNextPos(timeDelta, stop) {
  if (this._type === "falling") {
    //change the number at the end to speed up or slow down ball movement
    this.velocity = [this.velocity[0], this.velocity[1] + (this.gravity * timeDelta)/125];

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

    // change the number at the end to change the distance at which the ball
    // moves after released from the swing
    this.velocity[0] = -this.aVelocity * Math.sin((-Math.PI/2)+this.angle) * 28;
    this.velocity[1] = -this.aVelocity * Math.cos((-Math.PI/2)+this.angle) * 28;

    //increment angle
    this.angle += this.aVelocity;
    this.pos = [
      250 + (this.armLength * Math.sin(this.angle)),
      100 + (this.armLength * Math.cos(this.angle))
    ];
  }
};

Swinger.prototype.draw = function draw(ctx) {
  if (this._type === "swinging") this.drawLine(ctx);

  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
  ctx.fill();
};

Swinger.prototype.drawLine = function drawLine(ctx) {
  ctx.beginPath();
  // Draw the arm
  ctx.moveTo(250, 0);
  ctx.lineTo(this.pos[0], this.pos[1]);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#EFEFEF";
  ctx.stroke();
};

module.exports = Swinger;