"use strict"
let movieGenres = ""

//Code for rendering search results in the app

let searches = {
    keys: ["405219586381645a0c87c4c5dc9211d9", "cClARfDJOoiKBziNEIAa4A"],
    //paginate movies
    movie: (terms,page) =>{
        let searchPage = Math.ceil(page / 2)
        tmdb.getMovieSearchObjects(terms, searchPage, (movies) => {
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
                    resultsContainer.append(element.searchItem)
                })
                $(`#results`).append(resultsContainer);
                $(`#results`).append(paginationControls(page, terms, "movie"));
            }
        });
        $(`#results`).html(`
            <img src="./assets/images/loading.gif" alt="loader">
            <p>loading movie....</p>`);   
    },
    /* API CALLS WILL BE DONE IN ANOTHER FILE -- ALL CODE BELOW HERE WILL BE CHANGED */
    fullMovie:(id, callback)=>{
        let movieurl = `https://api.themoviedb.org/3/movie/${id}?api_key=${searches.keys[0]}&language=en-US&append_to_response=credits`;
        $.getJSON(movieurl, (data) => {
            console.log(data)
            let director = "None Acknowledged"
            data.credits.crew.forEach(element => {
                if (element.job == "Director") {
                    director = element.name
                }
            })
            let cast = []
            for (let i = 0; i <= 3; i++) {
                cast.push(data.credits.cast[i])
            }
            let searchResult = new movie(
                {
                dbid: data.id,
                title: data.title,
                thumb: `https://image.tmdb.org/t/p/w92${data.poster_path}`,
                lrgImage: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`,
                longDescription: data.overview,
                year:data.release_date.split("-")[0],
                genre: data.genres,
                note:"",
                director: director,
                rating: data.vote_average * 10,
                cast: cast
                }
            )
            callback(searchResult)
            
        }).fail(
            console.log("no movie by that name exists")
        )
    },

    getRandomRecommendaitons: (type, value, callback) =>{
        if (type == "actor"){
            let actorUrl = `https://api.themoviedb.org/3/person/${value.id}?api_key=${searches.keys[0]}&append_to_response=movie_credits`;
            $.getJSON(actorUrl, (data) => {
                let randomMovie = Math.floor(Math.random() * data.movie_credits.cast.length);
                searches.fullMovie(data.movie_credits.cast[randomMovie].id, (movie) => {
                    callback(movie);
                });
            });
        }else if(type == "genre"){
            let genreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${searches.keys[0]}&language=en-us&with_genres=${value.id}`
            $.getJSON(genreUrl, (data) => {
                console.log(data)
                let randomMovie = Math.floor(Math.random() * data.results.length);
                searches.fullMovie(data.results[randomMovie].id, (movie) => {
                    callback(movie);
                });
            });
        }
        
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
                resultsMobile = data.results.slice(0, 9)
            } else {
                resultsMobile = data.results.slice(10, 19)
            }
            $(`#results`).html("")
            if(resultsMobile.length != 0){
                resultsMobile.forEach((element) => {
                    console.log(element)
                    let searchResult = new tv({
                        dbid: element.id,
                        title: element.name,
                        thumb: `https://image.tmdb.org/t/p/w92${element.poster_path}`,
                        lrgImage: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${element.poster_path}`,
                        longDescription: element.overview,
                        year: element.first_air_date.split("-")[0],
                        genre:["genre"],
                        cast: ""
                        })
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
        let url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${terms}&startIndex=${page}&maxResults=10`;
        $.getJSON(url, (data) => {
            $(`#results`).html("")
            if (data.items.length !=0){
                data.items.forEach((element) => {
                    console.log(element)
                    let image = ""
                    let largerImage;
                    if (!element.volumeInfo.imageLinks){
                        image = `http://webmaster.ypsa.org/wp-content/uploads/2012/08/no_thumb.jpg`;
                        largerImage = `http://webmaster.ypsa.org/wp-content/uploads/2012/08/no_thumb.jpg`;
                    }else{
                        image = element.volumeInfo.imageLinks.smallThumbnail;
                        largerImage = element.volumeInfo.imageLinks.thumbnail
                    }
                    let searchResult = new book({
                        dbid:element.id,
                        title:element.volumeInfo.title,
                        thumb:image,
                        lrgImage: image,
                        longDescription: element.volumeInfo.description,
                        year: element.volumeInfo.publishedDate,
                        genre: ["genre"],
                        cast: ""
                    }
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
            <p>loading games....</p>
            <p>This may take a while, games API is host on a REPL teporarily</p>
            <p>if you get no results after about 30 secs, try changing your search terms</p>`);
        let startIndex = page - 1;
        let url = `https://IGDB-PROXY--kev20006.repl.co/games/${terms}/page/${startIndex}`;
        $.getJSON(url, (data) => {
            $(`#results`).html("")
            if (data.length != 0) { 
                data.forEach((element) => {
                    console.log(element)
                    let imgUrl;
                    let bigImg;
                    if ("cover" in element) {
                        imgUrl = `https://images.igdb.com/igdb/image/upload/t_cover_small/${element.cover.cloudinary_id}.jpg`
                        bigImg = `https://images.igdb.com/igdb/image/upload/t_cover_big/${element.cover.cloudinary_id}.jpg`
                    } else {
                        imgUrl = `http://webmaster.ypsa.org/wp-content/uploads/2012/08/no_thumb.jpg`;
                        bigImg = `http://webmaster.ypsa.org/wp-content/uploads/2012/08/no_thumb.jpg`;
                    }
                    let date = new Date(element.first_release_date)
                    let searchResult = new game({
                        dbid:element.id,
                        title:element.name,
                        thumb:imgUrl,
                        lrgImage: bigImg,
                        description: element.summary,
                        year: date.getFullYear(),
                        genre: ["genre"],
                        cast: ""
                    }
                    )
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
    let custom = $(`<div class="btn"></div>`);
    let next = $(`<div class="btn">next</div>`)
        .on("click", () => {
            let newPage = ((p) => { return p + incr })(page);
            $("#results").attr("data-page", newPage)
            searches[type](terms, newPage)
        });
    pageButtons.append(back, custom, next);
    return pageButtons
}

