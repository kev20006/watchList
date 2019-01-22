//ALL API calls to The Movie Database are handled in this file.

const tmdb = {
    key: "405219586381645a0c87c4c5dc9211d9",
    getURL: (typeOfSearch, details)=>{
        switch (typeOfSearch){
            case "movie search":
                return `https://api.themoviedb.org/3/search/movie?api_key=${tmdb.key}&language=en-US&query=${details.terms}&page=${details.page}`;
            case "movie details":
                return `https://api.themoviedb.org/3/movie/${details.id}?api_key=${tmdb.key}&language=en-US&append_to_response=credits`;
        }
    },
    getMovieSearchObjects: async (terms, page, callback)=>{
        let movieList = tmdb.getMovieSearchResults(terms, page)
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
    makeMovieObject:(movieDetails)=>{
        let director = "None Acknowledged"
        movieDetails.credits.crew.forEach(element => {
            if (element.job == "Director") {
                director = element.name
            }
        })
        let cast = []
        for (let i = 0; i <= 3; i++) {
            cast.push(movieDetails.credits.cast[i])
        }
        return new movie(
            {
                dbid: movieDetails.id,
                title: movieDetails.title,
                thumb: `https://image.tmdb.org/t/p/w92${movieDetails.poster_path}`,
                lrgImage: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieDetails.poster_path}`,
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