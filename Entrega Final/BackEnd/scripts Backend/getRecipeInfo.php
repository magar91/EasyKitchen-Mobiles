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



$recipeCode = $_POST['RecipeCode'];


$sql = "SELECT Tittle, RecipeOwner, VideoURL, Description, PositiveRating, NegativeRating, TimeLength FROM Recipe WHERE RecipeCode = '$recipeCode'";

$result = mysql_query($sql,$dbhandle);

$row = mysql_fetch_array($result);


mysql_close($dbhandle);
echo json_encode($row)."?";
?>