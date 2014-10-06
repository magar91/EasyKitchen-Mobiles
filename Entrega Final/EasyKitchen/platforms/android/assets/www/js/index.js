var ingredientes= "";
var procedimientos = "";

function LoginFb() {
    location.href = "Lista_Recetas.html";
}

function agregarReceta() {
    location.href = "Agregar_Receta.html";
}



function guardarReceta() {
    ajaxAddRecipePost();
    location.href = "Agregar_Receta.html";
}



function cancelar() {
    location.href = "Lista_Recetas.html";
}

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    // Handle the back button
}








