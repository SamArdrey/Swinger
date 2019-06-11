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
  // let unmute = document.getElementById('unmute');
  // unmute.classList.toggle('fa-volume-up:before');
  let muted = false;

  const game = new Game(bounce, soundTrack);
  new GameView(game, ctx, soundTrack).start();


  mute.addEventListener('click', () => {
    if (muted) {
      mute.classList.toggle('fa-volume-up');
      mute.classList.toggle('fa-volume-mute');
      game.muted = false;
      muted = false;
      soundTrack.play();
    } else {
      mute.classList.toggle('fa-volume-up');
      mute.classList.toggle('fa-volume-mute');
      game.muted = true;
      muted = true;
      soundTrack.pause();
    }
  });

  unmute.addEventListener('click', () => {
    if (muted) {
      // unmute.classList.toggle('fa-volume-up:before');
      game.muted = false;
      muted = false;
      soundTrack.play();
    } else {
      mute.classList.toggle('.fa-volume-mute:before');
      game.muted = true;
      muted = true;
      soundTrack.pause();
    }
  });
});