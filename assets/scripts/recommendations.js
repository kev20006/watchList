

const recommendations = {
    recommendationsList:(type)=> {
        closeDrawerMenu()
        tmdb.getMovieObjects({ listType: "recommendations", rectype: type }, (movieObjectArray) => {
            watchList.render(movieObjectArray, true);
        }); 
    }


}

