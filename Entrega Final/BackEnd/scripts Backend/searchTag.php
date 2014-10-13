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
  
$searchTag = $_GET['tag'];

$sql = "SELECT r.Tittle,r.Image,r.PositiveRating FROM Recipe r INNER JOIN RecipexTag rt
ON r.idRecipe = rt.idRecipe INNER JOIN Tag t ON t.idTag = rt.idTag WHERE t.Name = '$searchTag' ORDER BY r.PositiveRating";  

$result = mysql_query($sql,$dbhandle);
$resultArray = array();
while($row = mysql_fetch_array($result))
{
	$resultArray[] = $row;
}
echo json_encode($resultArray);
mysql_close($dbhandle);
?>