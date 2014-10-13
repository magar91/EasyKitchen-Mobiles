<?php
$mysql_host = "mysql8.000webhost.com";
$mysql_database = "a8526269_DB";
$mysql_user = "a8526269_DB";
$mysql_password = "moviles2014";

//conexion a la base de datos
$dbhandle = mysql_connect($mysql_host, $mysql_user, $mysql_password) 
  or die("Unable to connect to MySQL");

//seleccion de base de datos
$selected = mysql_select_db($mysql_database,$dbhandle) 
  or die("Could not select $mysql_database");
  
$name = $_GET['Name'];
$lastName = $_GET['LastName'];

$sql = "SELECT UserCode FROM User WHERE Name = '$name' AND LastName = '$lastName'";

$result = mysql_query($dbhandle,$sql);

if(mysql_num_rows($result) > 0)
{
	$row = mysql_fetch_array($result);
	$userCode = $row['UserCode'];
	echo json_encode($userCode);
}
else
{
	echo json_encode(false);
}
mysql_close($dbhandle);
?>