
    

const recommendations = {
    get: (type, last)=>{
        let recdetails = {}
        if (type == "theatres"){
            recdetails.apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${searches.keys[0]}&language=en-US&page=1`
        }else if (type == "top-movies") {
            recdetails.apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=405219586381645a0c87c4c5dc9211d9&language=en-US&page=1`
        } else if (type == "top-tv-shows"){
            //do something
        }
        recdetails.domObject = $(`#${type}`)
        $.getJSON(recdetails.apiUrl, (data) => {
            recdetails.domObject.html("")
            console.log(data)
            let index = 0
            data.results.forEach((element) => {
                let searchResult = new movie(
                    element.id,
                    element.title,
                    `https://image.tmdb.org/t/p/w92${element.poster_path}`,
                    `https://image.tmdb.org/t/p/w600_and_h900_bestv2${element.poster_path}`,
                    element.overview,
                    element.release_date.split("-")[0],
                    "genre",
                    ""
                )
                searchResult.id = `${type}-${index}-card`;
                recdetails.domObject.append(searchResult.card(true));
                searchResult.updateCardTags()
                index ++;
            })
            if (last || !last){
                //$(".owl-carousel").
                $(`#${type}`).owlCarousel({
                    loop: true,
                    responsiveClass: true,
                    nav: true,
                    dots: true,
                    responsive: {
                        0: {
                            items: 1
                        },
                        800: {
                            items: 2
                        },
                        1200: {
                            items: 3
                        },
                        1500: {
                            items: 4
                        },
                        1900: {
                            items: 5
                        }
                    }
                });
            }
        })
        .fail(function () {
            console.log("there was an error of sorts")
        });
    },
    
    recommendationsList:()=> {
        closeDrawerMenu()
        $("#view-title").html("<h3>Recommendations</h3>")
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

