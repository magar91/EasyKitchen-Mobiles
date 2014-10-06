var cantidadPasos = 1;
var PasosReceta = new Array();
var arrayIngredientes = new Array();
var arrayTags = new Array();
var user = localStorage.getItem("user");
var pictureSource;
var destinationType;

document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("backbutton", onBackKeyDown, false);

function onDeviceReady() {

    pictureSource= navigator.camera.PictureSourceType;
    destinationType= navigator.camera.DestinationType;
}

function openStepDialog()
{    
              var recipeStepDesc = $("#StepDescription").val();
                PasosReceta.push(recipeStepDesc); 
                $("#StepDescription").val(" ");

                var modified = $("#accordion").html();

                modified += '<div class="panel panel-default">';
                modified += '<div class="panel-heading">';
                modified += '<h4 class="panel-title">';
                modified += '<a data-toggle="collapse" data-parent="#accordion" href="#collapse'+PasosReceta.length+'">';
                modified += 'Step '+PasosReceta.length;
                modified += '</a>';
                modified += '</h4>';
                modified += '</div>';
                modified += '<div id="collapse'+PasosReceta.length+'" class="panel-collapse collapse in">';
                modified += '<div class="panel-body">';               
                modified += recipeStepDesc;
                modified +=  '</div>';
                modified +=  '</div>';
                modified +=  '</div>';
                $("#accordion").html(modified);
    
}

function openIngDialog()
{
    var DOM = $("#ingSelect");
    var ingrediente = document.getElementById("cantIngredienteId").value+".";
    ingrediente+= document.getElementById("unidadIngredienteId").value+".";
    ingrediente+= document.getElementById("nombreIngredienteId").value;
    $("#cantIngredienteId").val(" ");
    $("#unidadIngredienteId").val(" ");
    $("#nombreIngredienteId").val(" ");
    arrayIngredientes.push(ingrediente);
    DOM.append("<li class='ui-widget-content'>"+ingrediente+"</li>");
}

function addTag()
{
    var tag = document.getElementById("TagsRecipeId").value;
    $("#TagsRecipeId").val("");
    arrayTags.push(tag);
    
    var DOM = $("#selectable");
    DOM.append("<li class='ui-widget-content'>"+tag+"</li>");       
    
}


function ajaxRequest() {
    var activexmodes = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"]; //activeX versions to check for in IE
    if (window.ActiveXObject) { //Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken)
        for (var i = 0; i < activexmodes.length; i++) {
            try {
                return new ActiveXObject(activexmodes[i]);
            }
            catch (e) {
                //suppress error
            }
        }
    }
    else if (window.XMLHttpRequest) // if Mozilla, Safari etc
        return new XMLHttpRequest();
    else
        return false;
}

function ajaxAddRecipePost() {
    var mypostrequest=new ajaxRequest();
    mypostrequest.onreadystatechange=function(){
        if (mypostrequest.readyState==4){
            if (mypostrequest.status==200 || window.location.href.indexOf("http")==-1){
                //document.getElementById("result").innerHTML = mypostrequest.responseText;
                //alert(mypostrequest.responseText);
            }
            else{
                alert("An error has occured making the request");
            }
        }
    }
    
    var formData = new FormData();
    
    var name = document.getElementById("nameRecipeId").value;
    var description = document.getElementById("descriptionRecipeId").value;
    var duration = document.getElementById("durationRecipeId").value;
    var nivel = document.getElementById("NivelId").value;
    var pasos = "";
    for(i = 0; i < PasosReceta.length; i++)
    {
        pasos+= PasosReceta[i]+",";
    }
    alert(pasos);
    var Ingredientes = "";
    for(i = 0; i < arrayIngredientes.length; i++)
    {
        Ingredientes+= arrayIngredientes[i]+",";
    }
    alert(Ingredientes);
    var Tags = "";
    for(i = 0; i < arrayTags.length; i++)
    {
        Tags += arrayTags[i]+",";
    }
    alert(Tags);
    
    //var fileInput = document.getElementById("imageRecipeId");
    //var file = fileInput.files[0];
    var file = null;
    formData.append("Title", name);
    formData.append("RecipeOwner", user);
    formData.append("Description", description);
    formData.append("Duracion", duration);
    formData.append("Dificultad",nivel);
    formData.append("image", file);
    formData.append("PasosReceta",pasos);
    formData.append("ArrayTags", Tags );
    formData.append("ArrayIngredientes", Ingredientes);
    
    $.ajax({
        url : "http://www.easykitchenapp.com/insertRecipe.php",
        type: "POST",
        dataType: "json",
        data: formData,
        processData: false,
        contentType: false,
        success:function(){
            alert("guarde en la base");
        }        
    });
    window.location.replace("Lista_Recetas.html");
    
}

function cancelar(){
    window.location.replace("Lista_Recetas.html");
}

function nobackbutton() {
    window.location.hash = "no-back-button";
    window.location.hash = "Again-No-back-button" //chrome
    window.onhashchange = function () { window.location.hash = "no-back-button"; }
}