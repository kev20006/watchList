//Movie, TV, Game and Book Classes are defined in this file.
//Each class contains methods to generate the HTML for the cards, item previews and search results

'use strict';

class watchItem {
/*
Watch Item is the base class that goes on to form the movie and TV Objects
Watch Item has a constructor method for adding common information to the item
It also has methods to generate the HTML for the cards, search results and previews
*/
    constructor(object) {
        this.dbid = object.dbid;
        this.title = object.title;
        this.thumb = object.thumb;
        this.lrgImage = object.lrgImage;
        if(object.longDescription == undefined){
            this.longDescription = "no description given";
            this.shortDescription = "no description given";
        }
        else{
            this.longDescription = object.longDescription;
            if (object.longDescription.length <= 200) {
                this.shortDescription = object.longDescription;
            } else {
                this.shortDescription = `${object.longDescription.substring(0, 200)}...`;
            }
        }
        this.year = object.year;
        this.genre = object.genre;
        this.note = object.note;
        this.searchItem = this.searchItem.bind(this);
        this.itemPreview = this.itemPreview.bind(this);
        this.updateCollections = this.updateCollections.bind(this);
        this.updateCardTags = this.updateCardTags.bind(this); 
    }
    
    searchItem(actorSearch) {
    //search item generates the html that is displayed when the user searches for TV or a Movie 
    //it takes in a state parameter called actor search, to record where the search result was generated from 
    // if actor search is true, it will pass a different location to the item preview method, to allow the back button to work correctly
        let wrapper = $(`<div class="result row pt-2 mx-0"></div>`);
        let imgWrapper = $(`<div class="col-3 col-offset-2 "></div>`);
        let textWrapper = $(`<div class="col-7"></div>`);
        let genreHtml = $(`<p class="my-0 d-flex flex-wrap"></p>`);
        this.genre.forEach((element)=>{
            genreHtml.append(`<span class="mr-2 mb-1 collection-tag">${element.name}</span>`);
        })
        let leadCastHtml = $(`<p class="d-none d-sm-block my-0"></p>`).append(`<pn class="mr-2"><strong><small>Lead Cast:</small></strong>`);
        this.cast.slice(0,2).forEach((element) => {
            leadCastHtml.append(`<span class="mr-2"><small>${element.name}</small></span>`);
        })

        imgWrapper.append(`<img src=${this.thumb} class="result-thumb mx-auto d-block" alt=${this.title.substring(0, 50)} />`);
        textWrapper.append(
            `<h6 class="result-title"><strong class="heading">${this.title.substring(0, 40)}</strong> - ${this.year}</h6>`,
            genreHtml, leadCastHtml
        );
        wrapper.on("click", () => {
            if(!actorSearch){
                $("#results").html(this.itemPreview("search"));
                watchList.renderDataLists(); 
            }
            else{
                $("#results").html(this.itemPreview("actorSearch"));
            }
            $("#search-box").addClass("d-none").removeClass("d-flex");
        });
        let buttonWrapper = $('<div class="col-2 px-0"></div>');
        let addButton = $(`<div class="add d-flex justify-content-center align-items-center mr-2"> 
                            <i class="fas fa-plus my-0"></i>
                            </div>`)
            .on("click", () => {
                closePopUp();
                watchList.add(this);
                watchList.render(watchlist.contents);
            })
        buttonWrapper.append(addButton);
        wrapper.append(imgWrapper, textWrapper, buttonWrapper);
        return wrapper
    }

   
    itemPreview(location) {
    
    /* item preview generates the HTML that is displayed when a user clicks the more information button on a card
    or on a search result, and displays full information on a movie card.

    The parameter location is used to determine what controls appear on the card.
    if the preview location is a recommendation, search result, it is not already in the list and therefore should
    display controls to add it to the list or to return to the previous location

    If the location is a card in the users list controls are displayed to like, dislike or delete the movie from the list

    this location parameter also determines the functionality of the back button: for search results the back button returns to the search
    and for list items the back button just closes the popup and returns to the list
    */
        let pageNumber = $("#results").attr("data-page")
        let wrapper = $(`<div class="row mx-0 preview"></div>`);
        let previewHeader = $(`<header class="col-12 prev-head"></header>`);
        let titleContainer = $(`<div class="row mx-0 p-2"></div>`);
        let titleContent = $(`<h3>${this.icon}<strong class="mx-2 heading">${this.title}</strong> <small class="ml-3">(${this.year})</small></h3>`);
        let genreContainer = $(`<div class="genres row mx-0 p-2 mb-0"></div>`);
        genreContainer.append(`<div class="d-inline-block"><strong>Genres:</strong></div>`);
        this.genre.forEach(element => {
            genreContainer.append(`<div class="ml-2 d-inline-block">${element.name}</div>`)
        });
        titleContainer.append(titleContent);
        previewHeader.append(titleContainer, genreContainer);
        wrapper.append(previewHeader, $(`<hr>`));
        let previewBody = $(`<main class="row mx-0"></main>`);
        let imageWrapper = $(`<div class="col-12 col-sm-4 d-flex justify-content-center img-wrapper"></div>`);
        //style this image properly using scss please
        imageWrapper.append(` <img class="p-2 pl-2" src=${this.lrgImage} alt=${this.title} />`)
        previewBody.append(imageWrapper);
        let previewMainContentContainer = $(`<div class="content col-12 col-sm-8"></div>`);
        let controlsContainer = $(`<div class="controls d-flex justify-content-around align-items-center"></div>`)
            .append(`<div class="rating">
                    <div class= "d-flex flex-column">
                    <div><strong>rating</strong></div>
                    <div><strong class="heading">${this.rating}%</strong></div>
                    </div>
                    </div>`);
        let addBtn = $(`<div class="d-flex justify-content-center align-items-center btn-add-to-list btn-default"><i class="fas fa-plus my-0"></i></div>`)
            .on("click", () => {
                closePopUp();
                watchList.add(this);
                watchList.render(watchlist.contents);
                
            });
        let likeBtn = $(`<div class="d-flex justify-content-center align-items-center btn-thumbs-up btn-success"><i class="fas fa-thumbs-up"></i></div>`)
            .on("click",()=>{
                watchList.addLike(this.type, this.dbid, this.title, this.genre)
                watchList.remove(this.id.split("-")[1])
                watchList.render(watchList.contents);
                this.getRecommendations("card");
            });
        let dislikeBtn = $(`<div class="d-flex justify-content-center align-items-center btn-thumbs-down btn-danger"><i class="fas fa-thumbs-down"></i></div>`)
            .on("click", () => {
                watchList.addDislike(this.type)
                watchList.remove(this.id.split("-")[1])
                watchList.render(watchList.contents);
                closePopUp();
            });
        let deleteBtn = $(`<div class="d-flex justify-content-center align-items-center btn-delete btn-default"><i class="fas fa-trash-alt"></i></div>`)
            .on("click", () => {
                watchList.remove(this.id.split("-")[1]);
                watchList.render(watchList.contents);
                closePopUp();
            });
        let backbutton = `<i class="fas fa-times"></i>`;
        if (location == "search") {
            backbutton = `<i class="fas fa-search"></i>`;
            
        }
        let backBtn = $(`<div class="d-flex justify-content-center align-items-center btn-back btn-default">${backbutton}</div>`)
            .on("click", () => {
                $("#search-box").removeClass("d-none").addClass("d-flex");
                if (location == "search" || location == "actorSearch"){
                    $("#results").html("")
                    if (location == "search"){
                        console.log(`searching ${$("#search-box input").val()}`)
                        searches[this.type]($("#search-box input").val(), pageNumber);
                    }
                    else{
                        console.log("going back to actormovies")
                        searches.actorMovies({ id: $("#results").attr("data-actorid"), name: $("#search-box input[type=text]").val(), page: pageNumber });
                    }
                    
                }else{
                    closePopUp();
                }
            });
        if (location == "search" || location == "recommendation" || location == "actorSearch"){
            controlsContainer.append(addBtn, backBtn);
        }else{
            controlsContainer.append(likeBtn, dislikeBtn, deleteBtn, backBtn);
        }
        
        let previewDescription = $(`
            <p><strong class="heading">Description:</strong></p>
            <p class="desc-box">${this.longDescription}</p>
            `)
        
        previewMainContentContainer.append(controlsContainer, previewDescription);
        let additionalInfo = $(`<section class="col-12 additional-info">`);
        previewBody.append(previewMainContentContainer, additionalInfo);
        let tagsContainer = $(`<div class=" d-flex flex-wrap preview-tags"></div>`)
            .on('keydown', "input", (e) => {
                if ($(".add-tag").val().length >= 10) {
                    $(".add-tag").css("width", `${120 + (($(".add-tag").val().length -9) * 9)}px`)
                }
                if (e.keyCode == 13) {
                    watchList.addCollection($(".add-tag").val(),this.dbid);
                    let newInput = $(`
                        <input list="tags-list" placeholder="add new"></input>
                        <datalist id="tags-list"></datalist>
                    `)
                        .addClass("add-tag")
                    let newSpan = $(`<span class="collection-tag"></span>`)
                        .append(newInput);
                    $(".preview-tags")
                        .html("")
                        .append(newSpan)
                        .append(this.updateCollections());
                    this.updateCardTags();
                    watchList.renderDataLists();
                    watchList.updateLocalStorage();
                }
            })
            .focusin(()=>{
                $(".help").toggleClass("d-none");
            })
            .focusout(()=>{
                $(".help").toggleClass("d-none");
            })
            .append(`
            <span class="ml-2 collection-tag">
                <input class="add-tag" list="tags-list" placeholder="add new"></input>
                <datalist id="tags-list"></datalist>
            </span>`, 
            this.updateCollections());
        let noteArea = $(`<textarea id="notes" class="notes-area" placeholder="Any Additional notes about this ${this.type}" rows="5">${this.note}</textarea>`)
                        .on("input",(e) =>{
                            this.note = $(e.target).val()
                            watchList.updateLocalStorage();
                        })     
        let tagsAndComments = $(`<section class="col-12"></section>`)
            .append(`<hr><p><strong class="heading">Tags</strong></p>`, 
                    tagsContainer,
                    `<p class="d-none help"><small>press enter to add your new tag</small></p>`, 
                    noteArea
                );

        wrapper.append(previewBody, tagsAndComments);
        wrapper.append("<hr>")
        let castSection = $("<section></section>").append(`<div class="row mx-0 px-1"><p><strong>Top Billed Cast</strong></div>`)
        let castContainer = $(`<div class="row mx-0 px-1"></div>`)
        if (this.cast) {
            this.cast.forEach(element => {
                let actorpic = "https://image.tmdb.org/t/p/w185"
                if (element.profile_path) {
                    actorpic += element.profile_path
                }
                else {
                    actorpic = "./assets/images/no-profile.jpeg"
                }
                castContainer.append($(
                    `<div class="col-6 col-md-3 actor-thumb">
                <div class="img-container">
                    <img src="${actorpic}" alt="${element.name}">
                </div>
                <p><small>${element.name}</small></p>
            </div>`)
                )
            })
        }
        else {
            castContainer.append(`<h3>No Cast Identified</h3>`);
        }
        castSection.append(castContainer);
        wrapper.append(castSection);
        return wrapper;   
    }
    
