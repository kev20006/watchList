const watchHistory = {
    render(){
        $("#watch-list").html("");
        $("#watch-list").append(watchHistory.getCurrentListStatsHTML())
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
            console.log(element)
            element.genre.forEach(item =>{
                console.log(item.name)
                if (genres[item.name]) {
                    genres[item.name] = 1
                } else {
                    genres[item.name] += 1
                }
            })
        })
        console.log(genres)
        let htmlOutput = $(`<article class="card info-card p-3">
                            <header>
                            <p class="heading">Current List</p>
                            </header>
                            <hr>
                            <main>
                            <div class="row mx-0 "><p>You have <strong>${noOfMovies + noOfTV}</strong> items in your list</P>
                            <div class= "row breakdown">
                                <div class="col-6">
                                    <p><strong>Movies:</strong><span>${noOfMovies}</span></p>
                                </div>
                                <div class="col-6">
                                    <p><strong>TV Shows:</strong><span>${noOfTV}</span></p>
                                </div>
                            </div>
                            <hr>
                            <div id="list-genres" class= "row genres">
                               <p class="heading"> Genres: </p> 
                            </div>
                            </main>
                            </article>
        `)

        
        Object.keys(genres).forEach( (element)=> {
            htmlOutput.find("#list-genres").append(`<div class="genre"><p>${element} : ${genres[element]}</p>`)
        });

        return htmlOutput
    }
}