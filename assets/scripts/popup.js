function closePopUp(){
    $(".obscure").fadeOut(200, () => {
        $(this).css("display", "none");
    });
}

function makePopUp(type){
    $("#add-or-edit-container").html("")
    $(".obscure").fadeIn(300)
    $(".obscure").css("display", "flex");
    if (type === "manageFilters"){
        manageFilters()
    }
    else{
        addNewMenu(type)
    }
}

$(document).on("click", (e) => {
    if ($(e.target).hasClass("obscure")) {
       closePopUp()
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

    if (watchList.collections.length > 0){
        let index=0;
        watchList.collections.forEach(element =>{
            let i = (function (i) {return i})(index)
            let wrapper = $(`<div class="d-flex"></div>`)
            let input = $(`<input type="text" value=${element}></input>`)
                .on("input",(e)=>{
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

function addNewMenu(type){
    $("#add-or-edit-container").html("")
    let searchBox = $(`<div id="search-box" class="row d-flex mx-0 justify-content-center"></div>`);
    let searchBar = $(`<input type="text" placeholder="${type} Title"></input>`);
    searchBar.on("input", ()=>{
        searches[type](searchBar.val());
    })
    let toggleSearch = $(`<div class="toggle-search"><i class="fas fa-search"></i></div>`) ; 
    toggleSearch.on("click", ()=>{
        $("#search-box .toggle-search").toggleClass("on").toggleClass("off")
    }) 
   searchBox.append(searchBar) 
    let results = $(`<div id="results">
                        <div class="mt-5 text-center">
                        <h1><i class="fas fa-search"></i></h1>
                        <p>Please type above to search for media</p>
                        </div>
                    </div>`)
   $("#add-or-edit-container").append(searchBox, results)     

}

   
