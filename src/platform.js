function Platform(options) {
  this.length = 500 / options.level;
  this.height = 50 + (Math.random() * 200);
  this.distFromWall = (Math.random() * 200);
  this.dimX = options.dimX;
  this.dimY = options.dimY;
  this.color = "#FFFFFF";
  //this is for checking for collisions and where on the rectangle
  //this collision is happening
  this.topEdge = [
    [this.dimX-this.length-this.distFromWall, this.dimY-this.height],
    [this.dimX-this.distFromWall, this.dimY-this.height]
  ];
  this.leftEdge = [
    [this.dimX-this.length-this.distFromWall, this.dimY-this.height],
    [this.dimX-this.length-this.distFromWall, this.dimY]
  ];
}

Platform.prototype.move = function move() {};

Platform.prototype.draw = function draw(ctx) {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.dimX-this.distFromWall, this.dimY, -this.length, -this.height);
};

module.exports = Platform;