    card(recommendation) {
    /*
    Card generates the HTML Movie cards that are displayed in the watchlist, or when the user creates lists of recommendations.

    The parameter recommendation records true if the card is generated by a recommendation, and false if not.

    If the card is a recommendation it shows controls to add the object to the list, if it is false it provides controls to like, dislike or delete the item

    The parameter recommendation records true if the card is generated by a recommendation, and false if not.
    */
        let newCard = $(`<article id=${this.id} class="card"></article>`);
        let cardInner = $(`<div class="card-inner"></div>`);
        let cardImage = $(`<div class="card-bg"></div>`);
        cardImage.css("background-image", `url("${this.lrgImage}")`);
        cardInner.append(cardImage);
        let cardInfo = $(`<div class="card-info p-2"></div>`);
        let cardHeader =$(`<header class="card-head"></header>`)
        let cardTitle = $(
            `<div class="row mx-0"><h5 class="text-left">${this.icon}<span class="heading mx-2">${this.title}</span><span class="year"> - ${this.year} </span></h5></div>`
        );
        cardHeader.append(cardTitle);
        let shortDescription = $(`
                                    <p><strong class="heading">Description</strong></p>
                                    <p><small>${this.shortDescription}</small></p>
                                    <hr>
                                `);
        let collectionsSubHeading = $(`<p><strong class="heading">Tags:</strong></p>`);
        let collectionsArea = $(`<div id="collections-${this.id}" class="d-flex flex-wrap"></div>`);
        let findOutMore = $(
            `<div class="btn btn-more-info text-center mt-2">more info</div>`
        );

        findOutMore.on("click", () => {
            makePopUp(this.type);
            if(!recommendation){
                $("#search-box").addClass("d-none").removeClass("d-flex");
                $("#results").html(this.itemPreview("list"));
            }else{
                $("#search-box").addClass("d-none").removeClass("d-flex");
                $("#results").html(this.itemPreview("recommendation"));
            }
            watchList.renderDataLists(); 
        });
        if (!recommendation){
            let buttonWrapper = $('<div class="d-flex justify-content-around"></div>');
            let deleteButton = $(`<div class="d-flex justify-content-center align-items-center btn-actions btn-default"><i class="fas fa-trash-alt"></i></div>`);
            let thumbUpButton = $(`<div class="d-flex justify-content-center align-items-center btn-actions btn-success"><i class="fas fa-thumbs-up"></i></div>`)
                .on("click", () => {
                    watchList.addLike(this.type, this.dbid, this.title, this.genre)
                    watchList.remove(this.id.split("-")[1])
                    this.getRecommendations("card");
                    watchList.render(watchList.contents);
                });
            let thumbDownButton = $(`<div class="d-flex justify-content-center align-items-center btn-actions btn-danger"><i class="fas fa-thumbs-down"></i></div>`)
                .on("click", () => {
                    watchList.addDislike(this.type)
                    watchList.remove(this.id.split("-")[1]);
                    watchList.render(watchList.contents);
                });
            deleteButton.on("click", () => {
                watchList.remove(this.id.split("-")[1]);

            })
            buttonWrapper.append(thumbUpButton, deleteButton, thumbDownButton)
            cardInfo.append(cardHeader, shortDescription, collectionsSubHeading, collectionsArea, findOutMore, buttonWrapper)
        }
        else{
            let quickAdd = $(
                `<div class="btn btn-more-info text-center mt-3">add to list</div>`
            );
            quickAdd.on("click", ()=>{
                if (recommendation == "recommendation"){
                    closePopUp()
                    watchList.render(watchList.contents)
                }
                else{
                    watchList.add(this);
                    makePopUp("add", this.title);
                }
            })
            cardInfo.append(cardHeader, shortDescription, findOutMore, quickAdd)
        }
        cardInner.append(cardInfo)
        newCard.append(cardInner);
        return newCard;
    }

