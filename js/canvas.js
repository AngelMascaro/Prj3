// Window sizing
let x_middle = window.innerWidth / 2;
let y_middle = window.innerHeight / 2;
// Canvas sizing
const canvas = document.getElementById("responsive-canvas");
canvas.width = window.innerWidth;
canvas.height = 1500;
// Update if resized
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  x_middle = window.innerWidth / 2;
  y_middle = window.innerHeight / 2;
});
// Background
const background = document.getElementById("space-background");
// Star array
const MAX_STARS = 150;
const stars = [];
// 2D pen
let ctx = canvas.getContext("2d");
// Star params
const MAX_RADII = 3;
const MIN_RADII = 1;
const SPAWN_RANGE = 30;
const ACCELERATION = 1.03;
const BRIGHTNESS = 0.015;
// Star object
// canvas_x and canvas_y are the initial coords
function Star(canvas_x, canvas_y, radii) {
  // Properties
  //
  this.canvas_x = canvas_x;
  this.canvas_y = canvas_y;
  this.radii = radii;
  this.rgb = [];
  this.alpha = 0;
  // Calculate a random color
  for (let i = 0; i < 3; i++) {
    this.rgb[i] = randBetween(180, 255);
  }
  this.rgb.join(",");
  this.color = "rgba(" + this.rgb + "," + this.alpha + ")";

  // Methods
  //
  this.moveStar = function () {
    // If star reached any border, respawn it
    this.respawnStar();
    if (paused) this.radii = 1;
    // Increase brightness
    this.alpha += BRIGHTNESS;
    this.color = "rgba(" + this.rgb + "," + this.alpha + ")";
    // Accelerate speed
    this.x_speed *= ACCELERATION - deceleration;
    this.y_speed *= ACCELERATION - deceleration;
    // Calculate next frame's position
    this.canvas_x += this.x_speed + x_motion/30;
    this.canvas_y += this.y_speed + y_motion/30;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    //Draw an arc, position X and Y, radii, start at 0º, end at 360º
    ctx.arc(this.canvas_x, this.canvas_y, this.radii, 0, 2 * Math.PI);
    ctx.fill();
  };
// async function test() {
//   console.log('waiting keypress..')
//   await waitingKeypress();
//   console.log('good job!')
// }

  this.respawnStar = function () {
    // Star still inside the canvas, return
    if (
      this.canvas_x < window.innerWidth &&
      this.canvas_x > 0 &&
      this.canvas_y < window.innerHeight &&
      this.canvas_y > 0
    ) return;
    this.radii = randBetween(MIN_RADII, MAX_RADII);
    // Reset brightness
    this.alpha = 0;
    // Reset spawnpoint
    this.canvas_y = randBetween(
      y_middle - SPAWN_RANGE + y_motion,
      y_middle + SPAWN_RANGE + y_motion
    );
    this.canvas_x = randBetween(
      x_middle - SPAWN_RANGE + x_motion,
      x_middle + SPAWN_RANGE + x_motion
    );
    // Set a random speed
    this.x_speed = Math.random() * 2;
    this.y_speed = Math.random() * 2;
    // Don't allow stars get a speed value of 0
    if (this.x_speed == 0) this.y_speed = 2;
    if (this.y_speed == 0) this.x_speed = 2;
    // Go to nearest window border
    if (this.canvas_x < x_middle + x_motion) this.x_speed *= -1;
    if (this.canvas_y < y_middle + y_motion) this.y_speed *= -1;
  };
}

// Animation frame caller
function moveStars() {
  if (!stopped) {
    // Eraser frame
    // ctx.fillStyle = "rgba(0,0,0,0.60)";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background,0,0,window.innerWidth,window.innerHeight,0,0,window.innerWidth,window.innerHeight)
    // Move each star in stars
    for (var i = 0; i < stars.length; i++) {
      stars[i].moveStar();
    }
    // User input
    // if(x_motion >= 500) x_motion = 500
    // if(y_motion >= 500) y_motion = 500
  }
  // Next frame
  requestAnimationFrame(moveStars);
}
// Populate stars array
while (stars.length <= MAX_STARS) {
  // Randomize initial properties
  let star_radii = randBetween(MIN_RADII, MAX_RADII);
  let x_axis = randBetween(0, window.innerWidth);
  let y_axis = randBetween(0, window.innerHeight);

  // Add a new star
  stars.push(new Star(x_axis, y_axis, star_radii));
}
// Start animation
requestAnimationFrame(moveStars);
