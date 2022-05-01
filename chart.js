var roomSelect = document.getElementById("objektPomiarowy");
var dateFrom = document.getElementById("datepicker1");
var dateTo = document.getElementById("datepicker2");
var timeFrom = document.getElementById("timepicker1");
var timeTo = document.getElementById("timepicker2");
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
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ obiekt: obiekt, epochFrom: " " , epochTo: " " }),
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

roomSelect.addEventListener("change", function(){
  getData();
  console.log(`dateFrom.value=${dateFrom.value}`)
  console.log(`timeFrom.value=${timeFrom.value}`)
  var dataFrom1 = calcEpoch(dateFrom.value, timeFrom.value);
  console.log(`dataFrom1 ${dataFrom1}`)

  var dataTo1 =calcEpoch(dateTo.value, timeTo.value)
  console.log(`dataTo1 ${dataTo1}`)
});

function calcEpoch(date, time){
var dateString =date+"T"+time
console.log(`dateString=${dateString}`)
convertFromStringToDate(dateString)
console.log(`convertFromStringToDate(dateString)= ${convertFromStringToDate(dateString)}`)
}

function convertFromStringToDate(responseDate) {
  let dateComponents = responseDate.split('T');
  let datePieces = dateComponents[0].split("-");
  let timePieces = dateComponents[1].split(":");
  return(new Date(datePieces[2], (datePieces[1] - 1), datePieces[0],
                       timePieces[0], timePieces[1], timePieces[2]))
}
