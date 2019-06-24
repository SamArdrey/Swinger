const Swinger = require('./swinger');
const Platform = require('./platform');
const CollisionStatus = require('./collision');

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 60;

function Game(bounce, soundTrack) {
  this.level = 1;
  this.stop = false;
  this.bounce = bounce;
  this.muted = false;
  this.soundTrack = soundTrack;

  this.newBoardObjects();
}

Game.prototype.newBoardObjects = function newBoardObjects() {
  this.newSwingerObject();
  this.newPlatformObject();
  this.newCollisionObject();
  if (!this.muted) {
    this.soundTrack.play();
  }
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
    Game.DIM_Y,
    this.bounce);

};

Game.prototype.step = function step(delta) {
  this.collisionStatus.checkCollision(this.muted);
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
  let level = document.getElementsByClassName('level')[0];
  level.innerHTML = `Level: ${this.level}`;

  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.allObjects().forEach(function(object) {
    object.draw(ctx);
  });

  this.drawOutline(ctx);
};

Game.prototype.drawOutline = function drawOutline(ctx) {
  ctx.lineWidth = 5;
  ctx.strokeStyle = "pink";
  this.drawLine(ctx, 0, 0, 0, Settings.DIM_Y)
  this.drawLine(ctx, 0, 0, Settings.DIM_Y, 0)
  this.drawLine(ctx, Settings.DIM_X, 0, Settings.DIM_X, Settings.DIM_Y)
  this.drawLine(ctx, 0, Settings.DIM_Y, Settings.DIM_X, Settings.DIM_Y)
};

Game.prototype.drawLine = function drawLine(ctx, moveX, moveY, lineX, lineY) {
  ctx.beginPath();
  ctx.moveTo(moveX, moveY);
  ctx.lineTo(lineX, lineY);
  ctx.stroke();
};

Game.prototype.allObjects = function allObjects() {
  return [].concat(this.swinger, this.platform);
};

module.exports = Game;