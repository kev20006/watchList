
    

const recommendations = {

    /*  */
    get: (type)=>{
        console.log(type)
        let recdetails = {}
        if (type == "theatres"){
            recdetails.apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${searches.keys[0]}&language=en-US&page=1`
        }else if (type == "top-movies") {
            recdetails.apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${searches.keys[0]}&language=en-US&page=1`
        } else if (type == "top-tv-shows"){
            //do something
        }
        recdetails.domObject = $(`#${type}`)
        $.getJSON(recdetails.apiUrl, (data) => {
            recdetails.domObject.html("")
            console.log(data)
            let index = 0
            let noOfResults = data.results.length
            data.results.forEach((element) => {
                searches.fullMovie(element.id, (movie) => {
                    movie.id = `${type}-${index}-card`;
                    recdetails.domObject.append(movie.card(true));
                    movie.updateCardTags()
                    index++;
                    if (index == noOfResults) {
                        $(`#${type}`).owlCarousel({
                            loop: true,
                            responsiveClass: true,
                            nav: false,
                            dots: false,
                            responsive: {
                                0: {
                                    items: 1,
                                },
                                800: {
                                    items: 2,
                                },
                                1200: {
                                    items: 3,
                                },
                                1500: {
                                    items: 4,
                                },
                                1900: {
                                    items: 5,
                                }
                            }
                        });
                    }
                });  
            })
            
            
        })
        .fail(function () {
            console.log("there was an error of sorts")
        });
    },
    
    recommendationsList:()=> {
        closeDrawerMenu()
        $("#view-title").html("<h6>Recommendations</h6>")
        $("#watch-list").html("");
        let inTheatres = $("<div></div>")
        let help = $(`<div class="my-0"><p><small><- swipe for more movies -></small></p></div>`)
        let title = $(`<div width="90vw" class="mx-0 px-o"><h3>Now Playing in Theatres:</h3></div>`)
        let carousel = $(`<div id="theatres" class="owl-carousel"></div>`)
        inTheatres.append(title);
        $("#watch-list").append(inTheatres, carousel, help)
        let topMovies = $("<div></div>");
        title = $(`<div width="90vw" class="mx-0 px-o"><h3>Top Rated Movies:</h3></div>`);
        carousel = $(`<div id="top-movies" class="owl-carousel"></div>`);
        topMovies.append(title)
        $("#watch-list").append(topMovies, carousel, help) 
        recommendations.get("theatres");
        recommendations.get("top-movies", true);
    }


}

