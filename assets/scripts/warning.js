function showWarning(warningHTML){
    $("#maxReq-Waring").html(warningHTML)
        
    $("#maxReq-Waring").removeClass("d-none")
    let refresh = 8
    $("#maxReq-Waring span").html(refresh)
    countdown= setInterval(()=>{
        refresh --;
        $("#maxReq-Waring span").html(refresh);
        if (refresh == 0){
            clearInterval(countdown);
            warningDismiss();
        }
    },1000);
}


function warningDismiss(){
    $("#maxReq-Waring").addClass("d-none")
}