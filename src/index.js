// const Game = require("./game");
// const GameView = require("./game_view");
const MovingObject = require("./moving_object");

document.addEventListener("DOMContentLoaded", function () {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 1000;
  canvasEl.height = 500;
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  console.log(mo);
  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
});