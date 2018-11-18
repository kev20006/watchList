function searchMenu(type){
    let searchMenuColors = {
        Movie: "rgba(255, 255, 102, 0.4)",
        TV: "rgba(255, 51, 102, 0.2)",
        Book: "rgba(51, 153, 255, 0.2)",
        Game: "rgba(51, 204, 51, 0.2)"
    }
    $("#add-button").html("").removeClass("menu").addClass("search");
    $("#add-button").animate({
        left: "10%",
        width: "80vw",
        height: "80vh",
        padding: "0px"
    },
    300,
    ()=>{
        let searchHeader = $("<div></div>")
            .css("background-color", searchMenuColors[type])
            .css("font-size", "2rem")
            .css("border-radius", "15px 15px 0px 0px")
            .html(`${type} Search...`);
        let searchBar = $("<input></input>").attr("id","search").attr("placeholder","type in name of media").attr("class","px-1");
        searchBar.on("input", ()=>{
            $(`#results`).html("");
            searches.movie(searchBar.val());
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
                "border-radius": "15px"
            },
            300,
            () => {
                let menuHeader = $("<p></p>").text("Add New.. ");
                $("#add-button").append(menuHeader);
                let menu = $("<div></div>").attr('id', "create-item-menu");
                [["Movie", `<i class="fas fa-film mr-1"></i>`],
                ["TV", `<i class="fas fa-tv mr-1"></i>`],
                ["Game", ` <i class="fas fa-gamepad mr-1"></i>`],
                ["Book", `<i class="fas fa-book mr-1"></i>`]].forEach((element) => {
                    let newMenuItem = $("<div></div>")
                        .attr('id', element[0])
                        .attr('class', "menu-item")
                        .html(`${element[1]}${element[0]}`);
                    newMenuItem.on("click", () => {
                        searchMenu(element[0])
                    });
                    menu.append(newMenuItem)
                });
                $("#add-button").append(menu);
            }
        );}
    
})

$("#app").on("click", () => {
    $("#add-button").removeClass("menu").removeClass("search").addClass("icon");
    $("#add-button").html("");
    $("#add-button").animate(
        {
            left: `${(($(window).width() - 60) / $(window).width()) * 100}%`,
            height: "29px",
            width: "30px",
            
        },
        200,
        () => {
            $("#add-button").html(`<span id="add-icon">+</span>`);
        }
    );
});
