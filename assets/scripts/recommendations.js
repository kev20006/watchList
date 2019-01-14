
    

const recommendations = {
    get: (type)=>{
        let recdetails = {}
        if (type == "theatres"){
            recdetails.apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${searches.keys[0]}&language=en-US&page=1`
            recdetails.domObject = $(`#theatres`)
            }
        $.getJSON(recdetails.apiUrl, (data) => {
            recdetails.domObject.html("")
            console.log(data)
            data.results.forEach((element) => {
                console.log(element)
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
                recdetails.domObject.append(searchResult.card(true));
            })
            $(".owl-carousel").owlCarousel({
                loop: true,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                        nav: false
                    },
                    800: {
                        items: 2,
                        nav: false
                    },
                    1200: {
                        items: 3,
                        nav: false,
                    }, 
                    1500: {
                        items: 4,
                        nav: false,
                    },
                    1900: {
                        items: 5,
                        nav: false,
                    }
                }
            });
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
        let title = $(`<div width="90vw" class="mx-0 px-o"><p>Now Playing in Theatres:</p><p><small>swipe for more movies</small></p></div>`)
        inTheatres.append(title);
        let carousel = $(`<div id="theatres" class="owl-carousel"></div>`)
        $("#watch-list").append(inTheatres, carousel)
        recommendations.get("theatres");
        
    }

}

