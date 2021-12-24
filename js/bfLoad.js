const planetRequest = new XMLHttpRequest();
const planet = {};
function processJSON() {
  if (this.status == !200) return "Error";
// remove children from the table
  while (table.firstChild) {
    table.removeChild(table.lastChild);
  };
    planet = JSON.parse(this.responseText);
  let output = "";
  for (label in planet) {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    let td = document.createElement("td");
    let th_text = document.createTextNode(label);
    let td_text = document.createTextNode(planet[label]);
    th.appendChild(th_text);
    td.appendChild(td_text);
    tr.appendChild(th);
    tr.appendChild(td);
    table.appendChild(tr);
  }
}
function loadJSON() {
  planetRequest.open("GET", "js/planetData.json", true);
  planetRequest.onload = processJSON;
  planetRequest.send();
}
