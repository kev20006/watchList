"use strict"
let movieGenres = ""

let searches = {
    keys: ["405219586381645a0c87c4c5dc9211d9"],
    movie: (terms) =>{
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${searches.keys[0]}&language=en-US&query=${terms}`;
        
        $.getJSON(url, (data)=>{
            let resultsMobile = [
                data.results[0], 
                data.results[1], 
                data.results[2], 
                data.results[3], 
                data.results[4],
                data.results[5]
            ] 
            resultsMobile.forEach((element)=>{
                console.log(element)
               let searchItem = createListItem(
                   `https://image.tmdb.org/t/p/w92${element.poster_path}`,
                   element.title,
                   element.release_date,
                   element.overview)
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

function createListItem(thumbnail, title, year, description){
    let wrapper = $(`<div class="d-flex my-2 mx-1"></div>`);
    let imgWrapper = $(`<div></div>`);
    let textWrapper = $(`<div></div>`);
    imgWrapper.append(`<img src=${thumbnail} class="result-thumb" alt=${title} height="50px" />`);
    textWrapper.append(`<p class="result-title">${title} - ${year.split("-")[0]}</p>`);
    wrapper.on("click", () => {
        $(`#results`).html(createItemPreview(thumbnail, title, year, description));
    })
    wrapper.append(imgWrapper, textWrapper);
    return wrapper
}

function createItemPreview(thumbnail, title, year, description) {
    let wrapper = $(`<div class="d-flex my-2 mx-1"></div>`);
    let imgWrapper = $(`<div></div>`);
    let textWrapper = $(`<div></div>`);
    let buttonWrapper= $(`<div class="d-flex"></div>`);
    let add = $(`<input type="button" value="add to list"/>`);
    let back = $(`<input type="button" value="back"/>`);
    add.on("click",()=>{
        minimizeMenu();
        watchList.add({
            image: thumbnail,
            title: title,
            year: year,
            description: description,
            type: "Movie"
        });
        
    });
    back.on("click",()=>{
        $("#results").html("")
        searches.movie($("#search").val());
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
