$(document).ready(function () {
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
