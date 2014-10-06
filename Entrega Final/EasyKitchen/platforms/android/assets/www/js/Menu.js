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

  var slidePos = 0;
     var images = new Array();

$(document).ready(function(){
    

    
    
   /* var user = window.localStorage.getItem("user");
    
    formData = { 'UserCode' : "7c71468a9bed97682690c1dbe55cf916"};
    
    $.ajax({
        url : "http://www.easykitchenapp.com/showMenu.php",
        type: "POST",
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        //dataType: 'json',
        success: function(result){
            
            alert("sucess!");
            var info = result.split("?");
            var imageList = info[0];
            
            for(var i = 0; i < imageList.length; i++)
            {
            }
             jQuery.each(html, function(key,value){
                
                alert(value.Image);
                images.push(value.Image);
                 });
        },  
        error: function(e){
            alert("falle trayendo imagenes");  
        }
        
    });*/ 

    
});

 

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    // Handle the back button
}

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    
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
    
    // Now safe to use the PhoneGap API
    var user = window.localStorage.getItem("user");
    var formData = new FormData();
    formData.append("UserCode",user);
    
    $.ajax({
        url : "http://www.easykitchenapp.com/showMenu.php",
        type: "POST",
        //dataType: "json",
        data: formData,
        processData: false,
        contentType: false,
        success : function(result){
            var info = result.split("?");
            var imagelist = JSON.parse(info[0]);
            
            for(var i = 0; i < imagelist.length; i++)
            {
                images.push("http://www.easykitchenapp.com/images/"+imagelist[i]['Image']);
            }
    
        },
        error : function(e){
            alert("failed");
        }
    });   
    
}


 
function slideShow() {
    var displayToggled = false;
    
    var hideoptions = {
        "direction": "left",
        "mode": "hide"
    };
   
    
    var showoptions = {
        "direction": "right",
        "mode": "show"
    };
    
    slidePos +=1;
    if(slidePos >= images.length)
        slidePos = 0;
    var current1 = $('#slideImg');
     current1.effect("slide", hideoptions, 1000);
    
   
    
    var nextSlide = current1.next('#slideImg');
    $('#slideImg').attr("src",images[slidePos]);
    
   
    current1.effect("slide",showoptions,1000);
    
};
setInterval(slideShow, 3000);
slideShow();