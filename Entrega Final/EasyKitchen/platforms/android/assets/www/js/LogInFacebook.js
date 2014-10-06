document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // Now safe to use the PhoneGap API
    
}

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    // Handle the back button
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

function loginDatabase(name){

    /*var mypostrequest=new ajaxRequest();
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
    }*/
    
    
     dataform = new FormData();
     var prueba = name.split(" ");
    
     var userName = prueba[0];
     var userLastName = prueba[1];
    
     /*var parameters = 'userName='+userName+ "&userLastName="+userLastName;
     mypostrequest.open("POST","http://easykitchenapp.com/insertUser.php",true);
     mypostrequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
     mypostrequest.send(parameters)
     
      var respuesta = "pos bullshit D:";
     
     mypostrequest.onreadystatechange = function()
     {
        if(mypostrequest.readyState==4 && mypostrequest.status==200)
        {
             respuesta = mypostrequest.responseText;        
        }
        
     }*/
     
     //alert(respuesta);
     //alert("almenos lo intente D;");
     //window.location.replace('Menu.html');
	 
    dataform.append("userName",userName);
    dataform.append("userLastName",userLastName);
	
    $.ajax({
            url : "http://easykitchenapp.com/insertUser.php",
            type : "POST",
            //dataType: "json",
            data : dataform,
            processData: false,
            contentType: false,
            success : function(html){
                //jQuery.each(html,function(key, value){
                alert("sucess");
                var info = html.split("?");
                var user = info[0];
                //var arr = JSON.parse(html);
                //var prueba = JSON.parse(html);
                //alert(prueba.UserCode);
                localStorage.setItem("user",user)
                window.location.replace('Menu.html');
            },
            error : function(e){
                alert("falle horriblemente");
            }
                    
    });

}