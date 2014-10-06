document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // Now safe to use the PhoneGap API
}

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    // Handle the back button
}

var cantRecetas = 0;

function search(){

    cantRecetas = 0;
    
    var query = document.getElementById("busquedaEtiqueta").value; //este es el query para buscar en la base de datos
    
    //esta esta la funcion que debe poner en interfaz lo q le devolvio el php, la variable value era la que usaba ajax
    //para el retorno pero usted usa la que use el Angular JS, esa variable listaRecetas deberia ser un array en el que
    //usted parsee el contenido del json que le llega desde el backend para cada receta.
    var dataform = new FormData();
    var listaRecetas;
    
    dataform.append("tag",query);
    $.ajax({
            url : "http://easykitchenapp.com/searchTag.php",
            type : "POST",
            //dataType: "json",
            data : dataform,
            processData: false,
            contentType: false,
            success : function(result){
                alert("sucess");
                var info = result.split("?");
                listaRecetas = JSON.parse(info[0]);
                
                
                var DOM = $("#recetas");
            
                
                for(var i = 0; i < listaRecetas.length; i++)
                {
                    var htmlcode ="";
                    htmlcode += '<div class="col-lg-3 col-md-4 col-xs-6 thumb">';
                    htmlcode += '<a class="thumbnail" href="Detail.html">';
                    htmlcode += '<h5>'+listaRecetas[i]['Tittle']+'</h5>';
                    htmlcode += '<img onclick="openRecipe(this)" width="400" height="300" class="img-responsive" src="'+listaRecetas[i]['Image']+'" alt="'+listaRecetas[i]['RecipeCode']+'">';
                    htmlcode += '</a>';
                    htmlcode += '</div>';

                    DOM.append(htmlcode);
                }
            },
            error : function(e){
                alert("falle horriblemente");
            }
                    
    });
            
}

    
function openRecipe(element){

    window.localStorage.setItem("CodigoReceta", element.alt);
    window.location.replace('DetalleReceta.html');
}    