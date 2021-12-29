// Controllers
bt_stop.addEventListener("click", pauseStars);
let paused = false;
let stopped = false;
const MOTION = 60;
let x_motion = 0;
let y_motion = 0;
let deceleration = 0;
// Stops/resumes the canvas
async function pauseStars() {
  paused = !paused;
  deceleration = 0
  if (paused) deceleration = 0.05
  await new Promise (resolve => { 
    setTimeout(() => {
      resolve(stopped = !stopped);
    }, 3000);
  });
}
document.onkeydown = function (e) {
  switch (e.code) {
    case "KeyA":
    case "ArrowLeft":
      x_motion = -MOTION;
      break;
    case "KeyW":
    case "ArrowUp":
      y_motion = -MOTION;
      break;
    case "KeyD":
    case "ArrowRight":
      x_motion = MOTION;
      break;
    case "KeyS":
    case "ArrowDown":
      y_motion = MOTION;
      break;
  }
};

// Quan deixem anar una tecla, posem a fals la variable booleana que la registra
document.onkeyup = function (e) {
  switch (e.code) {
    case "KeyA":
    case "ArrowLeft":
      x_motion = 0;
      break;
    case "KeyW":
    case "ArrowUp":
      y_motion = 0;
      break;
    case "KeyD":
    case "ArrowRight":
      x_motion = 0;
      break;
    case "KeyS":
    case "ArrowDown":
      y_motion = 0;
      break;
  }
};
