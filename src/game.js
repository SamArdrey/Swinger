const Swinger = require('./swinger');
const Platform = require('./platform');

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 60;

function Game() {
  this.level = 1;
  this.stop = false;

  this.swinger = [new Swinger({
    game: this
  })];
  this.platform = [new Platform({
    game: this,
    dimX: Game.DIM_X,
    dimY: Game.DIM_Y,
    level: this.level
  })];
}

Game.prototype.step = function step(delta) {
  this.checkCollisions();
  this.moveObjects(delta);
};

Game.prototype.moveObjects = function moveObjects(delta) {
  this.swinger[0].move(delta, this.stop);
};

Game.prototype.checkCollisions = function checkCollisions() {
  let radius = this.swinger[0].radius;
  let swingPos = [this.swinger[0].pos[0] + radius, this.swinger[0].pos[1] + radius];
  let topEdge  = Object.assign(this.platform[0].top);
  let leftEdge = Object.assign(this.platform[0].leftSide);
  let stopFirstStatement = false;

  if (swingPos[0]>= topEdge[0][0] + 25 &&
      swingPos[1]>= topEdge[0][1] - 15 &&
      // swingPos[1]<= topEdge[0][1] + 15 &&
      !stopFirstStatement) {
      this.swinger[0].velocity[1] = -(this.swinger[0].velocity[1]);
      stopFirstStatement = true;
  } else if (swingPos[0] >= leftEdge[0][0] &&
             swingPos[1] >= leftEdge[0][1]) {
    this.swinger[0].velocity[0] = -(this.swinger[0].velocity[0]);
  }
};

Game.prototype.draw = function draw(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.allObjects().forEach(function(object) {
    object.draw(ctx);
  });
  
  this.drawOutline(ctx);
};

Game.prototype.drawOutline = function drawOutline(ctx) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, Game.DIM_Y);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "pink";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(Game.DIM_X, 0);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "pink";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(Game.DIM_X, 0);
  ctx.lineTo(Game.DIM_X, Game.DIM_Y);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "pink";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, Game.DIM_Y);
  ctx.lineTo(Game.DIM_X, Game.DIM_Y);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "pink";
  ctx.stroke();
};

Game.prototype.allObjects = function allObjects() {
  return [].concat(this.swinger, this.platform);
};

module.exports = Game;