var menuActive = false;


$(document).on("click", (e) => {
    console.log($(e.target).attr("id"));
    if ($(e.target).attr("id") == "toggle-menu") {
        if (menuActive == false) {
            menuActive = true;
            $("#menu").animate(
                {
                    left: "+=200",
                }, 500);
        } else {
            menuActive = false;
            $("#menu").animate(
                {
                    left: "-=200",
                }, 500)
        }
    }
    else if (menuActive) {
        if (e.target.closest("aside") == null) {
            menuActive = false;
            $("#menu").animate(
                {
                    left: "-=200",
                }, 500)
        }
    }
})

function performFilter(type){
    if (type=="all"){
        watchList.render(watchList.contents)
    }
    else{
        watchList.filter(type)
    }
    menuActive = false;
    $("#menu").animate({
            left: "-=200",
        }, 500)

}

$("#category-list .add-new").on("click", () => {
    makePopUp("manageFilters")
})