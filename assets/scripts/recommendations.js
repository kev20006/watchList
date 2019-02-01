

const recommendations = {
    recommendationsList:(type)=> {
        closeDrawerMenu()
        $("#watch-list").html(`<div class="no-results text-center">
                <img src="./assets/images/loading.gif">
                <p>fetching your recommendations</p> 
                </div>
            `);
        tmdb.getObjects(
            {type:"movie", listType: "recommendations", recType: type }, 
            (movieObjectArray) => {
                watchList.render(movieObjectArray, true);
            }
        );
    }


}

