var menuActive = false;


$(document).on("click", (e) => {
    if ($(e.target).attr("id") == "toggle-menu") {
        if (menuActive == false) {
            menuActive = true;
            $("#menu").animate(
                {
                    left: "+=210",
                }, 500);
        } else {
            menuActive = false;
            $("#menu").animate(
                {
                    left: "-=210",
                }, 500)
        }
    }
    else if (menuActive) {
        if (e.target.closest("aside") == null) {
            menuActive = false;
            $("#menu").animate(
                {
                    left: "-=210",
                }, 500)
        }
    }
})

function performFilter(filterBy, value){
    if (value =="all"){
        watchList.render(watchList.contents)
    }
    else{
        watchList.filter(filterBy, value)
    }
    menuActive = false;
    $("#menu").animate({
            left: "-=210",
        }, 500)
}

$("#category-list .add-new").on("click", () => {
    makePopUp("manageFilters")
})