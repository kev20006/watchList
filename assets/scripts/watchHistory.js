const watchHistory = {
    render(){
        closeDrawerMenu()
        $("#watch-list").html("");
        $("#watch-list").append(watchHistory.getCurrentListStatsHTML(), watchHistory.movieHistory(), watchHistory.tvHistory());
    },
    getCurrentListStatsHTML: ()=> {
        let noOfMovies = 0;
        let noOfTV = 0;
        let genres = {};
        watchList.contents.forEach(element =>{
            if (element.type == "movie"){
                noOfMovies += 1;
            }else{
                noOfTV += 1;
            }
            element.genre.forEach(item =>{
                if (!genres[item.name]) {
                    genres[item.name] = [element]
                } else {
                    genres[item.name].push(element)
                }
            })
        })

        let htmlOutput = $(`<article class="card info-card p-3">
                            <header class="mb-2">
                            <h3 class="heading">Current List</h3>
                            </header>
                            <hr>
                            <main>
                            <div class="row mx-0 "><p>You have <strong>${noOfMovies + noOfTV}</strong> items in your list</P>
                            <div class= "row breakdown">
                                <div class="col-12">
                                    <p><strong>Movies:</strong><span>${noOfMovies}</span></p>
                                </div>
                                <div class="col-12">
                                    <p><strong>TV Shows:</strong><span>${noOfTV}</span></p>
                                </div>
                            </div>
                            <hr>
                            <div id="list-genres" class= "row genres">
                               <div class="col-12"><p class="heading"> Genres: </p> </div>
                            </div>
                            </main>
                            </article>
        `);
        Object.keys(genres).forEach( (element)=> {
            htmlOutput.find("#list-genres").append(`
                <div class="col-12 genre d-flex justify-content-between my-1">
                        <p>
                            <strong>${element}</strong> : <span>${genres[element].length}</span>
                        </p>
                    <div class="btn btn-default" type="button" data-toggle="collapse" 
                    data-target="#${element.replace("&", "").replace(" ", "-").replace(" ", "-")}-items" aria-expanded="false" aria-controls="${element.replace("&", "").replace(" ", "-").replace(" ", "-")}-items">
                            >
                    </div>
                  </div>
                <div class="collapse" id="${element.replace("&", "").replace(" ", "-").replace(" ", "-")}-items">
                </div>
                
                    `);
                    console.log(element)
                    genres[element].forEach(item =>{
                        let overviewItem = $(`<div class="col-12 d-flex justify-content-around align-items-center overview-item">
                                <img src="${item.thumb}" alt="${item.title}">
                                <p> <strong>${item.title}</strong></p>
                                <p> ${item.year} </p>
                            </div>`)
                            .on("click", () => {
                                makePopUp(item.type);
                                $("#search-box").addClass("d-none").removeClass("d-flex");
                                $("#results").html(item.itemPreview("recommendation"));
                            });
                        htmlOutput.find(`#${element.replace("&", "").replace(" ", "-").replace(" ", "-")}-items`).append(overviewItem);
                    })
        });

        return htmlOutput
    },
    movieHistory: () =>{
        return `<article class="card info-card p-3">
                            <header class="mb-2">
                            <h3 class="heading">Movie History</h3>
                            </header>`
    },
    tvHistory: () => {
        return `<article class="card info-card p-3">
                            <header class="mb-2">
                            <h3 class="heading">TV History</h3>
                            </header>`
    }
 

}