function minimizeMenu(){
    $("#add-button").html("");
    $("#add-button").animate(
        {
            left: `${(($(window).width() - 60) / $(window).width()) * 100}%`,
            height: "29px",
            width: "30px",

        },
        200,
        () => {
            $("#add-button").html(`<span id="add-icon">+</span>`)
                .removeClass("menu").removeClass("search").addClass("icon")
                .attr('border-radius', "100%");
        }
    );
}

function searchMenu(type){
    let searchMenuColors = {
        Movie: "rgba(255, 255, 102, 0.4)",
        TV: "rgba(255, 51, 102, 0.2)",
        Book: "rgba(51, 153, 255, 0.2)",
        Game: "rgba(51, 204, 51, 0.2)"
    }
    let wLeft=""
    let wWidth=""
    if ($(window).width() >= 600) {
        wLeft= `${50 - (250 / $(window).width()) * 100}%`
        wWidth = "500px";
    }else {
        wLeft= "10%"
        wWidth="80%";
        
    }
    $("#add-button").html("").removeClass("menu").addClass("search");
    $("#add-button").animate({
        left: `${wLeft}`,
        width: `${wWidth}`,
        height: "80vh",
        padding: "0px",
    },
    300,
    ()=>{
        let searchHeader = $("<div></div>")
            .css("background-color", searchMenuColors[type[1]])
            .css("font-size", "2rem")
            .css("border-radius", "5px 5px 0px 0px")
            .html(`${type[0]}${type[1]} Search...`);
        let searchBar = $("<input></input>").attr("id","search").attr("placeholder","type in name of media").attr("class","px-1");
        searchBar.on("input", ()=>{
            $(`#results`).html("");
            searches[`${type[1].toLowerCase()}`](searchBar.val());
        });
        let selectedResult = $("<div></div>").attr("id","selectedMovie");
        let searchResults = $(`<div></div>`).attr("id", "results");
        $("#add-button").append(searchHeader, searchBar, selectedResult, searchResults);
    })
}

$("#add-button").css("left", `${(($(window).width() - 60) / $(window).width()) * 100}%`)
$("#add-button").on("click", () => {
    if ($("#add-button").hasClass("icon")) {
        $("#add-button").html("").removeClass("icon").addClass("menu");
        $("#add-button").animate(
            {
                left: `${(($(window).width() - 150) / $(window).width()) * 100}%`,
                height: "200px",
                width: "120px",
                "border-radius": "15px",
                "background-color": "none"
            },
            300,
            () => {
                let menuHeader = $("<p></p>").text("Add New.. ");
                $("#add-button").append(menuHeader);
                let menu = $("<div></div>").attr('id', "create-item-menu");
                [
                    [`<div class="icon-bg"><i class="fas fa-film m-1"></i></div>`, "Movie"],
                    [`<div class="icon-bg"><i class="fas fa-tv mr-1"></i></div>`, "TV"],
                    [`<div class="icon-bg"><i class="fas fa-gamepad mr-1"></i></div>`, "Game",],
                    [`<div class="icon-bg"><i class="fas fa-book mr-1"></i></div>`, "Book",]
                ]
                .forEach((element) => {
                    let newMenuItem = $(`<div></div>`)
                        .attr('id', element[1])
                        .attr('class', "menu-item d-flex justify-content-between")
                        .html(`${element[1]}${element[0]}`);
                    newMenuItem.on("click", () => {
                        searchMenu(element)
                    });
                    menu.append(newMenuItem)
                });
                $("#add-button").append(menu);
            }
        );}
    
})

$("#app").on("click", ()=>{
    if (!$("#add-button").hasClass("icon")){
        minimizeMenu()
    }
});