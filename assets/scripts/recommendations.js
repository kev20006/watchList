

const recommendations = {
    recommendationsList:(object)=> {
        if(object.page == 1){
            closeDrawerMenu()
        }
        $("#watch-list").html(`<div class="no-results text-center">
                <img src="./assets/images/loading.gif">
                <p>fetching your recommendations</p> 
                </div>
            `);
        tmdb.getObjects(
            {type: object.type, listType: "recommendations", recType: object.recType, page:object.page}, 
            (movieObjectArray) => {
                watchList.render(movieObjectArray, true);
                $("#watch-list").append(`<div id="next-twenty" class="card"></div>`);
                if(movieObjectArray.length == 20){
                    $("#watch-list").append(`<div id="next-twenty"class="button-wrapper d-flex flex-wrap justify-content-center"></div>`);
                    let moreButton = $(`<div class="btn btn-default"> Show Me More ${capitalise(object.type)}s</div>`)
                        .on("click", () => {
                            recommendations.recommendationsList({ type: object.type, recType: object.recType, page: object.page + 1}); 
                        });
                    $("#next-twenty").append(moreButton);
                }
            }
        );
    }


}

