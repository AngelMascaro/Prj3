// Window sizing
let middle_x = window.innerWidth / 2;
let middle_y = window.innerHeight / 2;
// Canvas sizing
const canvas = document.getElementById("responsive-canvas");
canvas.width = window.innerWidth;
canvas.height = 1500;
// Update if resized
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  middle_x = window.innerWidth / 2;
  middle_y = window.innerHeight / 2;
});
// Star array
const stars = [];
// 2D pen
let ctx = canvas.getContext("2d");
// Star params
const MAX_STARS = 500;
const MAX_RADII = 4;
const MIN_RADII = 2;

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
  this.color = "rgba(" + this.rgb.join() + "," + this.alpha + ")";

  // Methods
  // 
  this.moveStar = function () {
    // Star reached a border, respawn it
    if (
      this.canvas_x >= window.innerWidth ||
      this.canvas_x <= 0 ||
      this.canvas_y >= window.innerHeight ||
      this.canvas_y <= 0
    ) {
      // Reset brightness
      this.alpha = 0;
      // Reset spawnpoint
      this.canvas_y = randBetween(middle_y - 50, middle_y + 50);
      this.canvas_x = randBetween(middle_x - 50, middle_x + 50);
      // Set a random speed
      this.x_speed = Math.random() * 2;
      this.y_speed = Math.random() * 2;
      // Don't allow stars get a speed value of 0
      if (this.x_speed == 0) this.y_speed = 2;
      if (this.y_speed == 0) this.x_speed = 2;
      // Go to nearest window border
      if (this.canvas_x < window.innerWidth / 2) this.x_speed *= -1;
      if (this.canvas_y < window.innerHeight / 2) this.y_speed *= -1;
    }
    // Increase brightness
    this.alpha += 0.005;
    this.color = "rgba(" + this.rgb + "," + this.alpha + ")";
    // Accelerate speed
    this.x_speed *= 1.03;
    this.y_speed *= 1.03;
    // Calculate next frame's position
    this.canvas_x += this.x_speed;
    this.canvas_y += this.y_speed;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    //Draw an arc, position X and Y, radii, start at 0º, end at 360º
    ctx.arc(this.canvas_x, this.canvas_y, this.radii, 0, 2 * Math.PI);
    ctx.fill();
  };
}
// Animation frame caller 
function moveStars() {
  // Eraser frame
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (!paused) {
    // Move each star in stars
    for (var i = 0; i < stars.length; i++) {
      stars[i].moveStar();
    }
  }
  // Next frame
  requestAnimationFrame(moveStars);
}
// Populate stars array
while (stars.length < MAX_STARS) {
  // Definim els valors de posició incial, mida i color aleatòriament
  let star_radii = randBetween(MIN_RADII, MAX_RADII);
  let x_axis = randBetween(0, canvas.width);
  let y_axis = randBetween(0, canvas.height);

  // Creem i afegim el nou objecte a l'array contenidor
  stars.push(new Star(x_axis, y_axis, star_radii));
}
// Start animation
requestAnimationFrame(moveStars);
