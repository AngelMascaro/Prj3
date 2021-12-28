const checkpointRequest = new XMLHttpRequest();
let lang = "";
function processJSON() {
  // request failed
  if (this.status == !200) return "Error";
  // remove children from tbody
  while (checkpointData.firstChild)
    checkpointData.removeChild(checkpointData.lastChild);
  // get JSON obj
  let checkpoint = JSON.parse(checkpointRequest.responseText);
  console.log(checkpoint);

  // build table
  checkpointName.innerText = checkpoint.title;
  checkpointPhoto.src = checkpoint.image;
  checkpointSymbol.src = checkpoint.symbol;
  for (label in checkpoint.data) {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    let td = document.createElement("td");
    th.innerText = label;
    td.innerText = checkpoint.data[label];
    tr.appendChild(th);
    tr.appendChild(td);
    checkpointData.appendChild(tr);
  }
}
// on button click
function loadCheckpoint(e) {
  // Set params
  let input = document.getElementById("checkpoint").value;
  if (Cookies.get("lang")) lang = Cookies.get("lang");
  else lang = "en";
  // Prepare and send request
  checkpointRequest.open(
    "GET",
    `http://www.projecte3.cat/api/scrapper/?lang=${lang}&checkpoint=${input}`,
    true
  );
  checkpointRequest.onload = processJSON;
  checkpointRequest.send();
}
