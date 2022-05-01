$(document).ready(function () {
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
  //js koniec

  var obiekt;
  var godzina;
  var godzina2;
  obiekt=2;
  var teraz = new Date;
  var godzina = getTime2();
  var godzina2 = getTime();

  var timeControl = document.querySelector('input[type="time"]');
  timeControl.value = godzina ;

  var timeControl2 = document.querySelector('input[type="time"].timepicker2');
  timeControl2.value = godzina2;

  var dzien = teraz.getFullYear() + '-' + ((teraz.getMonth() < 10 ? '0' : '') + (teraz.getMonth() + 1)) + '-' + ((teraz.getDate() < 10 ? '0' : '') + teraz.getDate());

  var wczoraj = teraz.getFullYear() + '-' + ((teraz.getMonth() < 10 ? '0' : '') + (teraz.getMonth() + 1)) + '-' + ((teraz.getDate() < 10 ? '0' : '') + teraz.getDate());

  var dateControl = document.querySelector('input[type="date"]');
  dateControl.value = wczoraj;

  var dateControl2 = document.querySelector('input[type="date"].datepicker2');
  dateControl2.value = dzien;

  $("#objektPomiarowy").click (function(){
    var sel = document.getElementById('objektPomiarowy');
    var x = document.getElementById("objektPomiarowy").selectedIndex;
    var y = document.getElementById("objektPomiarowy").options;
//    alert("Index: " + y[x].index );
    obiekt=y[x].index
  });

  $('#timepicker1').change (function(){
    godzina=document.getElementById("timepicker1").value;
  });

  $('#timepicker2').change (function(){
    godzina2=document.getElementById("timepicker2").value;
  });

  $('#datepicker1').change (function(){
    wczoraj=document.querySelector('input[type="date"]').value;
  });

  $('#datepicker2').change (function(){
    dzien=document.querySelector('input[type="date"]').value;
  });

  $("#przycisk2").click(function () {
  var j;
    for (j=0;j<1440;j++){
         chart.data.labels.splice(j,1);
         chart.data.datasets[0].data.splice (j,1);
    }
  chart.update();
  });

  $("#przycisk1").click(function () {
    //alert("przycisk1");
    var i=0;
    var j;
    var k;
    $.ajax({
      async: true,   // this will solve the problem
      type: "GET",
      dataType : 'json',
      url: "zapytanie.php",
  	  data: {
        obiekt: obiekt,
        wczoraj:wczoraj,
        dzien: dzien,
        godzina: godzina,
        godzina2: godzina2
        },
      success: function (response1) {

        $.each(response1, function (key, data1) {
          data2=chart.data.datasets[0].data[i] =data1;
          label3 = fnTimeConv(key);
//          console.log(label3);
//          console.log(data2);
          chart.data.labels[i]=label3;
          i=i+1;
        })
        chart.update();
        },
      fail: function (blad) {
        alert("Wystąpił błąd");
        console.log(blad);
      }
    }); // koniec ajax
  }); //koniec  przycisk 1

// funkcje
  function getTime() {
    var godz=teraz.getHours();
		if (godz<10){
			godz="0"+godz;
		}
	var min=teraz.getMinutes();
		if (min<10){
			min="0"+min;
		}
	var wynik=godz+":"+min+":00";

    return (wynik);
  }
  function getTime2() {
    var godz=teraz.getHours();
    godz=godz-1;
    if (godz<10){
      godz="0"+godz;
    }
    var min=teraz.getMinutes();
    if (min<10){
      min="0"+min;
    }
    var wynik=godz+":"+min+":00";

    return (wynik);
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

}); /*Klamra zamykająca $(document).ready(function(){*/
