// Controllers
bt_stop.addEventListener("click", stopStars);
let paused = false;
// Stops/resumes the canvas
function stopStars() {
  paused = !paused;
}
