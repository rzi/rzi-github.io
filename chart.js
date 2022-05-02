var roomSelect = document.getElementById("objektPomiarowy");
var dateFrom = document.getElementById("datepicker1");
var dateTo = document.getElementById("datepicker2");
var timeFrom = document.getElementById("timepicker1");
var timeTo = document.getElementById("timepicker2");
var btn1=document.getElementById("przycisk1");
var dataFrom1,dataTo1;

fetch("https://tempapi.ct8.pl/getrooms")
  .then((res) => res.json())
  .then((res) => {
    res.forEach(addToSelect);
    getData();
  });
function getData() {
  var sel = document.getElementById("objektPomiarowy");
  var obiekt = sel.options[sel.selectedIndex].value;
  console.log(`obiekt=${obiekt}`);
  (async () => {
    const rawResponse = await fetch("https://tempapi.ct8.pl/gettemp", {
      method: "POST",
      mode: 'no-cors',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ obiekt: obiekt, epochFrom: dataFrom1, epochTo: dataTo1}),
    });
    const content = await rawResponse.json();

    console.log(content);
  })();
}

function addToSelect(item) {
  var myOption = document.createElement("option");
  myOption.text = item.my_pomieszczenie;
  myOption.value = item.my_nr_dec;
  roomSelect.add(myOption);
}
roomSelect.addEventListener("change", function () {  
  console.log(`dateFrom.value=${dateFrom.value}`);
  console.log(`timeFrom.value=${timeFrom.value}`);
  dataFrom1 = calcEpoch(dateFrom.value, timeFrom.value);
  console.log(`dataFrom1 ${dataFrom1}`);
  console.log(`dateTo.value=${dateTo.value}`);
  console.log(`timeTo.valuee=${timeTo.value}`);
  dataTo1 = calcEpoch(dateTo.value, timeTo.value);
  console.log(`dataTo1 ${dataTo1}`);
  getData();
});
btn1.addEventListener("click", function () {
  getData();
});
function calcEpoch(date, time) {
  var dateString = date + "T" + time;
  console.log(`dateString=${dateString}`);
  return convertFromStringToDate(dateString);
}

function convertFromStringToDate(responseDate) {
  let dateComponents = responseDate.split("T");
  let datePieces = dateComponents[0].split("-");
  let timePieces = dateComponents[1].split(":");
  // console.log(`dzień=${datePieces[2]}`);
  // console.log(`miesiąc= ${datePieces[1] - 1}`);
  // console.log(`rok=${datePieces[0]}`);
  // console.log(`HH=${timePieces[0]}`);
  // console.log(`MM=${timePieces[1]}`);
  // console.log(`SS=${timePieces[2]}`);

  return new Date(
    datePieces[0],
    datePieces[1] - 1,
    datePieces[2],
    timePieces[0],
    timePieces[1],
    timePieces[2]
  );
}
