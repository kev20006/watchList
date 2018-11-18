"use strict"
let movieGenres = ""

let searches = {
    keys: ["405219586381645a0c87c4c5dc9211d9"],
    movie: (terms) =>{
        console.log(movieGenres);
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${searches.keys[0]}&language=en-US&query=${terms}`;
        
        $.getJSON(url, (data)=>{
           data.results.forEach((element)=>{
               console.log(element)
               let searchItem = createListItem(
                   `https://image.tmdb.org/t/p/w92${element.poster_path}`,
                   element.title,
                   element.release_date)
               $(`#results`).append(searchItem);
           })
        })
        .fail(function(){
            console.log("there was an error of sorts")
        });
    },
    tv: ()=>{
        alert("nothing yet");
    },
    book: ()=>{
        alert("nothing yet");
    },
    game: ()=>{
        alert("nothing yet")
    }
}

function createListItem(thumbnail, title, year, format = null){
    let wrapper = $(`<div class="d-flex"></div>`);
    let imgWrapper = $(`<div></div>`);
    let textWrapper = $(`<div></div>`);
    imgWrapper.append(`<img src=${thumbnail} class="result-thumb" alt=${title} height="50px" />`);
    textWrapper.append(`<p class="result-title">${title}</p>`);
    wrapper.append(imgWrapper, textWrapper);
    return wrapper
}
let genres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${searches.keys[0]}&language=en-US`;

$.getJSON(genres, (data)=>{
    movieGenres =  data.genres;
})
