

const recommendations = {
    recommendationsList:(object)=> {
        closeDrawerMenu()
        $("#watch-list").html(`<div class="no-results text-center">
                <img src="./assets/images/loading.gif">
                <p>fetching your recommendations</p> 
                </div>
            `);
        tmdb.getObjects(
            {type: object.type, listType: "recommendations", recType: object.recType }, 
            (movieObjectArray) => {
                watchList.render(movieObjectArray, true);
            }
        );
    }


}

