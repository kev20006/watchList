//animates the pop-up menu and generates the HTML for all the non-search pop-up menu functions

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
    else if (type == "help"){
        displayHelp();
    }else if(type == "reset"){
        resetData();
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
    let manageFiltersWrapper = $(`<div class="manage-tags p-2"></div>`)
    let title = $(`<h3 class="heading text-center">Add or Edit Tags</h3><hr>`)
    let newCollectionWrapper = $(`<div class="d-flex justify-content-center align-items-center new-collection-wrapper">`)

    let collectionLabel = $(`<label>Add New Collection</label>`)
    let collectionInput = $(`<input id="collection-input" type="text"></input>`)
        .on("input keydown", (e)=>{
            console.log(e.keycode);
            console.log($(e.target).val().length);
                    
            if (e.keyCode == 13) {
                if ($("#collection-input").val().length > 0){
                    watchList.addCollection($("#collection-input").val())
                    manageFilters();
                }
                $(e.target).blur();
            }
           
        })
        .focusin((e)=>{
            $(e.target).siblings().animate({ "font-size": "0.5rem", bottom: "25px" }, "linear")
        })
        .focusout((e)=>{
            if($(e.target).val().length == 0){
                $(e.target).siblings().animate({ "font-size": "1rem", bottom: "0px" }, "linear")
            }
        })
    let button = $(`<div class="btn my-0"><i class="fas fa-plus"></i></div>`)
    button.on("click", ()=>{
        if ($("#collection-input").val().length > 0) {
            watchList.addCollection($("#collection-input").val())
            manageFilters()
        };
    });
    let inputWrapper = $(`<div class="input-box-wrapper my-0"></div>`).append(collectionLabel, collectionInput)
    newCollectionWrapper.append(inputWrapper, button)
    manageFiltersWrapper.append(title, newCollectionWrapper)

    if (Object.keys(watchList.collections).length > 0){
        let index=0;
        Object.keys(watchList.collections).forEach(element =>{
            let i = (function (i) {return i})(index)
            let wrapper = $(`<div class="d-flex justify-content-around tag-wrapper"></div>`)
            let input = $(`<input type="text" value=${element}></input>`)
                .on("input",(e)=>{
                    watchList.collections[e.target.value] =  watchList.collections[element]
                    delete watchList.collections[element] 
                    watchList.renderCollections();
                    watchList.updateLocalStorage();
                })
            let arrow = $(`<div class="d-flex align-items-center"><i class="fas fa-arrow-right my-0"></i>`)
            let deleteButton = $(`<div class="d-flex align-items-center btn-delete"><i class="far fa-trash-alt my-0"></i></i></div>`)
                .on("click", ()=>{
                    watchList.removeCollection(element)
                    watchList.renderCollections()
                    manageFilters()
                })
            wrapper.append(arrow,input,deleteButton)
            manageFiltersWrapper.append(wrapper)
            index ++
        })
    }
    $("#add-or-edit-container").append(manageFiltersWrapper)
  
}

function addNewMenu(type){
    let searchPlaceholder = `Enter a`
    switch (type){
        case "person":
            searchPlaceholder += "n Actor's Name";
            break;
        case "movie":
            searchPlaceholder += " Movie";
            break;
        case "tv":
            searchPlaceholder += " TV show"
    }
    if (type == "person")
    $("#add-or-edit-container").html("")
    let searchBox = $(`<div id="search-box" class="row d-flex mx-0 justify-content-center align-items-center"></div>`);
    let searchBar = $(`<input type="text" placeholder="${searchPlaceholder}"></input>`)
        .on("keydown", (e)=>{
        if (searchBar.val().length == 0){
            $("#results").html(`
                            <div class="mt-5 text-center">
                                <h1><i class="fas fa-search"></i></h1>
                                <p>Please type above to search for media</p>
                            </div>`);
        }
        if (e.keyCode == 13){
                searches[type](searchBar.val(), 1);
                $(e.target).blur()
        } 
    })
    let searchIcon = $(`<i class="fas fa-search ml-2 mr-4"></i>`) 
    searchBox.append(searchIcon, searchBar) 
    let results = $(`<div id="results" data-page='1'>
                        <div class="mt-5 text-center">
                        <h1><i class="fas fa-search"></i></h1>
                        <p>Please type above to search for media</p>
                        </div>
                    </div>`)
   $("#add-or-edit-container").append(searchBox, results)     

}

function displayHelp(){
    $("#add-or-edit-container").html("");
    let helpMenu = $(`<div class="help-menu p-4"></div>`)
        .append(`<h3 class="heading text-center mb-4">Welcome to Watch List</h3>
        <p class="mb-2">Has anybody ever recommended a great Movie to you, and then when you sat down to watch it, you couldn't remember what it was called?</p>
        <p class="mb-2">Have you ever been mid-way through a show then taken a break and forgotten what episode you were on? </p>
        <p class="mb-4">If you answered yes to any of these questions then WatchList is for you allows you to keep track of any Movie or
        TV recommendations that you have received. It uses The TMBD API to search for up-to-date information about media that you want to remember.
        </p>
        <p class="heading mb-3"> <strong>Getting Started:</strong> </p>
        <ul>
            <li>search for specific using the <i class="fas fa-pen align-self-center"></i> icon</li>
            <li>Browse new and popular items by selecting one of the recommendations from the menu</li> 
        </ul>
        <p class="my-2"><small class="text-center"><strong>User History and Watch List are stored using your browsers local storage</strong></small></p>`);
    let okButton = $(`<button type="button" class="btn btn-default mx-auto">OK</button>`)
        .on("click", () => {
            closePopUp();
        });
    let buttonWrapper = $(`<div class="d-flex justify-content-center mb-5"></div>`).append(okButton);
    $("#add-or-edit-container").append(helpMenu, buttonWrapper);
}

function resetData() {
    $("#add-or-edit-container").html(``)
    let resetMenu = $(`<div class="reset-menu p-2"></div>`)
        .append(`
        <h3 class="heading text-center mb-4">Delete Everything?</h3>
        <p class="mb-1">Thank you for using WatchList, I hope you enjoyed your time here and I'm sorry that maybe things didn't work out quite as well as you hoped</p>
        <p class="mb-3">Please be cautious, there is no going back from this point.</p>
        <p>By clicking the button below you will delete:</p>
        <ul class="mb-4">
        <li>The current watchlist</li>
        <li>All your custom tags and groups</li>
        <li>All the details about your watch history</li>
        </ul>
        `)
    let deleteButton = $(`<button type="button" class="btn btn-danger">Yes Please, delete all my data</button>`)
        .on("click", () => {
            watchList.resetAll();
            closePopUp();
        });
    let buttonWrapper = $(`<div class="d-flex justify-content-center"></div>`).append(deleteButton);
    resetMenu.append(buttonWrapper);
    $("#add-or-edit-container").append(resetMenu);
}
   
