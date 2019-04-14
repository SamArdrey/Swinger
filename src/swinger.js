const Util = require('./util');
const MovingObject = require('./moving_object');

Swinger.RADIUS = 15;
function Swinger(options) {
  options.radius = Swinger.RADIUS;
  options.vel = options.vel || [10, 10];
  options.color = "#000000";

  MovingObject.call(this, options);
}

Util.inherits(Swinger, MovingObject);

Swinger.prototype.jump = function jump() {

};



module.exports = Swinger;