"use strict"


var movieKey = "405219586381645a0c87c4c5dc9211d9",

    results = document.getElementById("results"),
    selectedMovie = document.getElementById("selectedMovie");

movieBox.addEventListener("input", ()=> {

    var xhttp = new XMLHttpRequest(),
        method = "GET",
        URL = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&language=en-US&query=`,
        page = 1;


    console.log(URL + movieBox.value + `&page=${page}`)
    xhttp.open(method, URL + movieBox.value + `&page=${page}`, true);
    xhttp.onreadystatechange = ()=> {
        results.innerHTML = ""
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.responseText);
        }    
    }

    xhttp.onload = function () {
    // Begin accessing JSON data here
        var data = JSON.parse(this.response);

        if (this.status >= 200 && this.status < 400) {
            data.results.forEach((movie)=>{
                let listItem = document.createElement("li");
                listItem.setAttribute("id", movie.id);
                listItem.setAttribute("class", "list-item");
                listItem.addEventListener("click", () =>{
                    selectedMovie.innerHTML = "";
                    selectedMovie.appendChild(genMovieHTML(movie));
                })
                listItem.textContent = movie.title
                results.appendChild(listItem)
            })
        } else {
            console.log('error');
        }
    }
    xhttp.send();
});


function genMovieHTML(movie){
    let movieCard = document.createElement("div");
    let movieThumb = document.createElement("img");
    movieThumb.setAttribute("src", `https://image.tmdb.org/t/p/w92${movie.poster_path}`);
    movieThumb.setAttribute("alt", movie.title);
    let movieCardTitle = document.createElement("h3");
    movieCardTitle.textContent = movie.title;
    let movieCardOverview = document.createElement("p");
    movieCardOverview.textContent = movie.overview
    let addButton = document.createElement("button");
    addButton.textContent = "add movie";
    addButton.addEventListener("click",()=>{
        watchList.add({
            type: "Movie",
            title: movie.title,
            image:`https://image.tmdb.org/t/p/w92${movie.poster_path}`,
            description:  movie.overview.split(".")[0] +"."
        });
        selectedMovie.innerHTML = "";
        results.innerHTML =""
        movieBox.value = ""
        
    });
    movieCard.appendChild(movieThumb);
    movieCard.appendChild(movieCardTitle);
    movieCard.appendChild(movieCardOverview);
    movieCard.appendChild(addButton);
    return movieCard;
           
           
};