    updateCollections(value) {
        let htmlString = ""
        if (value) {
            this.collection.push(value)
        }
        Object.entries(watchList.collections).forEach(element => {
            if (element[1].includes(this.dbid)) {
                htmlString += `<span class="ml-2 collection-tag">${element[0]}</span>`
            }
        });
        return htmlString;
    }

    updateCardTags(){
        let collectionHTMLstring = this.updateCollections()
        if (collectionHTMLstring.length <= 0) {
            collectionHTMLstring = `<span class="collection-tag mr-1 mb-1">no collections</span>`;
        }
        $(`#collections-${this.id}`).html(collectionHTMLstring);
    }

}
class movie extends watchItem {
    constructor(object) {
        super(object)
        this.type = "movie";
        this.icon = `<i class="fas fa-film m-1"></i>`;
        this.director = object.director;
        this.rating = object.rating
        this.cast = object.cast;
        this.genre = object.genre;
        this.searchItem = this.searchItem.bind(this);
        this.itemPreview = this.itemPreview.bind(this);
        this.card = this.card.bind(this);
        this.updateCollections = this.updateCollections.bind(this);
        this.getRecommendations = this.getRecommendations.bind(this); 
    }

    card(location){
        let cardContents = super.card(location);
        let director = $(`<div class="row mx-0"><p class="text-right"><small><strong class="mr-2">Directed By:</strong>${this.director}</p></small></div>`)
        cardContents.find(".card-head").append(director);
        return cardContents
    }

