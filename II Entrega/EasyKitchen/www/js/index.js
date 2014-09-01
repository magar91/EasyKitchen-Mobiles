var ingredientes= "";
var procedimientos = "";
var cantidadPasos = 1;

function nobackbutton() {
    window.location.hash = "no-back-button";
    window.location.hash = "Again-No-back-button" //chrome
    window.onhashchange = function () { window.location.hash = "no-back-button"; }
}

function LoginFb() {
    location.href = "Lista_Recetas.html";
}

function agregarReceta() {
    location.href = "Agregar_Receta.html";
}

function agregarIngrediente() {
    ingredientes += "<div class=\"row\">";
    ingredientes += "<div class=\"col-md-1\"><input id=\"cantIngredienteId\" type=\"text\" class=\"form-control\" placeholder=\"Cantidad\"></div>";
    ingredientes += "<div class=\"col-md-2\"><input id=\"unidadIngredienteId\" type=\"text\" class=\"form-control\" placeholder=\"Unidad\"></div>";
    ingredientes += "<div class=\"col-md-3\"><input id=\"nombreIngredienteId\" type=\"text\" class=\"form-control\" placeholder=\"Nombre\"></div>";
    ingredientes += "</div>";
    ingredientes += "<p>&nbsp;</p>";
    $("#componenteIngrediente").html(ingredientes);
}

function guardarReceta() {
    ingredientes = "";
    procedimientos = "";
    cantidadPasos = 1;
    var nombreReceta = document.getElementById("nameRecipeId").value;
}

function agregarProcedimiento() {
    procedimientos += "<div class=\"row\">";
    procedimientos += "<div class=\"col-md-1\"><p>Paso " + cantidadPasos + "</p></div>";
    procedimientos += "<div class=\"col-md-5\"><input id=\"descripcionPasoId\" type=\"text\" class=\"form-control\" placeholder=\"Descripcion\"></div>";
    procedimientos += "</div>";
    procedimientos += "<p>&nbsp;</p>";
    $("#componenteProcedimiento").html(procedimientos);
    cantidadPasos++;
}

function cancelar() {
    location.href = "Lista_Recetas.html";
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

function ajaxget() {
    var mygetrequest = new ajaxRequest();
    mygetrequest.onreadystatechange = function () {
        if (mygetrequest.readyState == 4) {
            if (mygetrequest.status == 200 || window.location.href.indexOf("http") == -1) {
                //document.getElementById("result").innerHTML = mygetrequest.responseText;
                //alert(mygetrequest.responseText);
            }
            else {
                alert("An error has occured making the request");
            }
        }
    }
    var name = encodeURIComponent(document.getElementById("nameRecipeId").value);
    mygetrequest.open("GET", "http://www.easykitchenapp.com/create_recipe.php?nombreReceta=" + name, true);
    mygetrequest.send(null);
    alert(mygetrequest.responseText);
}

function ajaxpost(){
    var mypostrequest=new ajaxRequest();
    mypostrequest.onreadystatechange=function(){
        if (mypostrequest.readyState==4){
            if (mypostrequest.status==200 || window.location.href.indexOf("http")==-1){
                //document.getElementById("result").innerHTML = mypostrequest.responseText;
                alert(mypostrequest.responseText);
            }
            else{
                alert("An error has occured making the request");
            }
        }
    }
    
    var name = encodeURIComponent(document.getElementById("nameRecipeId").value);
    var parameters = "nombreReceta=" + name;
    mypostrequest.open("POST", "http://www.easykitchenapp.com/create_recipe.php", true);
    mypostrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    mypostrequest.send(parameters);
    alert(mypostrequest.responseText);
}

