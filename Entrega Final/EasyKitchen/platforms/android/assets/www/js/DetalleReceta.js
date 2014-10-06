document.addEventListener("deviceready", onDeviceReady, false);
var RecipeCode = window.localStorage.getItem("CodigoReceta");
var titulo; 
var ReciperOwner;
var videoURL;
var Descripccion;
var Rating;
var TimeLength;
var recipeSteps;
var recipeIngredients;
var recipePicture;
var ownership;
var Tags;

function onDeviceReady() {
    // Now safe to use the PhoneGap API
    // codigo receta es con lo que usted debe hacer el query en la base de datos cuando le retorne el json con todos los detalles
    // retorno es una variable que utilizo como si fuera el Json que regresa el query.
    
    dataform = new FormData();
    dataform.append("RecipeCode",RecipeCode);
    var infoReceta;
    
    $.ajax({
            url : "http://easykitchenapp.com/getRecipeInfo.php",
            type : "POST",
            //dataType: "json",
            data : dataform,
            processData: false,
            contentType: false,
            success : function(result){
                var info = result.split("?");
                infoReceta = JSON.parse(info[0]);
                
                titulo = infoReceta['Tittle'];
                RecipeOwner =infoReceta['RecipeOwner'];
                videoURL = infoReceta['VideoURL'];
                Descripccion = infoReceta['Description'];
                Rating = infoReceta['PositiveRating'];
                TimeLength = infoReceta['TimeLength'];
                recipePicture = infoReceta['Image'];
                
                
                document.getElementById("nameRecipeId").value = titulo;
                document.getElementById("recipeImage").src = "https://www.easykitchen.com/images/"+recipePicture;
                document.getElementById("descriptionRecipeId").value = Descripccion;
                document.getElementById("durationRecipeId").value = TimeLength;
                document.getElementById("ratingId").value = Rating;
    
            },
            error : function(e){
                alert("falle horriblemente");
            }
                    
    });
    
    dataform = new FormData();
    dataform.append("RecipeCode",RecipeCode);
    var tagList;
    
    $.ajax({
            url : "http://easykitchenapp.com/getRecipeTag.php",
            type : "POST",
            //dataType: "json",
            data : dataform,
            processData: false,
            contentType: false,
            success : function(result){
                var info = result.split("?");
                tagList = JSON.parse(info[0]);
                
                
                var DOM = $("#tagsContainer");
                DOM.append("<ol class='selectable'>");
                for(var i = 0; i < tagList.length; i++)
                {
                    DOM.append("<li class='ui-widget-content'>"+tagList[i]['Name']+"</li>");       
                }
                DOM.append("</ol>");
    
            },
            error : function(e){
                alert("falle horriblemente");
            }
                    
    });
    
    
    dataform = new FormData();
    dataform.append("RecipeCode",RecipeCode);
    var ingredientList;
    
    $.ajax({
            url : "http://easykitchenapp.com/getRecipeIngredients.php",
            type : "POST",
            //dataType: "json",
            data : dataform,
            processData: false,
            contentType: false,
            success : function(result){
                var info = result.split("?");
                ingredientList = JSON.parse(info[0]);
                
                
                DOM = $("#ingredientsContainer");
    
                DOM.append("<ol class='selectable'>");
                for(var i= 0; i < ingredientList.length; i++)
                {
                    DOM.append("<li class='ui-widget-content'>"+ingredientList[i]['Name']+"</li>");
                }
    
            },
            error : function(e){
                alert("falle horriblemente");
            }
                    
    });
    
    
    dataform = new FormData();
    dataform.append("RecipeCode",RecipeCode);
    var stepList;
    
    $.ajax({
            url : "http://easykitchenapp.com/getRecipeSteps.php",
            type : "POST",
            //dataType: "json",
            data : dataform,
            processData: false,
            contentType: false,
            success : function(result){
                var info = result.split("?");
                stepList = JSON.parse(info[0]);
                
                
                DOM.append("</ol>");
    
                DOM = $("#accordion").html();

                for(var i = 0; i < stepList.length; i++)
                {
                    DOM += '<div class="panel panel-default">';
                    DOM += '<div class="panel-heading">';
                    DOM += '<h4 class="panel-title">';
                    DOM += '<a data-toggle="collapse" data-parent="#accordion" href="#collapse'+i+'">';
                    DOM += 'Step '+i;
                    DOM += '</a>';
                    DOM += '</h4>';
                    DOM += '</div>';
                    DOM += '<div id="collapse'+i+'" class="panel-collapse collapse in">';
                    DOM += '<div class="panel-body">';               
                    DOM += stepList[i]['StepDescription'];
                    DOM +=  '</div>';
                    DOM +=  '</div>';
                    DOM +=  '</div>';
                }
                $("#accordion").html(DOM);
                
            },
            error : function(e){
                alert("falle horriblemente");
            }
                    
    });
    
    
    
            
}
    
    

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    // Handle the back button
}