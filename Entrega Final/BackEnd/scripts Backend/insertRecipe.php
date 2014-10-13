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

$folder = "images/";
$path = $folder . basename($_FILES['image']['name']);
  
$title = $_POST['Title'];
$recipeOwner = $_POST['RecipeOwner']; 
$recipeCode = md5($title.$recipeOwner);
$video = $_POST['VideoURL'];
$description = $_POST['Description'];
$time = $_POST['Duracion'];
$image = $_FILES['image']['name'];
$step = $_POST['PasosReceta'];
$tag = $_POST['ArrayTags'];
$ingredients = $_POST['ArrayIngredientes'];


move_uploaded_file($_FILES['image']['tmp_name'],$path);

/*$nombreReceta= $_POST['nombreReceta'];
$descripcionReceta= $_POST['descripcionReceta'];
$duracionReceta= $_POST['duracionReceta'];
$nivelReceta = $_POST['nivelReceta'];
$etiquetas = $_POST['etiquetas'];
$procedimiento = $_POST['pasos'];
$ingredientes = $_POST['ingredientes'];*/

$tagArray = explode(",", $tag);
$stepArray = explode(",", $step);
$ingredientsAux = explode(",",$ingredients);


$time = (int)$time;

//insert receta
$sql = "INSERT INTO Recipe(Tittle,RecipeOwner,RecipeCode,VideoURL,Description,PositiveRating,NegativeRating,TimeLength,Image) VALUES('$title','$recipeOwner','$recipeCode','$video','$description',0,0,$time,'$image')";

mysql_query($sql);

$sql = "SELECT idUser FROM User WHERE UserCode = '$recipeOwner'";
$result = mysql_query($sql,$dbhandle);
$row = mysql_fetch_array($result);

$iduser = $row['idUser'];

$sql = "SELECT last_insert_id() as idRecipe FROM Recipe";

$result = mysql_query($sql,$dbhandle);

$row = mysql_fetch_array($result);

$idrecipe = $row['idRecipe'];

$sql = "INSERT INTO UserxRecipe(idUser,idRecipe) VALUES($iduser,$idrecipe)";
mysql_query($sql,$dbhandle);

//insercion de steps
for($i = 0; $i < count($stepArray); $i++)
{
	if($stepArray[$i] == "")
	{
		break;
	}
	$sql = "INSERT INTO RecipeStep (idRecipe,StepDescription,Image) VALUES($idrecipe,'$stepArray[$i]',NULL)";
	mysql_query($sql,$dbhandle);
}


//insercion de tags
$idTag;
for($i = 0;$i < count($tagArray); $i++)
{
	if($tagArray[$i] == "")
	{
		break;
	}
	$sql = "SELECT idTag, Name FROM Tag WHERE Name ='$tagArray[$i]'";
	$result = mysql_query($sql,$dbhandle);
	
	if(mysql_num_rows($result) > 0)
	{
		$row = mysql_fetch_array($result);
		$idTag = $row['idTag'];
		
		$sql = "INSERT INTO RecipexTag(idRecipe,idTag) VALUES($idrecipe,$idTag)";
		mysql_query($sql,$dbhandle);
	}
	else
	{
		$sql = "INSERT INTO Tag(Name) VALUES('$tagArray[$i]')";
		mysql_query($sql,$dbhandle);
		
		$sql = "SELECT last_insert_id() as idTag FROM Tag LIMIT 1";
		$result = mysql_query($sql,$dbhandle);
		$row = mysql_fetch_array($result);
		$idTag = $row['idTag'];
		
		$sql = "INSERT INTO RecipexTag(idRecipe,idTag) VALUES($idrecipe,$idTag)";
		mysql_query($sql,$dbhandle);
	}
}

$quantity;
$measure;
$ingredientName;
$idIngredient;
//insercion de ingredientes
for($i = 0; $i < count($ingredientsAux); $i++)
{
	if($ingredientsAux[$i] == "")
	{
		break;
	}
	$ingredientArray = explode(".",$ingredientsAux[$i]); 
	$quantity = $ingredientArray[0];
	$measure = $ingredientArray[1];
	$ingredientName = $ingredientArray[2];
	
	$sql = "INSERT INTO Ingredient(Name,Image,Quantity,MeasureUnit) VALUES('$ingredientName',NULL,$quantity,'$measure')";
	mysql_query($sql,$dbhandle);
	
	$sql = "SELECT last_insert_id() as id FROM Ingredient LIMIT 1";
	$result = mysql_query($sql,$dbhandle);
	$row = mysql_fetch_array($result);
	$idIngredient = $row['id'];
	
	$sql = "INSERT INTO IngredientxRecipe(idIngredient,idRecipe) VALUES($idIngredient,$idrecipe)";
        mysql_query($sql,$dbhandle);
}

mysql_close($dbhandle);
?>	