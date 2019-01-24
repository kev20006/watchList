//ALL API calls to The Movie Database are handled in this file.

const tmdb = {
    key: "405219586381645a0c87c4c5dc9211d9",
    getURL: (typeOfSearch, details)=>{
        switch (typeOfSearch){
            case "movie search":
                return `https://api.themoviedb.org/3/search/movie?api_key=${tmdb.key}&language=en-US&query=${details.terms}&page=${details.page}`;
            case "movie details":
                return `https://api.themoviedb.org/3/movie/${details.id}?api_key=${tmdb.key}&language=en-US&append_to_response=credits`;
            case "cinema now": 
                return `https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdb.key}&language=en-US&page=1`;
            case "top movies":
                return `https://api.themoviedb.org/3/movie/top_rated?api_key=${tmdb.key}&language=en-US&page=1`;
            case "movie genre":
                return `https://api.themoviedb.org/3/discover/movie?api_key=${tmdb.key}&language=en-us&with_genres=${details.genre}`
            case "movie actor":
                return `https://api.themoviedb.org/3/person/${details.id}?api_key=${tmdb.key}&append_to_response=movie_credits`
            case "tv search":
                return `https://api.themoviedb.org/3/search/tv?api_key=${tmdb.key}&language=en-US&query=${details.terms}&page=${details.searchPage}`;
            case "tv details":
                return //api end point
            case "tv now":
                return //api end point
            case "top tv":
                return //api end point
            case "tv genre":
                return //api end point

        }
    },
    getMovieObjects: async (details, callback)=>{
        let movieList = []
        if (details.listType == "search"){
            movieList = tmdb.getMovieSearchResults(details.terms, details.page)
        }
        else if (details.listType == "recommendations"){
            movieList = tmdb.getMovieRecommendations(details.rectype)
        }
        movieList.then((movies)=>{
            moviePromises = [];
            movies.results.forEach((element)=>{
                moviePromises.push(tmdb.getMovieDetails(element.id))
            })
            Promise.all(moviePromises).then((moviesWithDetails)=>{
                let movieObjectArray = []
                moviesWithDetails.forEach(movie=>{
                     movieObjectArray.push(tmdb.makeMovieObject(movie))
                })
                callback(movieObjectArray)

            })
        })
    },

    getMovieSearchResults:(terms, page)=>{
        return Promise.resolve($.getJSON(tmdb.getURL("movie search", {terms:terms, page:page})));
    },

    getMovieDetails:(id)=>{
        return Promise.resolve($.getJSON(tmdb.getURL("movie details", {id: id})));
    },

    getMovieRecommendations:(type)=>{
        return Promise.resolve($.getJSON(tmdb.getURL(type)));
    },

    makeMovieObject:(movieDetails)=>{
        let thumb = "https://image.tmdb.org/t/p/w92"
        let lrgImage = "https://image.tmdb.org/t/p/w600_and_h900_bestv2"
        let director = "None Acknowledged"
        movieDetails.credits.crew.forEach(element => {
            if (element.job == "Director") {
                director = element.name
            }
        })
        let cast = []
        for (let i = 0; i <= 3; i++) {
            if (movieDetails.credits.cast[i]){
                cast.push(movieDetails.credits.cast[i])
            }
            
        }

        if (movieDetails.poster_path == null){
            thumb = "./assets/images/no-movie-found.png"
            lrgImage = "./assets/images/no-movie-found.png"
        }else{
            thumb += movieDetails.poster_path
            lrgImage += movieDetails.poster_path
        }
        return new movie(
            {
                dbid: movieDetails.id,
                title: movieDetails.title,
                thumb: thumb,
                lrgImage: lrgImage,
                longDescription: movieDetails.overview,
                year: movieDetails.release_date.split("-")[0],
                genre: movieDetails.genres,
                note: "",
                director: director,
                rating: movieDetails.vote_average * 10,
                cast: cast
            }
        )
        
    }
}