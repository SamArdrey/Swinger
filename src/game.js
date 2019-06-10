const Swinger = require('./swinger');
const Platform = require('./platform');
const CollisionStatus = require('./collision');

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 60;

function Game(level = 1) {
  this.level = level;
  this.stop = false;
  this.newBoardObjects();
}

Game.prototype.newBoardObjects = function newBoardObjects() {
  this.newSwingerObject();
  this.newPlatformObject();
  this.newCollisionObject();
};

Game.prototype.newPlatformObject = function newPlatformObject() {
  this.platform = [new Platform({
    game: this,
    dimX: Game.DIM_X,
    dimY: Game.DIM_Y,
    level: this.level
  })];
};

Game.prototype.newSwingerObject = function newSwingerObject() {
  this.swinger = [new Swinger({
    game: this
  })];
};

Game.prototype.newCollisionObject = function newCollisionObject() {
  this.collisionStatus = new CollisionStatus(
    this.swinger,
    this.platform,
    false,
    Game.DIM_X,
    Game.DIM_Y);
};

Game.prototype.step = function step(delta) {
  this.collisionStatus.checkCollision();
  this.moveObjects(delta);
  this.checkIfOutOfBounds();
};

Game.prototype.moveObjects = function moveObjects(delta) {
  this.swinger[0].move(delta, this.stop);
};

Game.prototype.checkIfOutOfBounds = function checkIfOutOfBounds() {
  if (this.collisionStatus.outOfBounds() &&
      this.collisionStatus.landedOnPlatform) {
    this.level++;
    this.newBoardObjects();
  } else if (this.collisionStatus.outOfBounds()) {
    this.level = 1;
    this.newBoardObjects();
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