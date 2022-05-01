var roomSelect = document.getElementById("objektPomiarowy");
var dateFrom = document.getElementById("datepickre1");
var dateTo = document.getElementById("datepickre2");
var timeFrom = document.getElementById("timepickre1");
var timeTo = document.getElementById("timepickre2");
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
      body: JSON.stringify({ obiekt: obiekt, epochFrom: "Textual content" , epochTo: " " }),
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
  var dataFrom1 = calcEpoch(dateFrom.value, timeFrom.value);
  console.log(`dataFrom ${dataFrom1}`)

  var dataTo1 =calcEpoch(dateTo.value, timeTo.value)
  console.log(`dataTo ${dataTo1}`)
});

function calcEpoch(date, time){
var dateString =date+"T"+time 
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
