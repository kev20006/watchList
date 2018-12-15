
$(document).on("click", (e) => {
    let target = e.target;
    targetId = $(target).closest("article").attr("id");

    if (typeof targetId !== "undefined" && targetId.split("-")[0] == "card") {
        if (!watchList.contents[targetId.split("-")[1]].active ) {
            $(`#${targetId} .selected-content`).slideToggle("slow");
            watchList.contents[targetId.split("-")[1]].active = true;
            $(`#${targetId} .fade-item`).fadeIn("slow");
        }
    } 
    watchList.contents.forEach(element => {
        if (element.id !== targetId && element.active) {
            $(`#${element.id} .selected-content`).slideToggle("slow")
            element.active = false;
            $(`#${element.id} .fade-item`).fadeOut("slow");
            }
        });
});

