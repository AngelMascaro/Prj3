const checkpointRequest = new XMLHttpRequest();
function processJSON() {
  // request failed
  if (this.status == !200) return "Error";
  // remove children from table
  while (table.firstChild) {
    table.removeChild(table.lastChild);
  }
  // get JSON obj
  Object.assign(targetCheckpoint, JSON.parse(checkpointRequest.responseText));
  // build table
  for (label in targetCheckpoint) {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    let td = document.createElement("td");
    th.innerText = label;
    td.innerText = targetCheckpoint[label];
    tr.appendChild(th);
    tr.appendChild(td);
    table.appendChild(tr);
  }
}
// on button click
function loadCheckpoint(e) {
  // Set params
  let input = document.getElementById("checkpoint").value;
  let lang = Cookies.get("lang");
  // Prepare and send request
  checkpointRequest.open("GET", `http://www.projecte3.cat/api/scrapper/?lang=${lang}&checkpoint=${input}`, true);
  checkpointRequest.onload = processJSON;
  checkpointRequest.send();
}
