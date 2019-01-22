//animates the drawer menu handles drawer menu events

var menuActive = false;


$(document).on("click", (e) => {
    if ($(e.target).attr("id") == "toggle-menu") {
        if (!menuActive) {
            menuActive = true;
            $("#menu").animate(
                {
                    left: "+=210",
                }, 500);
        } else {
            menuActive = false;
            closeDrawerMenu()
        }
    }
    else if (menuActive) {
        if (e.target.closest("aside") == null) {
            closeDrawerMenu();
        }
    }
})

function performFilter(filterBy, value){
    if (value =="all"){
        $("#view-title").html(`<h6>All Items</h6>`);
        watchList.render(watchList.contents);
    }
    else{
        watchList.filter(filterBy, value);
    }
    menuActive = false;
    closeDrawerMenu()
}

$("#category-list .add-new").on("click", () => {
    makePopUp("manageFilters")
})

function closeDrawerMenu(){
    menuActive = false;
    $("#menu").animate({
        left: "-=210",
    }, 500)
}