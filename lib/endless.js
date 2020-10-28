import Board from "./board";
import Game from "./game";

document.addEventListener("DOMContentLoaded", function () {
  const stage = new createjs.Stage("canvas");
  const board = new Board(stage);
  window.board = board;
  board.draw();
  stage.update();

  const game = new Game(stage);

  game.onGameOver = function onGameOver(score) {
    PlayEGI.finish({ points: { type: "RawInt", value: score }});
  };

  function LhandlePress(e) {
    if (game.started) {
      switch (e.keyCode) {
        case 97:
          game.check(game.LleftArrows, "l_left");
          break;
        case 115:
          game.check(game.LdownArrows, "l_down");
          break;
        case 119:
          game.check(game.LupArrows, "l_up");
          break;
        case 100:
          game.check(game.LrightArrows, "l_right");
          break;
      }
    }
  }

  function RhandlePress(e) {
    if (game.started) {
      switch (e.keyCode) {
        case 106:
          game.check(game.RleftArrows, "r_left");
          break;
        case 107:
          game.check(game.RdownArrows, "r_down");
          break;
        case 105:
          game.check(game.RupArrows, "r_up");
          break;
        case 108:
          game.check(game.RrightArrows, "r_right");
          break;
      }
    }
  }

  PlayEGI.onSignal(signal => {
    switch (signal.type) {
      case "Hello":
        PlayEGI.ready();
        break;
      case "Ping":
        PlayEGI.pong();
        break;
      case "Step":
        PlayEGI.pong();
        if (game.started) {
          switch (signal.direction) {
            case "Left":
              game.check(game.RleftArrows, "r_left");
              break;
            case "Down":
              game.check(game.RdownArrows, "r_down");
              break;
            case "Up":
              game.check(game.RupArrows, "r_up");
              break;
            case "Right":
              game.check(game.RrightArrows, "r_right");
              break;
         }
       } else {
          switch (signal.direction) {
            case "Left":
              game.play("light");
              board.closeModal();
              break;
            case "Right":
              game.play("standard");
              board.closeModal();
              break;
	  }
       }
       break;
    }
  })

  document.getElementById("light").addEventListener("click", () => {
    game.play("light");
  });
  document.getElementById("standard").addEventListener("click", () => {
    game.play("standard");
  });
  document.getElementById("heavy").addEventListener("click", () => {
    game.play("heavy");
  });

  document.addEventListener("keypress", LhandlePress, false);
  document.addEventListener("keypress", RhandlePress, false);
});
