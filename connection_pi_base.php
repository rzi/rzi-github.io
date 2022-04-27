<?php
/******************************************************
* connection1.php
* konfiguracja połączenia z bazą danych
******************************************************/

function connection_pi_base() {
    // serwer
    $mysql_server = "www.mkwk019.cba.pl";
    // admin
    $mysql_admin = "Bazapi2019";
    // hasło
    $mysql_pass = "Bazapi2019";
    // nazwa baza
    $mysql_db = "elunch";
    // nawiązujemy połączenie z serwerem MySQL
    //@mysql_connect($mysql_server, $mysql_admin, $mysql_pass)
    //or die('<BR>Brak połączenia z serwerem MySQL.');
    // Łączymy się z bazą danych
    //@mysql_select_db($mysql_db)
    //or die('<br>Błąd wyboru bazy danych.');
	//echo '<br><BR>Poprawne połączenie z bazą danych<BR>';
global $link;
	$link = mysqli_connect("www.pi.cba.pl", "Bazapi2019", "Bazapi2019", "elunch");

if (!$link) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;

 exit;
}

//echo "Success: A proper connection to MySQL was made! The my_db database is great." . PHP_EOL;
//echo "Host information: " . mysqli_get_host_info($link) . PHP_EOL;

}

?>
