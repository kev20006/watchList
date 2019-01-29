

const recommendations = {
    recommendationsList:(type)=> {
        closeDrawerMenu()
        tmdb.getObjects({ type:"movie", listType: "recommendations", rectype: type }, (movieObjectArray) => {
            watchList.render(movieObjectArray, true);
        }); 
    }


}

