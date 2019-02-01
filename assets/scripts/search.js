"use strict"
let movieGenres = ""

//Code for rendering search results in the app

let searches = {
    keys: ["405219586381645a0c87c4c5dc9211d9", "cClARfDJOoiKBziNEIAa4A"],
    //paginate movies
    movie: (terms,page) =>{
        let searchPage = Math.ceil(page / 2)
        tmdb.getObjects({ type:"movie", terms: terms, page: searchPage, listType:"search"}, (movies) => {
            if (page % 2 != 0) {
                movies = movies.slice(0, 9)
            } else {
                movies = movies.slice(10, 19)
            }
            $(`#results`).html("")
            if (movies.length == 0){
                $(`#results`).append(`<p>no results found please change your search criteria</p>`);
            }else{
                let resultsContainer = $(`<div></div>`)
                movies.forEach(element=>{
                    resultsContainer.append(element.searchItem())
                })
                $(`#results`).append(resultsContainer);
                $(`#results`).append(paginationControls(page, terms, "movie"));
            }
        });
        $(`#results`).html(`
            <div class="no-results text-center">
            <img src="./assets/images/loading.gif" alt="loader">
            <p>searching movies....</p>
            </div>`);   
    },

    tv: (terms, page)=>{
        $(`#results`).html(`
            <div class="no-results text-center">
            <img src="./assets/images/loading.gif" alt="loader">
            <p>searching......</p>
            </div>`);
        let searchPage = Math.ceil(page / 2)
        tmdb.getObjects({ type: "tv", terms: terms, page: searchPage, listType: "search" }, (shows) => {
            if (page % 2 != 0) {
                shows = shows.slice(0, 9)
            } else {
                shows = shows.slice(10, 19)
            }
            $(`#results`).html("")
            if (shows.length == 0) {
                $(`#results`).append(`<p>no results found please change your search criteria</p>`);
            } else {
                let resultsContainer = $(`<div></div>`)
                shows.forEach(element => {
                    resultsContainer.append(element.searchItem())
                })
                $(`#results`).append(resultsContainer);
                $(`#results`).append(paginationControls(page, terms, "tv"));
            }
        });
    }
}

function paginationControls(page, terms, type){
    let incr = 1
    if (type == "book" || type == "game"){incr = 5}
    let pageButtons = $(`<div class="d-flex justify-content-around"></div>`);
    let back = $(`<div class="result-btn">prev</div>`)
        .on("click", () => {
            let newPage = ((p) => { return p - incr })(page);
            if(newPage > 0){
                $("#results").attr("data-page", newPage)
                searches[type](terms, newPage)
            }
        });
    let next = $(`<div class="result-btn">next</div>`)
        .on("click", () => {
            let newPage = ((p) => { return p + incr })(page);
            $("#results").attr("data-page", newPage)
            searches[type](terms, newPage)
        });
    pageButtons.append(back, next);
    return pageButtons
}

