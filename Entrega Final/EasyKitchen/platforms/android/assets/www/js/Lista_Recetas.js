document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    // Handle the back button
}

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // Now safe to use the PhoneGap API
    var user = window.localStorage.getItem("user");
    
    var dataform = new FormData();
    dataform.append("UserCode",user);
    var listaRecetas;
    
    $.ajax({
            url : "http://easykitchenapp.com/userRecipes.php",
            type : "POST",
            //dataType: "json",
            data : dataform,
            processData: false,
            contentType: false,
            success : function(result){
                
                var info = result.split("?");
                listaRecetas = JSON.parse(info[0]);
                
                var DOM = $("#recetasContainer");
                for(var i = 0; i < listaRecetas.length; i++)
                {
                    var htmlcode ="";
                    htmlcode += '<div class="col-lg-3 col-md-4 col-xs-6 thumb">';
                    htmlcode += '<a class="thumbnail" href="Detail.html">';
                    htmlcode += '<h5>'+listaRecetas[i]['Tittle']+'</h5>';
                    htmlcode += '<img onclick="openRecipe(this)" width="400" height="300" class="img-responsive" src="'+listaRecetas[i]['Image']+' alt='+listaRecetas[i]['RecipeCode']+'>'
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
    window.location.replace("DetalleReceta.html");
}  
