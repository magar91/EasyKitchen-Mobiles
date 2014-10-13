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


$userCode = $_POST['UserCode'];

$sql = "SELECT idUser FROM User WHERE UserCode = '$userCode'";
$result = mysql_query($sql,$dbhandle);
$row = mysql_fetch_array($result);

$idUser = $row['idUser'];

$sql = "SELECT r.Tittle, r.RecipeCode, r.Image FROM Recipe r INNER JOIN UserxRecipe ur ON r.idRecipe = ur.idRecipe INNER JOIN User u ON u.idUser = ur.idUser WHERE u.idUser = $idUser";  
$result = mysql_query($sql,$dbhandle);

$arr = array();

if(mysql_num_rows($result) > 0)
{
	while($row = mysql_fetch_array($result))
	{
		$arr[] = $row;
	}
	echo json_encode($arr)."?";
}
else
{
	echo '{ "Tittle" : null, "RecipeCode" : null, "Image" : null}'."?";
}

mysql_close($dbhandle);
?>