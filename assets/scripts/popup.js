function makePopUp(type){
    $("#add-or-edit-container").switchClass("small", "active", 500);
    $(".obscure").fadeIn(400)
    $(".obscure").css("display", "flex");
}

$(document).on("click", (e) => {
    if ($(e.target).hasClass("obscure")) {
        $("#add-or-edit-container").switchClass("active", "small", 600);
        $(".obscure").fadeOut(500, () => {
            $(this).css("display", "none");
        });
    }
})