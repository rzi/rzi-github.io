var table = document.getElementById("table");
(async () => {
  const rawResponse = await fetch("https://tempapi.ct8.pl/getlast", {
    method: "get",
  });
  const content = await rawResponse.json();
  console.log("getlast" + Object.entries(content[0]));
  if (content) {
    var loader=  document.getElementById("loader");
    // loader.style.display = 'none';
    loader.classList.remove("loader");

  }
  createTable(content);
})();

function createTable(content) {
  var tbl = document.createElement("table");
  tbl.setAttribute("class", "tableClass");
  tbl.setAttribute("id", "tableId");

  var theadData = ["id", "data i godz", "nr_hex", "temp", "nr czujnika", "pomieszczenie"];
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
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");
    td1.appendChild(document.createTextNode(content[i].id));
    td2.appendChild(document.createTextNode(fnTimeConv (content[i].my_epoch)));
    td3.appendChild(document.createTextNode(content[i].nr_hex));
    td4.appendChild(document.createTextNode(content[i].temp));
    td5.appendChild(document.createTextNode(content[i].nr_czujnika));
    td6.appendChild(document.createTextNode(content[i].my_pomieszczenie));
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    tbl.appendChild(tr);
  }
  table.appendChild(tbl);
}
function fnTimeConv (label2){
  // Convert timestamp to milliseconds label2 = timestamp
  //var tz = new Date().getTimezoneOffset()/-60;
  var date = new Date(label2*1000);
  var year = date.getFullYear();
  var month = date.getMonth();
    month=month+1;
    if (month<10){
      month="0"+month;
    }
  var day = date.getDate();
    if (day<10){
        day="0"+day;
    }
  var hours = date.getHours()//+ tz;
  var minutes = "0" + date.getMinutes();
  var convdataTime = year+'-'+month+'-'+day+' '+hours + ':' + minutes.substr(-2);
  return convdataTime;
}