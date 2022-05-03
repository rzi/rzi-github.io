var table = document.getElementById("table");
(async () => {
  const rawResponse = await fetch("https://tempapi.ct8.pl/getlast", {
    method: "get",
  });
  const content = await rawResponse.json();
  console.log(content);
  createTable(content);
})();

function createTable(content) {
  var tbl = document.createElement("table");
  tbl.setAttribute("class", "tableClass");
  tbl.setAttribute("id", "tableId");

  var theadData = ["id", "my_epoch", "nr_hex", "temp"];
  var thead = document.createElement("thead");
  var theadTr = document.createElement("tr");
  for (t = 0; t < theadData.length; t++) {
    var td = document.createElement("td");
    td.innerText = theadData[t];
    theadTr.appendChild(td);
  }
  thead.appendChild(theadTr);
  tbl.appendChild(thead);
  for (var i = 0; i < Object.keys(content).length; i++) {
    tr = document.createElement("tr");

    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    td1.appendChild(document.createTextNode(content[i].id));
    td2.appendChild(document.createTextNode(content[i].my_epoch));
    td3.appendChild(document.createTextNode(content[i].nr_hex));
    td4.appendChild(document.createTextNode(content[i].temp));
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    tbl.appendChild(tr);
  }
  table.appendChild(tbl);
}
