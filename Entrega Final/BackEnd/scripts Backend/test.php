<?php

$mysql_host = "mysql8.000webhost.com";
$mysql_database = "a8526269_DB";
$mysql_user = "a8526269_DB";
$mysql_password = "moviles2014";

//conexion a la base de datos
$dbhandle = mysql_connect($mysql_host, $mysql_user, $mysql_password) 
  or die("Unable to connect to MySQL");
echo "Connected to MySQL<br>";

//seleccion de base de datos
$selected = mysql_select_db($mysql_database,$dbhandle) 
  or die("Could not select $mysql_database");


$user = $_POST['Name'];
$nameArray = explode(" ",$user);
$userName = $nameArray[0];
$lastName = $nameArray[1];
$userC = md5($userName.$lastName);
$description = "estoy en easykitchen.com";
$image = $_POST['Image'];

$sql = "SELECT UserCode FROM Recipe WHERE UserCode = '$userC'";
$result = mysql_query($sql,$dbhandle);

echo "user: $userC";

if(mysql_num_rows($result) > 0)
{
	print_r(json_encode($userC));
}
else
{
	$sql = "INSERT INTO User(UserCode,Name,LastName,Description,Image) VALUES('$userC','$userName','$lastName','$description',$image)";
	mysql_query($sql,$dbhandle);
	print_r(json_encode($userC));
}

/*$result = mysql_query("SELECT idUser FROM User WHERE UserCode = '$userCode'");

$resultArray = array();
while($row = mysql_fetch_array($result))
{
echo " " . $row['idUser'];
$resultArray[] = $row;
}

echo json_encode($resultArray);*/


mysql_close($dbhandle);
?>						