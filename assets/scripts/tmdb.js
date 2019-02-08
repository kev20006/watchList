//ALL API calls to The Movie Database are handled in this file.

const tmdb = {
    key: "405219586381645a0c87c4c5dc9211d9",
    getURL: (typeOfSearch, details)=>{
        if (!details.page){
            details.page=1;
        }
        switch (typeOfSearch){
            case "movie search":
                return `https://api.themoviedb.org/3/search/movie?api_key=${tmdb.key}&language=en-US&query=${details.terms}&page=${details.page}`;
            case "movie details":
                return `https://api.themoviedb.org/3/movie/${details.id}?api_key=${tmdb.key}&language=en-US&append_to_response=credits`;
            case "cinema now": 
                return `https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdb.key}&language=en-US&page=${details.page}`;
            case "top movies":
                return `https://api.themoviedb.org/3/movie/top_rated?api_key=${tmdb.key}&language=en-US&page=${details.page}`;
            case "movie genre":
                return `https://api.themoviedb.org/3/discover/movie?api_key=${tmdb.key}&language=en-us&with_genres=${details.id}&page=${details.page}`
            case "tv genre":
                return `https://api.themoviedb.org/3/discover/tv?api_key=${tmdb.key}&language=en-us&with_genres=${details.id}&page=${details.page}`    
            case "movie actor":
                return `https://api.themoviedb.org/3/person/${details.id}?api_key=${tmdb.key}&append_to_response=movie_credits`
            case "tv search":
                return `https://api.themoviedb.org/3/search/tv?api_key=${tmdb.key}&language=en-US&query=${details.terms}&page=${details.page}`;
            case "tv details":
                return `https://api.themoviedb.org/3/tv/${details.id}?api_key=${tmdb.key}&language=en-US&append_to_response=credits`
            case "tv now":
                return `https://api.themoviedb.org/3/tv/on_the_air?api_key=${tmdb.key}&language=en-US&page=${details.page}`
            case "top tv":
                return `https://api.themoviedb.org/3/tv/top_rated?api_key=${tmdb.key}&language=en-US&page=${details.page}`
            case "tv recommendations":
                return `https://api.themoviedb.org/3/tv/${details.id}/recommendations?api_key=${tmdb.key}&language=en-US&page=1`
            case "tv today":
                return `https://api.themoviedb.org/3/tv/airing_today?api_key=${tmdb.key}&language=en-US&page=${details.page}`
            case "person search":
                return `https://api.themoviedb.org/3/search/person?api_key=${tmdb.key}&language=en-US&query=${details.terms}&page=${details.page}`;

        }
    },
    /*all objects should include: 
        * listtype: the type of list (search, recommendations)
        * type: the type of object date pertains to, movie or tv
        Searches should include:
        * search terms
        * the current page of the search
        Recommendations should include:
        * rectype: the type of recommendation used to generate URLS
        * ID: genre id, actor id, movie id, used to generate recommendations
    */ 
    getObjects: (details, callback)=>{
        let list = []
        if (details.listType == "search"){
            list = tmdb.getSearchResults({type: details.type, terms: details.terms, page: details.page})
        }
        else if (details.listType == "recommendations"){
            list = tmdb.getRecommendations(details)
        }
        list.then((items)=>{
            console.log(items)
            if (details.recType == "movie actor"){
                if (details.page){
                    let upperbound = (details.page * 20) - 1;
                    if (upperbound > items.movie_credits.cast.length) {
                        upperbound = items.movie_credits.cast.length
                    }
                    let lowerbound = (details.page - 1) * 20;
                    console.log(items)
                    console.log(`${lowerbound} and ${upperbound}`)
                    items = items.movie_credits.cast.slice(lowerbound, upperbound);
                    console.log(items)
                }
                else{
                    
                    items = [items.movie_credits.cast[randomIndex(items.movie_credits.cast.length)]];
                }
               
            }
            else if (details.recType == "movie genre"){
                if (details.page) {
                    items = items.results
                }
                else{
                    items = [items.results[randomIndex(items.results.length)]];
                }
                
            }
            else{
                items = items.results
            }
            console.log(items)
            itemPromises = [];
            items.forEach((element)=>{
                itemPromises.push(tmdb.getDetails({type: details.type, id: element.id}))
            })
            Promise.all(itemPromises).then((itemsWithDetails)=>{
                let objectArray = []
                itemsWithDetails.forEach(e=>{
                    //type is lowercase, so this corrects it to camelCase to generate the correct object
                    objectArray.push(tmdb[`make${capitalise(details.type)}Object`](e))
                })
                callback(objectArray)

            })
            .catch(e=>{
                if (e.status == 429){
                    showWarning(
                        `Maximum Requests made.Retrying Request in
                        <span id="warning-time-left"></span>
                        Seconds - click to close this warning`
                        );
                    setTimeout(() => {tmdb.getObjects(details, callback)}, 8000);
                    
                }
                else {
                    console.log("Catching Movie List Error");
                    console.log(e);
                }
            });
        })
        .catch(e=>{
            if (e.status == 429) {
                showWarning(
                    `Maximum Requests made.Retrying Request in
                        <span id="warning-time-left"></span>
                        Seconds - click to close this warning`
                );
                setTimeout(() => { tmdb.getObjects(details, callback) }, 8000);
            }
            else {
                console.log("Catching Movie List Error");
                console.log(e);
            }
            
            
            
        });
    },

    getSearchResults:(object)=>{
        return Promise.resolve($.getJSON(tmdb.getURL(`${object.type} search`, {terms:object.terms, page:object.page})));
    },

    getDetails:(object)=>{
        return Promise.resolve($.getJSON(tmdb.getURL(`${object.type} details`, {id: object.id})));
    },

    getRecommendations:(object)=>{
        console.log(tmdb.getURL(object.recType, { id: object.id, page: object.page }))
        return Promise.resolve($.getJSON(tmdb.getURL(object.recType, {id: object.id, page:object.page})));
    },

    getGenres:(type)=>{
        return Promise.resolve($.getJSON(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${tmdb.key}&language=en-US`));
    },

    getEpisodeName:(id, season, episode, callback)=>{
        let urlString = `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}?api_key=405219586381645a0c87c4c5dc9211d9&language=en-US`
        let episodeDetails = $.getJSON(urlString)
        episodeDetails.then((episode)=>{callback(episode)});
    },

    makeMovieObject:(movieDetails)=>{
        let thumb = "https://image.tmdb.org/t/p/w92";
        let lrgImage = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";
        movieDetails.credits.crew.forEach(element => {
            if (element.job == "Director") {
                director = element.name;
            }
        })
        let cast = []
        for (let i = 0; i <= 3; i++) {
            if (movieDetails.credits.cast[i]){
                cast.push(movieDetails.credits.cast[i]);
            }
            
        }

        if (movieDetails.poster_path == null){
            thumb = "./assets/images/no-movie-found.png";
            lrgImage = "./assets/images/no-movie-found.png";
        }else{
            thumb += movieDetails.poster_path;
            lrgImage += movieDetails.poster_path;
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
        
    },
    makeTvObject:(tvDetails)=>{
        let thumb = "https://image.tmdb.org/t/p/w92";
        let lrgImage = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";
        if (!tvDetails.poster_path){
            thumb = "./assets/images/no-tv-found.png";
            lrgImage = "./assets/images/no-tv-found.png";
        }
        else{
            thumb += tvDetails.poster_path;
            lrgImage += tvDetails.poster_path;
        }
        let cast = [];
        for (let i = 0; i <= 3; i++) {
            if (tvDetails.credits.cast[i]) {
                cast.push(tvDetails.credits.cast[i])
            }
        }
        let year = null;
        if (tvDetails.first_air_date){
            year = tvDetails.first_air_date.split("-")[0]
            
        }
        let epTracker = []
        tvDetails.seasons.forEach(element =>{
            let episodes = []
            for (i = 0; i < element.episode_count; i++){
                episodes.push({
                    watched: false,
                    episode: i+1,
                });
            }
            epTracker.push({
                name: element.name,
                episodes: episodes
            });
        });
        return new tv(
            {
                dbid: tvDetails.id,
                title: tvDetails.name,
                thumb: thumb,
                lrgImage: lrgImage,
                longDescription: tvDetails.overview,
                year: year,
                genre: tvDetails.genres,
                note: "",
                rating: tvDetails.vote_average * 10,
                cast: cast,
                lastEpisode: tvDetails.last_episode_to_air,
                nextEpisode: tvDetails.next_episode_to_air,
                seasons: tvDetails.seasons,
                epTracker: epTracker
            }
        );
    }
}

