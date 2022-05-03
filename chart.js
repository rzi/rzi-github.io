var roomSelect = document.getElementById("objektPomiarowy");
var dateFrom = document.getElementById("datepicker1");
var dateTo = document.getElementById("datepicker2");
var timeFrom = document.getElementById("timepicker1");
var timeTo = document.getElementById("timepicker2");
var btn1=document.getElementById("przycisk1");
var btn2=document.getElementById("przycisk2");
var dataFrom1,dataTo1;
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Pomiar temperatury',
      borderColor: 'rgb(55, 39, 250)',
      data: [0, 10, 5, 2, 20, 30, 45],
      fill: false
    }]
  },
  // Configuration options go here
  options: {}
});
fetch("https://tempapi.ct8.pl/getrooms")
  .then((res) => res.json())
  .then((res) => {
    res.forEach(addToSelect);
    getDatePicker();
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
      body: JSON.stringify({ obiekt: obiekt, epochFrom: dataFrom1, epochTo: dataTo1}),
    });
    const content = await rawResponse.json();
    console.log(content);
    chartUpdate(content);
  })();
}
function addToSelect(item) {
  var myOption = document.createElement("option");
  myOption.text = item.my_pomieszczenie;
  myOption.value = item.my_nr_dec;
  roomSelect.add(myOption);
}
roomSelect.addEventListener("change", function () {  
  getDatePicker();
  getData();
});
btn1.addEventListener("click", function () {
  getDatePicker();
  getData();
});
btn2.addEventListener("click" ,function(){
  var j;
  for (j=0;j<1440;j++){
       chart.data.labels.splice(j,1);
       chart.data.datasets[0].data.splice (j,1);
  }
chart.update();
})
function calcEpoch(date, time) {
  var dateString = date + "T" + time;
  console.log(`dateString=${dateString}`);
  return convertFromStringToDate(dateString);
}
function getDatePicker (){
  console.log(`dateFrom.value=${dateFrom.value}`);
  console.log(`timeFrom.value=${timeFrom.value}`);
  dataFrom1 = calcEpoch(dateFrom.value, timeFrom.value);
  console.log(`dataFrom1 ${dataFrom1}`);
  console.log(`dateTo.value=${dateTo.value}`);
  console.log(`timeTo.valuee=${timeTo.value}`);
  dataTo1 = calcEpoch(dateTo.value, timeTo.value);
  console.log(`dataTo1 ${dataTo1}`);
}
function convertFromStringToDate(responseDate) {
  let dateComponents = responseDate.split("T");
  let datePieces = dateComponents[0].split("-");
  let timePieces = (dateComponents[1].split(":"));
  return new Date(
    datePieces[0],
    datePieces[1] - 1,
    datePieces[2],
    timePieces[0],
    timePieces[1],
    timePieces[2],
  );
}
function chartUpdate(content){
  console.log(`content1=${content[0].temp}`)
  console.log(`content.lenght=${Object.keys(content).length}`)
  for (i=0; i< Object.keys(content).length;i++){
    chart.data.datasets[0].data[i] =content[i].temp;
    const my_date = fnTimeConv(content[i].my_epoch);
    chart.data.labels[i]=my_date;
    console.log(`chart.data.datasets[0].data[i]=${chart.data.datasets[0].data[i]}`)
  }
  chart.update();
}
function fnTimeConv (label2){
  // Convert timestamp to milliseconds label2 = timestamp
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
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var convdataTime = year+'-'+month+'-'+day+' '+hours + ':' + minutes.substr(-2);
  return convdataTime;
}