    getRecommendations(location) {
        if (location == "card") {
            makePopUp()
        }
        let randomGenre = this.genre[randomIndex(this.genre.length)];
        let randomActor = this.cast[randomIndex(this.cast.length)];
        $("#add-or-edit-container").html(`<div class="p-2"><p class="text-center"><strong>Because you liked ${this.title} you might also like </strong></p>
        <p class="text-center">Because you liked ${randomActor.name}</p>
        <div id="actor-rec" class="d-flex justify-content-center">
        </div>
        <p class="text-center">Because you liked a ${randomGenre.name} movie</p>
        <div id="genre-rec" class="d-flex justify-content-center"">
        </div>
        </div>
        `);
        let noButton = $(`<div class="btn btn-default text-center">No Thanks</div>`);
        noButton.on("click", () => {
            closePopUp();
        });
        tmdb.getObjects(
            { listType: "recommendations", 
            recType: `${this.type} actor`, 
            id: randomActor.id, type: this.type }, (movie) => {
            $("#actor-rec").append(movie[0].card("recommendation"));
        });

        tmdb.getObjects({ listType: "recommendations", recType: `${this.type} genre`, id: randomGenre.id, type: this.type }, (movie) => {
            $("#genre-rec").append(movie[0].card("recommendation"));
        });
        let buttonWrapper = $(`<div class="d-flex justify-content-center mb-5"></div>`).append(noButton)

        $("#add-or-edit-container").append(buttonWrapper);


    }
    
}

