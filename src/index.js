const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function () {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  const ctx = canvasEl.getContext("2d");

  let bounce = document.getElementById('bounce');
  let soundTrack = document.getElementById('sound-track');

  let mute = document.getElementById('mute');
  let muted = false;

  const game = new Game(bounce, soundTrack);
  new GameView(game, ctx).start();

  mute.addEventListener('click', () => {
    mute.classList.toggle('fa-volume-up');
    mute.classList.toggle('fa-volume-mute');

    if (muted) {
      game.muted = false;
      muted = false;
      soundTrack.play();
    } else {
      game.muted = true;
      muted = true;
      soundTrack.pause();
    }
  });
});