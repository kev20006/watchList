


function makePopUp(type){
    $("#add-or-edit-container").html("")
    $(".obscure").fadeIn(300)
    $(".obscure").css("display", "flex");
    if (type === "manageFilters"){
        manageFilters()
    }
}

$(document).on("click", (e) => {
    if ($(e.target).hasClass("obscure")) {
        $(".obscure").fadeOut(200, () => {
            $(this).css("display", "none");
        });
    }
})

function manageFilters(){
    $("#add-or-edit-container").html("")
    let title = $(`<h3 class="sub - head">Manage Collections</h3><hr>`)
    let collectionInput = $(`<input id="collection-input" type="text"></input>`)
    let button = $(`<input type="button">add</input>`)
    button.on("click", ()=>{
        watchList.addCollection($("#collection-input")[0].value)
        manageFilters()
    })
    $("#add-or-edit-container").append(title, collectionInput, button)
    console.log(watchList.collections)
    if (watchList.collections.length > 0){
        console.log("I'm getting here")
        let index=0;
        watchList.collections.forEach(element =>{
            let i = (function (i) {return i})(index)
            let wrapper = $(`<div class="d-flex"></div>`)
            let input = $(`<input type="text" value=${element}></input>`)
                .on("input",(e)=>{
                    console.log(e)
                    watchList.collections[i] = e.target.value
                    watchList.renderCollections()
                })
            let deleteButton = $(`<input type="button" value="d"></input>`)
                .on("click", ()=>{
                    watchList.removeCollection(i)
                    watchList.renderCollections()
                    manageFilters()
                })
            wrapper.append(input,deleteButton)
            $("#add-or-edit-container").append(wrapper)
            index ++
        })
    }
  
}