

const recommendations = {
    recommendationsList:(type)=> {
        closeDrawerMenu()
        tmdb.getObjects(
            {type:"movie", listType: "recommendations", recType: type }, 
            (movieObjectArray) => {
                watchList.render(movieObjectArray, true);
            }
        ); 
    }


}