class tv extends watchItem{
    constructor(object) {
        super(object)
        this.type = "tv";
        this.icon = `<i class="fas fa-tv m-1"></i>`;
        this.rating = object.rating
        this.cast = object.cast;
        this.genre = object.genre;
        this.lastEpisode = object.lastEpisode;
        this.nextEpisode = object.nextEpisode;
        this.seasons = object.seasons;
        this.epTracker = object.epTracker;
        this.searchItem = this.searchItem.bind(this);
        this.itemPreview = this.itemPreview.bind(this);
        this.card = this.card.bind(this);
        this.getRecommendations = this.getRecommendations.bind(this); 
        this.updateCollections = this.updateCollections.bind(this);
        
        
    }
    itemPreview(location) {
        let preview = super.itemPreview(location);
        let seasonList = $(`<div id="seasons" class="d-flex flex-wrap"></div>`)
        let episodeList = $(`<div id="episodes" class="d-flex flex-wrap"></div>`)
        let sIndex = 0;
        this.epTracker.forEach(season =>{
            let epButton = $(`<span id="s-${sIndex}" class="mx-2 season button">${season.name}</span>`)
            .on("click", (e)=>{
                $("#episodes").html("");
                $(e.target).addClass("selected");
                $(e.target).siblings().removeClass("selected");
                this.epTracker[e.target.id.split("-")[1]].episodes.forEach((episode)=>{
                    let state = ""
                    if(episode.watched){
                        state = "watched"
                    }
                    let episodeButon = $(`<span id="S-${e.target.id.split("-")[1]}-E-${episode.episode}" class="mx-2 season-button ${state}">E-${episode.episode}</span>`)
                        .on("click", (e) => {
                            $(".ep-details").html("fetching episode information...")
                            let series = e.target.id.split("-");
                            console.log(this.epTracker[series[1]].episodes[series[3]-1]);
                            tmdb.getEpisodeName(this.dbid, series[1], series[3], (episode)=>{
                                $(".ep-details").html("");
                                $(".ep-details").append(`
                                    <p class="mt-2 mb-0 text-center heading"><strong>${episode.name}</strong></p>
                                    <p class="text-right"><small>first aired: ${tmdbDateFix(episode.air_date)}</small>
                                    <p class="desc-box">${episode.overview}</p>
                                    `);
                                let buttonText = "Mark as Watched";
                                if (this.epTracker[series[1]].episodes[series[3] - 1]){
                                    buttonText = "Unmark as Watched"
                                }
                                let confirmButton = $(`<div id="confirm-button" class="btn-default w-23 mx-auto text-center">${buttonText}</div>`)
                                    .on("click",()=>{
                                        if (this.epTracker[series[1]].episodes[series[3] - 1].watched) {
                                            this.epTracker[series[1]].episodes[series[3] - 1].watched = false;
                                            $(`#S-${series[1]}-E-${series[3]}`).removeClass("selected");
                                            $("#confirm-button").html("Mark as Watched");
                                        } else {
                                            this.epTracker[series[1]].episodes[series[3] - 1].watched = true;
                                            $(`#S-${series[1]}-E-${series[3]}`).addClass("selected");
                                            $("#confirm-button").html("Unmark as Watched");
                                        }
                                    })
                                console.log(episode);
                                $(".ep-details").append(confirmButton);
                            })
                            watchList.updateLocalStorage();
                        });

                    $("#episodes").append(episodeButon)
                        
                  })
                 
            })
            seasonList.append(epButton)
            sIndex += 1;
        })
        let collapseTracker = $(`
        <hr>
        <div class="d-flex justify-content-around">

            <p class="heading">Episode Tracker</p>
            <div class="btn btn-default right" data-toggle="collapse" href="#ep-tracker" role="button" aria-expanded="false" aria-controls="ep-tracker">
                <i class="fas fa-angle-right"></i>
            </div>
        </div>
        <div class="collapse " id="ep-tracker">
            <div id="ep-tracker-content">
            </div>
        </div>`)
            .on("click", (e) => {
                if ($(e.target).closest("div").hasClass("right")) {
                    $(e.target).closest("div").switchClass("right", "down", 500);
                }   
                else {
                    $(e.target).closest(".btn").switchClass("down", "right", 500);
                   
                }
            });
        collapseTracker.find("#ep-tracker-content").append(`<p><strong>Seasons</strong></p>`, seasonList, `<p class="mt-3"><strong>Episodes</strong></p>`, episodeList, `<div class="ep-details"></div>`);
        preview.find(".additional-info").append(collapseTracker);
        return preview;
 
    }
    card(location) {
        let cardContents = super.card(location);
        if(this.nextEpisode){
            let nextEpisode = $(`<div class= "row d-block mx-0 mb-0 text-right" >
                <p class="text-right mb-0"><small>
                <strong class="mr-2">Next Episode:</strong>
                ${this.nextEpisode.name}</p></small>
                <p><small>S${this.nextEpisode.season_number}E${numberString(this.nextEpisode.episode_number)} - ${tmdbDateFix(this.nextEpisode.air_date)} </small></p>
                </div >`);
            cardContents.find(".card-head").append(nextEpisode);
        }
        return cardContents
    }

    getRecommendations(location) {
        if (location == "card") {
            makePopUp()
        }
        $("#add-or-edit-container").html(`<div class="p-2"><p class="text-center"><strong>Because you liked ${this.title} you might also like </strong></p>
        <div id="actor-rec" class="d-flex justify-content-center">
        </div>
        <div id="genre-rec" class="d-flex justify-content-center">
        </div>
        </div>
        `);
        let noButton = $(`<div class="btn btn-default text-center">No Thanks</div>`);
        noButton.on("click", () => {
            closePopUp();
        });
        tmdb.getObjects({ listType: "recommendations", recType: `tv recommendations`, id: this.dbid, type: this.type }, (movie) => {
            let recOneIndex = randomIndex(movie.length);
            let recTwoIndex = randomIndex(movie.length);
            if (recOneIndex == recTwoIndex){
                recTwoIndex -= 1
            }
            $("#actor-rec").append(movie[recOneIndex].card("recommendation"));
            $("#genre-rec").append(movie[recTwoIndex].card("recommendation"));
        });

        let buttonWrapper = $(`<div class="d-flex justify-content-center mb-5"></div>`).append(noButton)
          
        $("#add-or-edit-container").append(buttonWrapper);


    }

}