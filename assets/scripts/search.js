"use strict"
let movieGenres = ""

let searches = {
    keys: ["405219586381645a0c87c4c5dc9211d9"],
    movie: (terms) =>{
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${searches.keys[0]}&language=en-US&query=${terms}`;
        $.getJSON(url, (data)=>{
            let resultsMobile = data.results.slice(0,5)
            $(`#results`).html("")
            resultsMobile.forEach((element)=>{
               let searchItem = createListItem(
                   `https://image.tmdb.org/t/p/w92${element.poster_path}`,
                   element.title,
                   element.release_date.split("-")[0],
                   element.overview,
                   "movie")
               $(`#results`).append(searchItem);
           })
        })
        .fail(function(){
            console.log("there was an error of sorts")
        });
    },
    tv: (terms)=>{
        let url = `https://api.themoviedb.org/3/search/tv?api_key=${searches.keys[0]}&language=en-US&query=${terms}`;
        $.getJSON(url, (data) => {
            console.log(data.results)
            let resultsMobile = data.results.slice(0, 5)
            $(`#results`).html("")
            resultsMobile.forEach((element) => {
                let searchItem = createListItem(
                    `https://image.tmdb.org/t/p/w92${element.poster_path}`,
                    element.name,
                    element.first_air_date.split("-")[0],
                    element.overview,
                    "tv")
                $(`#results`).append(searchItem);
            })
        })
            .fail(function () {
                console.log("there was an error of sorts")
            });
       
    },
    book: (terms)=>{
        let url = `https://www.googleapis.com/books/v1/volumes?q=${terms}`;
        $.getJSON(url, (data) => {
            let resultsMobile = data.items.slice(0,5)
            console.log(resultsMobile)
            $(`#results`).html("")
            resultsMobile.forEach((element) => {
                console.log(element)
                let searchItem = createListItem(
                    element.volumeInfo.imageLinks.smallThumbnail,
                    element.volumeInfo.title,
                    element.volumeInfo.publishedDate,
                    element.volumeInfo.description,
                    "book")
                
                $(`#results`).append(searchItem);
            })
        })
        .fail(function () {
            console.log("there was an error of sorts")
        });
    },
    game: (terms)=>{
        //some trouble finding a good API here - maybe have to make a proxy in node
    }
}

function createListItem(thumbnail, title, year, description, type){
    let wrapper = $(`<div class="d-flex my-2 mx-1"></div>`);
    let imgWrapper = $(`<div></div>`);
    let textWrapper = $(`<div></div>`);
    imgWrapper.append(`<img src=${thumbnail} class="result-thumb" alt=${title} height="50px" />`);
    textWrapper.append(`<p class="result-title">${title} - ${year}</p>`);
    wrapper.on("click", () => {
        $(`#results`).html(createItemPreview(thumbnail, title, year, description, type));
    })
    wrapper.append(imgWrapper, textWrapper);
    return wrapper
}

function createItemPreview(thumbnail, title, year, description, type) {
    let wrapper = $(`<div class="d-flex my-2 mx-1"></div>`);
    let imgWrapper = $(`<div></div>`);
    let textWrapper = $(`<div class="row"></div>`);
    let buttonWrapper= $(`<div class="row d-flex"></div>`);
    let add = $(`<input type="button" value="add to list"/>`);
    let back = $(`<input type="button" value="back"/>`);
    add.on("click",()=>{
        minimizeMenu();
        watchList.add({
            image: thumbnail,
            title: title,
            year: year,
            description: description,
            type: type
        });
        
    });
    back.on("click",()=>{
        $("#results").html("")
        searches[type]($("#search").val());
    });
    imgWrapper.append(`<img src=${thumbnail} class="result-thumb" alt=${title} />`);
    textWrapper.append(`<p class="result-title">${title}</p>`,`<p>${description}</p>`);
    buttonWrapper.append(add, back);
    wrapper.append(imgWrapper, textWrapper, buttonWrapper);
    return wrapper
}

let genres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${searches.keys[0]}&language=en-US`;

$.getJSON(genres, (data)=>{
    movieGenres =  data.genres;
})
