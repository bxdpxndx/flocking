import {setCanvasFullscreen} from './utils';
import Game from './Game';

document.addEventListener("DOMContentLoaded", function() {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext('2d');
  
  setCanvasFullscreen(canvas, ctx);
  window.addEventListener("resize", setCanvasFullscreen.bind(null, canvas, ctx));

  let game = new Game(canvas);

  let now, then = Date.now();
  let mainloop = function() {
    now = Date.now();
    game.update(now - then);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx);

    requestAnimationFrame(mainloop);
    then = now;
  };
  requestAnimationFrame(mainloop);
});

