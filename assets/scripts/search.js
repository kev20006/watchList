"use strict"
let movieGenres = ""

let searches = {
    keys: ["405219586381645a0c87c4c5dc9211d9", "cClARfDJOoiKBziNEIAa4A"],
    //paginate movies
    movie: (terms,page) =>{
        let searchPage = Math.ceil(page/2)
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${searches.keys[0]}&language=en-US&query=${terms}&page=${searchPage}`;
        $(`#results`).html(`
            <img src="./assets/images/loading.gif" alt="loader">
            <p>loading movie....</p>`);
        $.getJSON(url, (data)=>{
            let resultsMobile =[]
            if (page % 2 != 0) {
                resultsMobile = data.results.slice(0, 9)
            } else {
                resultsMobile = data.results.slice(10, 19)
            }
            $(`#results`).html("")
            if (resultsMobile.length >= 0) {
                resultsMobile.forEach((element) => {
                    let searchResult = new movie(
                        element.id,
                        element.title,
                        `https://image.tmdb.org/t/p/w92${element.poster_path}`,
                        `https://image.tmdb.org/t/p/w600_and_h900_bestv2${element.poster_path}`,
                        element.overview,
                        element.release_date.split("-")[0],
                        "genre",
                        "",
                        ["bob"])
                    $(`#results`).append(searchResult.searchItem);
                })
            }else{
                $(`#results`).append(`<p>no results found please change your search criteria</p>`);
            }
            $(`#results`).append(paginationControls(page, terms, "movie"));
            
            
        })
        .fail(function(){
            console.log("there was an error of sorts")
        });
    },
    tv: (terms, page)=>{
        $(`#results`).html(`
            <img src="./assets/images/loading.gif" alt="loader">
            <p>loading tv shows....</p>`);
        let searchPage = Math.ceil(page / 2)
        let url = `https://api.themoviedb.org/3/search/tv?api_key=${searches.keys[0]}&language=en-US&query=${terms}&page=${searchPage}`;
        $(`#results`).html("loading...")
        $.getJSON(url, (data) => {
            let resultsMobile = []
            if (page % 2 != 0) {
                resultsMobile = data.results.slice(0, 4)
            } else {
                resultsMobile = data.results.slice(5, 9)
            }
            $(`#results`).html("")
            if(resultsMobile.length != 0){
                resultsMobile.forEach((element) => {
                    let searchResult = new tv(
                        element.name,
                        `https://image.tmdb.org/t/p/w92${element.poster_path}`,
                        `https://image.tmdb.org/t/p/w92${element.poster_path}`,
                        [],
                        element.overview,
                        element.first_air_date.split("-")[0],
                        "genre",
                        "",
                        ["placeholder"])
                    $(`#results`).append(searchResult.searchItem);
                })
            }else{
                $(`#results`).append(`<p>no results found please change your search criteria</p>`);
            }
            $(`#results`).append(paginationControls(page, terms, "tv"));
        })
            .fail(function () {
                console.log("there was an error of sorts")
            });
       
    },
    book: (terms, page)=>{
        $(`#results`).html(`
            <img src="./assets/images/loading.gif" alt="loader">
            <p>loading books....</p>`);
        let url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${terms}&startIndex=${page}&maxResults=5`;
        $.getJSON(url, (data) => {
            $(`#results`).html("")
            if (data.items.length !=0){
                data.items.forEach((element) => {
                    let image = ""
                    if (!element.volumeInfo.imageLinks){
                        image = `http://webmaster.ypsa.org/wp-content/uploads/2012/08/no_thumb.jpg`;
                    }else{
                        image = element.volumeInfo.imageLinks.smallThumbnail;
                    }
                    let searchResult = new book(
                        element.volumeInfo.title,
                        image,
                        image,
                        [],
                        element.volumeInfo.description,
                        element.volumeInfo.publishedDate,
                        "genre",
                        ""
                    )
                    $(`#results`).append(searchResult.searchItem);
                })
            }else{
                $(`#results`).append(`<p>no results found please change your search criteria</p>`);
            }
            $(`#results`).append(paginationControls(page, terms, "book"));
            
        })
        .fail(function () {
            console.log("there was an error of sorts")
        });
    },
    game: (terms, page)=>{
        $(`#results`).html(`
            <img src="./assets/images/loading.gif" alt="loader">
            <p>loading games....</p>`);
        let startIndex = page - 1;
        let url = `https://IGDB-PROXY--kev20006.repl.co/games/${terms}/page/${startIndex}`;
        $.getJSON(url, (data) => {
            $(`#results`).html("")
            if (data.length != 0) { 
                data.forEach((element) => {
                    let imgUrl;
                    if ("cover" in element) {
                        imgUrl = `https://images.igdb.com/igdb/image/upload/t_cover_small/${element.cover.cloudinary_id}.jpg`
                    } else {
                        imgUrl = `http://webmaster.ypsa.org/wp-content/uploads/2012/08/no_thumb.jpg`
                    }
                    let date = new Date(element.first_release_date)
                    let searchResult = new game(
                        element.name,
                        imgUrl,
                        imgUrl,
                        [],
                        element.summary,
                        date.getFullYear(),
                        "genre",
                        "")

                    $(`#results`).append(searchResult.searchItem);
                })
            } else {
                 $(`#results`).append(`<p>no results found please change your search criteria</p>`);
            }
            $(`#results`).append(paginationControls(page, terms, "game"));
        })
            .fail(function () {
                console.log("there was an error of sorts")
            });
    }
}



let genres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${searches.keys[0]}&language=en-US`;

$.getJSON(genres, (data)=>{
    movieGenres =  data.genres;
})

function paginationControls(page, terms, type){
    let incr = 1
    if (type == "book" || type == "game"){incr = 5}
    let pageButtons = $(`<div class="d-flex"></div>`);
    let back = $(`<div class="btn">prev</div>`)
        .on("click", () => {
            let newPage = ((p) => { return p - incr })(page);
            if(newPage > 0){
                $("#results").attr("data-page", newPage)
                searches[type](terms, newPage)
            }
        });
    let custom = $(`<div class="btn">add new</div>`);
    let next = $(`<div class="btn">next</div>`)
        .on("click", () => {
            let newPage = ((p) => { return p + incr })(page);
            $("#results").attr("data-page", newPage)
            searches[type](terms, newPage)
        });
    pageButtons.append(back, custom, next);
    return pageButtons
}