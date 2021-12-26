const table = document.getElementById("table");
const json = document.getElementById("json");
const bt_en = $('option[value="en"]');
const bt_ca = $('option[value="ca"]');
const currentCheckpoint = new Checkpoint();
const targetCheckpoint = new Checkpoint();
json.addEventListener('click', loadCheckpoint);
bt_en.click(changeLang);
bt_ca.click(changeLang);

function changeLang(e){
    Cookies.set('lang', e.target["value"]);
};
function Checkpoint(){
    
}
function Quest(){

}
function Ship(health, cargo, fuel, score){
    this.health = health;
    this.cargo = cargo;
    this.fuel = fuel;
    this.score = score;
}
