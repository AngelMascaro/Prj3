// Window sizing
let x_middle = window.innerWidth / 2;
let y_middle = window.innerHeight / 2;
// Canvas sizing
const canvas = document.getElementById("responsive-canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = window.innerHeight;
// Update if resized
window.addEventListener("resize", () => {
  canvas.width = document.documentElement.clientWidth;
  x_middle = window.innerWidth / 2;
  y_middle = window.innerHeight / 2;
});
// Background
const background = document.getElementById("space-background");
const checkpoint_image = document.getElementById("checkpointPhoto");
let backgr_motion = 0;
let backgr_interval;

// Star array
const MAX_STARS = 100;
const stars = [];
// 2D pen
let ctx = canvas.getContext("2d");
// Star params
const MAX_RADII = 3;
const MIN_RADII = 1;
const SPAWN_RANGE = 10;
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
    // Move every star a fraction of the motion
    this.canvas_x += this.x_speed + x_motion / 60;
    this.canvas_y += this.y_speed + y_motion / 60;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    //Draw an arc, position X and Y, radii, start at 0º, end at 360º
    ctx.arc(this.canvas_x, this.canvas_y, this.radii, 0, 2 * Math.PI);
    ctx.fill();
  };

  this.respawnStar = function () {
    if (
      // Star still inside the canvas, return
      this.canvas_x < window.innerWidth &&
      this.canvas_x > 0 &&
      this.canvas_y < window.innerHeight &&
      this.canvas_y > 0
    )
      return;
    // Star out of bounds, respawn
    // New rand radii
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
    // Go to closest window border
    if (this.canvas_x < x_middle + x_motion) this.x_speed *= -1;
    if (this.canvas_y < y_middle + y_motion) this.y_speed *= -1;
  };
}
// Move each star to the next frame
function moveStars() {
  for (var i = 0; i < stars.length; i++) {
    stars[i].moveStar();
  }
}
// Animation frame caller
function nextFrame() {
  if (!paused && !stopped) {
    // Draw background
    ctx.drawImage(background, 0 - x_motion * 0.02, 0 - y_motion * 0.02);
    moveStars();
  } else if (!paused && stopped || paused && !stopped) {
    // Fade in background or fade out
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    moveStars();
  }
  // Draw checkpoint image
  // s == image source, d == canvas
  // image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
  else
    ctx.drawImage(
      checkpoint_image,
      0,
      0,
      x_middle,
      canvas.height,
      x_middle,
      0,
      x_middle,
      canvas.height
    );
  // Next frame
  requestAnimationFrame(nextFrame);
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
requestAnimationFrame(nextFrame);
