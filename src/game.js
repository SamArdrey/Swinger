const Swinger = require('./swinger');
// const Platform = require('./platform');

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 32;

function Game() {
  this.swinger = [new Swinger({
    game: this
  })];
}

Game.prototype.draw = function draw(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.allObjects().forEach(function(object) {
    object.draw(ctx);
  });
};

Game.prototype.step = function step(delta) {
  this.moveObjects(delta);
  // this.checkCollisions();
};

Game.prototype.moveObjects = function moveObjects(delta) {
  this.allObjects().forEach(object => {
    object.move(delta);
  });
};

Game.prototype.allObjects = function allObjects() {
  return [].concat(this.swinger);
};

module.exports = Game;