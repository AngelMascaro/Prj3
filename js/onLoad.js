const checkpointData = document.getElementById("checkpointData");
const json = document.getElementById("json");
const bt_en = document.getElementById("bt_en");
const bt_ca = document.getElementById("bt_ca");
const bt_stop = document.getElementById("stop");
const checkpointName = document.getElementById("checkpointName");
const checkpointPhoto = document.getElementById("checkpointPhoto");
const checkpointSymbol = document.getElementById("checkpointSymbol");

const currentCheckpoint = new Checkpoint();
const targetCheckpoint = new Checkpoint();
json.addEventListener("click", loadCheckpoint);
bt_en.addEventListener("click", changeLang);
bt_ca.addEventListener("click", changeLang);

function changeLang(e) {
  Cookies.set("lang", e.target["value"]);
}
function travelDistance(from, to) {
  return Math.abs(from - to);
}
function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)}

function Checkpoint() {}
function Quest(target) {
  this.target = target;
  this.distance = travelDistance();
  this.reward = calcReward();
}
function Ship(health, cargo, fuel, score, location) {
  this.health = health;
  this.cargo = cargo;
  this.fuel = fuel;
  this.score = score;
  this.location = location;
}
