function Platform(options) {
  this.length = 600 / options.level;
  this.height = 50 + (Math.random() * 200);
  this.dimX = options.dimX;
  this.dimY = options.dimY;
  this.color = "#FFFFFF";

  //this is for checking for collisions and where on the rectangle
  //this collision is happening
  this.top = [
    [this.dimX-this.length, this.dimY-this.height],
    [this.dimX, this.dimY-this.height]
  ];
  this.leftSide = [
    [this.dimX-this.length, this.dimY-this.height],
    [this.dimX-this.length, this.dimY]
  ];
}

Platform.prototype.move = function move() {};

Platform.prototype.draw = function draw(ctx, level = 1) {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.dimX, this.dimY, -this.length, -this.height);
};


module.exports = Platform;