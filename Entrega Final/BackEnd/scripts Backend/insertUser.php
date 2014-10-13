<?php

header('Access-Control-Allow-Origin: *');
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


$user = $_POST['userName'];
$lastname = $_POST['userLastName'];
$fullname = $user.$lastname;
$userC = md5($fullname);
$description = "estoy en easykitchen.com";

$sql = "SELECT UserCode FROM User WHERE UserCode = '$userC'";
$result = mysql_query($sql,$dbhandle);

$arr = array();
if(mysql_num_rows($result) > 0)
{
	while($row = mysql_fetch_array($result))
	{
		$arr[] = $row;
	}
	echo $arr['UserCode'];
}
else
{
	$sql = "INSERT INTO User(UserCode,Name,LastName,Description,Image) VALUES('$userC','$user','$lastname','$description',NULL)";
	mysql_query($sql,$dbhandle);
	
	echo $userC;
}
mysql_close($dbhandle);
?>