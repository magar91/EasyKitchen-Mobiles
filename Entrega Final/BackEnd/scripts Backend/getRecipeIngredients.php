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
  
$recipeCode = $_POST['RecipeCode'];

$sql = "SELECT idRecipe FROM Recipe WHERE RecipeCode = '$recipeCode'";
$result = mysql_query($sql,$dbhandle);
$row = mysql_fetch_array($result);

$idRecipe = $row['idRecipe'];

$sql = "SELECT i.Name FROM Ingredient i INNER JOIN IngredientxRecipe ir ON i.idIngredient = ir.idIngredient INNER JOIN Recipe r ON r.idRecipe = ir.idRecipe WHERE r.idRecipe = $idRecipe";  

$result = mysql_query($sql,$dbhandle);
$resultArray = array();
while($row = mysql_fetch_array($result))
{
	$resultArray[] = $row;
}
echo json_encode($resultArray)."?";
mysql_close($dbhandle);
?>