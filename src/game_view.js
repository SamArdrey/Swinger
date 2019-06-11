function GameView(game, ctx, soundTrack) {
  this.ctx = ctx;
  this.game = game;
  this.soundTrack = soundTrack;
}

GameView.prototype.bindKeyHandlers = function bindKeyHandlers() {
  let that = this;
  key("space", function () {
    that.game.swinger[0].jump();
  });
};

GameView.prototype.start = function start() {
  this.bindKeyHandlers();
  this.lastTime = 0;
  // start the animation
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function animate(time) {
  const timeDelta = time - this.lastTime;

  this.game.step(timeDelta);
  this.game.draw(this.ctx);
  this.lastTime = time;

  // every call to animate requests causes another call to animate
  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;
