function closePopUp(){
    $("#search-box").removeClass("d-none").addClass("d-flex");
    $(".obscure").fadeOut(200, () => {
        $(this).css("display", "none");
    });
}

function makePopUp(type){
    $("#add-or-edit-container").html("")
    $(".obscure").fadeIn(300)
    $(".obscure").css("display", "flex");
    if (type == "manageFilters"){
        manageFilters();
    }
    else if (type === "help"){
        displayHelp();
    }
    else{
        addNewMenu(type);
    }
}

$(document).on("click", (e) => {
    if ($(e.target).hasClass("obscure")) {
       closePopUp()
    }
})

function manageFilters(){
    $("#add-or-edit-container").html("")
    let title = $(`<h3 class="sub-head">Manage Collections</h3><hr>`)
    let collectionInput = $(`<input id="collection-input" type="text"></input>`)
    let button = $(`<input type="button">add</input>`)
    button.on("click", ()=>{
        watchList.addCollection($("#collection-input").val())
        manageFilters()
    })
    $("#add-or-edit-container").append(title, collectionInput, button)

    if (Object.keys(watchList.collections).length > 0){
        let index=0;
        Object.keys(watchList.collections).forEach(element =>{
            let i = (function (i) {return i})(index)
            let wrapper = $(`<div class="d-flex"></div>`)
            let input = $(`<input type="text" value=${element}></input>`)
                .on("input",(e)=>{
                    watchList.collections[e.target.value] =  watchList.collections[element]
                    delete watchList.collections[element] 
                    watchList.renderCollections();
                    watchList.updateLocalStorage();
                })
            let deleteButton = $(`<input type="button" value="d"></input>`)
                .on("click", ()=>{
                    watchList.removeCollection(element)
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
    let searchBox = $(`<div id="search-box" class="row d-flex mx-0 justify-content-center add-tag"></div>`);
    let searchBar = $(`<input type="text" placeholder="${type} Title"></input>`);
    searchBar.on("input", ()=>{
        if (searchBar.val().length == 0){
            $("#results").html(`
                            <div class="mt-5 text-center">
                                <h1><i class="fas fa-search"></i></h1>
                                <p>Please type above to search for media</p>
                            </div>`);
        }else{
            searches[type](searchBar.val(), 1);
        }
        
    })
   searchBox.append(searchBar) 
    let results = $(`<div id="results" data-page='1'>
                        <div class="mt-5 text-center">
                        <h1><i class="fas fa-search"></i></h1>
                        <p>Please type above to search for media</p>
                        </div>
                    </div>`)
   $("#add-or-edit-container").append(searchBox, results)     

}

function displayHelp(){
    $("#add-or-edit-container").html(`
        <h5>Welcome to Watch List</h5>
        <p>Has anybody ever recommended a great Movie to you, and then when you sat down to watch it, you couldn't remember what it was called?</p>
        <p>Have you ever been mid-way through series and you forgot what episode you were on? <strong>[not implemented yet]</strong></p>
        <p>WatchList allows you to keep track of any Movie, TV, Book or Game recommendations that you have received. It uses The TMBD, TGDB and Google Books API's
            to search for and store media that you want to remember.
            </p>
        <p>In the near future it will also make recommendations when you finish a list item, it will also provide some analytics to see your usage history</p>
        <p><small><strong>watch list uses a small amount of local storage, you have been warned</strong></small></p>`)
}
   
