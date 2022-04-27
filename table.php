<!doctype html>
<html lang="pl-PL">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="/css/normalize.css" type="text/css" />
  <link rel="stylesheet" href="/css/style.css" type="text/css" />
  <title>Odczyt czujników</title>
</head>
<body>
  <div class="container">
    <a href="heating.html">Powrót</a>
    <div class="table-responsive" >
    <?php
    // Łączymy się z bazą danych
	require "connection_pi_base.php";
	connection_pi_base();
	//SELECT `my_epoch`,`nr_hex` ,`temp`,`my_pomieszczenie` FROM pomiary2 JOIN pomieszczenie ON pomiary2.id=pomieszczenie.id ORDER BY pomiary2.id DESC LIMIT 29
   	//$wynik1 = mysql_query("select *cz.nr_hex, cz.numer,cz.nr_odczyt, n.nazwa, cz.data, cz.czas
	if ($wynik1 = mysqli_query($link,"SELECT * FROM pomiary2 LEFT OUTER JOIN pomieszczenie  ON pomiary2.nr_czujnika=pomieszczenie.my_nr_dec ORDER BY pomiary2.id DESC LIMIT 25")){
		if(mysqli_num_rows($wynik1) > 0) {
			echo '<table >';
			echo '<caption> Tabela zainstalowanych czujników</caption>';
			echo '<tr>';
//			echo '<td> Nr. zapisu </td>';
			echo '<td> Temp.</td>';
			echo '<td> Nr. Dec czujnika</td>';
			echo '<td> Nr. Hex czujnika</td>';
//			echo '<td> EPOCH</td>';
			echo '<td> Czas zapisu</td>';
			echo '<td> Pomieszczenie</td>';
			echo '</tr>';
			while($r = mysqli_fetch_assoc($wynik1)) {
				echo '<tr >';
//				echo '<td>';
//				echo $r['id'];
//				echo '</td>';
				echo '<td>';
				echo $r['temp'];
				echo '</td>';
				echo '<td>';
				echo $r['nr_czujnika'];
				echo '</td>';
				echo '<td>';
				echo $r['nr_hex'];
				echo '</td>';
//				echo '<td>';
//				echo $r['my_epoch'];
//				echo '</td>';
				echo '<td>';
				//echo $r['time'];
				$timestamp=$r['my_epoch'];
				echo date('Y-m-d H:i:s', $timestamp);
				echo '</td>';
				echo '<td>';
				echo $r['my_pomieszczenie'];
				echo '</td>';
				echo '</tr>';
			}
		echo '</table>';
		}
	}
mysqli_close($link);
?>
    </div>
  </div>
</body>
</html>
