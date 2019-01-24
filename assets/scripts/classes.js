//Movie, TV, Game and Book Classes are defined in this file.
//Each class contains methods to generate the HTML for the cards, item previews and search results

'use strict';

class watchItem {
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
    set setCollection(args) {
        this.collection = [...args]
    }

    set setNote(note){
        this.note = note;
    }

    set setId(id){
        this.id = id;
    }

    set setActive(newVal){
        this.active = newVal
    }

    searchItem() {
        let wrapper = $(`<div class="d-flex my-2 mx-1"></div>`);
        let imgWrapper = $(`<div></div>`);
        let textWrapper = $(`<div></div>`);
        imgWrapper.append(`<img src=${this.thumb} class="result-thumb" alt=${this.title.substring(0, 50)} height="50px" />`);
        textWrapper.append(`<p class="result-title">${this.title.substring(0, 40)} - ${this.year}</p>`);
        wrapper.on("click", () => {
            $("#results").html(this.itemPreview("search"));
            $("#search-box").addClass("d-none").removeClass("d-flex");
        })
        wrapper.append(imgWrapper, textWrapper);
        return wrapper
    }

    itemPreview(location) {
        let pageNumber = $("#results").attr("data-page")
        let wrapper = $(`<div class="row mx-0 preview"></div>`);
        let previewHeader = $(`<header class="col-12"></header>`);
        let titleContainer = $(`<div class="row mx-0 p-2"></div>`);
        let titleContent = $(`<h3><strong>${this.title}</strong> <small class="ml-3">(${this.year})</small></h3>`);
        let genreContainer = $(`<div class="genres row mx-0 p-2 mb-0"></div>`)
        //placeholder for genres - this will need to iterate
        let genresContent = $(``)
        titleContainer.append(titleContent);
        genreContainer.append(genresContent);
        previewHeader.append(titleContainer, genreContainer);
        wrapper.append(previewHeader, $(`<hr>`));
        let previewBody = $(`<main class="row mx-0"></main>`);
        let imageWrapper = $(`<div class="col-12 col-sm-4 d-flex justify-content-center"></div>`);
        //style this image properly using scss please
        imageWrapper.append(` <img class="p-2 pl-2" style="width:180px; height: 270px" src=${this.lrgImage} alt=${this.title} />`)
        previewBody.append(imageWrapper);
        let previewMainContentContainer = $(`<div class="content col-12 col-sm-8"></div>`);
        let controlsContainer = $(`<div class="controls d-flex justify-content-around flex-wrap"></div>`)
            .append(`<div class="rating"></div>`);
        let addBtn = $(`<div class="btn-add-to-list"><i class="fas fa-plus-circle"></i></div>`)
            .on("click", (e) => {
                closePopUp();
                watchList.add(this);
            });
        let likeBtn = $(`<div class="btn-thumbs-up"><i class="fas fa-thumbs-up"></i></div>`)
            .on("click",()=>{
                watchList.addLike(this.type, this.dbid, this.title, this.genre)
                watchList.remove(this.id.split("-")[1])
                this.getRecommendations("card");
            });
        let dislikeBtn = $(`<div class="btn-thumbs-dowm"><i class="fas fa-thumbs-down"></i></div>`)
            .on("click", () => {
                watchList.addDislike(this.type)
                watchList.remove(this.id.split("-")[1])
                closePopUp();
            });
        let deleteBtn = $(`<div class="btn-delete"><i class="fas fa-trash-alt"></i></div>`)
            .on("click", () => {
                watchList.remove(this.id.split("-")[1]);
                closePopUp();
            });
        let backBtn = $(`<div class="btn-back"> -> </div>`)
            .on("click", () => {
                $("#search-box").removeClass("d-none").addClass("d-flex");
                if(location == "search"){
                    $("#results").html("")
                    searches[this.type]($("#search-box input").val(), pageNumber);
                }else{
                    closePopUp();
                }
                

            });
        if (location == "search" || location == "recommendation"){
            controlsContainer.append(addBtn, backBtn);
        }else{
            controlsContainer.append(likeBtn, dislikeBtn, deleteBtn, backBtn);
        }
        
        let previewDescription = $(`
            <p><strong>Overview:</strong></p>
            <p class="desc-box">${this.longDescription}</p>
            `)
        
        
        let tagsContainer = $(`<div class=" d-flex flex-wrap preview-tags"></div>`)    
            .on('keydown', "input", (e) => {
                if ($(".add-tag").val().length >= 1) {
                    $(".add-tag").css("width", `${20 + ($(".add-tag").val().length * 9)}px`)
                }
                if (e.keyCode == 13) {
                    console.log($(".add-tag"))
                    watchList.addCollection($(".add-tag").val(),this.dbid);
                    let newInput = $(`<input type="text" placeholder="add new"></input>`)
                        .addClass("add-tag")
                    let newSpan = $(`<span class="collection-tag"></span>`)
                        .append(newInput);
                    $(".preview-tags")
                        .html("")
                        .append(newSpan)
                        .append(this.updateCollections())
                    this.updateCardTags()
                    watchList.updateLocalStorage();
                }
            })
            .append(`<span class="ml-2 collection-tag"><input class="add-tag" type="text" placeholder="add new"></input></span>`, this.updateCollections());
        
        let noteArea = $(`<textarea id="notes" class="notes-area" placeholder="Any Additional notes about this ${this.type}" rows="5">${this.note}</textarea>`)
                        .on("input",(e) =>{
                            this.note = $(e.target).val()
                        })     
        previewMainContentContainer.append(controlsContainer, previewDescription, `<hr><p><strong>collections</strong></p>`, tagsContainer, noteArea)
        previewBody.append(previewMainContentContainer)
        wrapper.append(previewBody);
        return wrapper
        
    }

    card(recommendation) {
        let newCard = $(`<article id=${this.id} class="card"></article>`);
        let cardInner = $(`<div class="card-inner"></div>`);
        let cardImage = $(`<div class="card-bg"></div>`);
        cardImage.css("background-image", `url("${this.lrgImage}")`);
        cardInner.append(cardImage);
        let cardInfo = $(`<div class="card-info p-2 scrollbar-ripe-malinka"></div>`);
        let cardTitle = $(
            `<h5 class="text-left">${this.title}<span class="year"> - ${this.year} </span></h5>`
        );
        let shortDescription = $(`
                                    <p><strong>Description</strong></p>
                                    <p><small>${this.shortDescription}</small></p>
                                    <hr>
                                `)
        let collectionsSubHeading = $(`<p><strong>Collections:</strong></p>`);
        let collectionsArea = $(`<div id="collections-${this.id}" class="d-flex flex-wrap"></div>`);

        let findOutMore = $(
            `<hr><div class="btn btn-more-info text-center">more info</div>`
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
            
        })
        cardInfo.append(cardTitle, shortDescription, collectionsSubHeading, collectionsArea, findOutMore)
        if (!recommendation){
            let buttonWrapper = $('<div class="d-flex justify-content-around"></div>');
            let deleteButton = $(`<div class="btn btn-action text-center"><i class="fas fa-trash-alt"></i></div>`);
            let thumbUpButton = $(`<div class="btn btn-action text-center"><i class="fas fa-thumbs-up"></i></div>`)
                .on("click", () => {
                    watchList.addLike(this.type, this.dbid, this.title, this.genre)
                    watchList.remove(this.id.split("-")[1])
                    this.getRecommendations("card");
                });
            let thumbDownButton = $(`<div class="btn btn-action text-center"><i class="fas fa-thumbs-down"></i></div>`)
                .on("click", () => {
                    watchList.addDislike(this.type)
                    watchList.remove(this.id.split("-")[1]);
                });
            deleteButton.on("click", () => {
                watchList.remove(this.id.split("-")[1]);
            })
            buttonWrapper.append(thumbUpButton, deleteButton, thumbDownButton)
            cardInfo.append(buttonWrapper)
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
        this.icon = `<div class="icon-bg"><i class="fas fa-film m-1"></i></div>`;
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


    itemPreview(location){
        let preview = super.itemPreview(location);
        let genresContainer = $(`<p></p>`)
        genresContainer.append(`<strong>Genres:</strong>`);
        this.genre.forEach(element=>{
            console.log(element.name)
            genresContainer.append(`<span class="ml-2">${element.name}</span>`)
        })
        genresContainer.appendTo(preview.find(".genres"));
        $(`<strong>${this.rating}%</strong>`).appendTo(preview.find(".rating"));
        
        preview.append("<hr>")
        console.log(this.cast)
        let castSection = $("<section></section>").append(`<div class="row mx-0 px-1"><p><strong>Top Billed Cast</strong></div>`)
        let castContainer = $(`<div class="row mx-0 px-1"></div>`)
        console.log(this.cast)
        if(this.cast){
            this.cast.forEach(element => {
                let actorpic = "https://image.tmdb.org/t/p/w185"
                if(element.profile_path){
                    actorpic += element.profile_path 
                }
                else{
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
        else{
            castContainer.append(`<h3>No Cast Identified</h3>`);
        }
        castSection.append(castContainer)
        preview.append(castSection);
        return preview
    }

    getRecommendations(location){
        if (location == "card"){
            makePopUp()
        }
        let randomGenre = this.genre[Math.floor(Math.random() * Math.floor(this.genre.length))];
        let randomActor = this.cast[Math.floor(Math.random() * Math.floor(this.cast.length))];
        console.log(randomGenre)
        $("#add-or-edit-container").html(`<p><strong>Because you liked ${this.title} you might also like </strong></p>
        <div id="actorRec">
        <p>Because you liked ${randomActor.name}</p>
        </div>
        <div id="genreRec">
        <p>Because you liked a ${randomGenre.name} movie</p>
        </div>
        `);
        let noButton = $(`<div class="btn btn-more-info text-center">No Thanks</div>`);
        noButton.on("click", () => {
            closePopUp();
        });
        searches.getRandomRecommendaitons("actor", randomActor, (movie)=>{
            $("#actorRec").append(movie.card(true));
        });
        searches.getRandomRecommendaitons("genre", randomGenre, (movie) => {
            $("#genreRec").append(movie.card(true));
        });
        $("#add-or-edit-container").append(noButton);

        
    }
    
}



class tv extends watchItem{
    constructor(dbid, title, thumb, lrgImage, longDescription, year, genre, note) {
        super(dbid, title, thumb, lrgImage, longDescription, year, genre, note)
        this.cast = []
        this.type = "tv";
        this.icon = `<div class="icon-bg"><i class="fas fa-tv m-1"></i></div>`;
        this.searchItem = this.searchItem.bind(this);
        this.itemPreview = this.itemPreview.bind(this);
        this.card = this.card.bind(this);
        this.updateCollections = this.updateCollections.bind(this);
    }
    itemPreview(location) {
        let preview = super.itemPreview(location);
        preview.append("<p>tv Preview is not yet completed</p>")
        return preview
    }
    getRecommendations(location) {
        if (location == "card") {
            makePopUp()
        }
        $("#add-or-edit-container").html(`<p><strong>Because you liked ${this.title} you might also like </strong></p>
        <ul>
        <li>Actor</li>
        <li>Genre</li>
        </ul>
        `);
        let noButton = $(`<div class="btn btn-more-info text-center">No Thanks</div>`);
        noButton.on("click", () => {
            closePopUp();
        })
        $("#add-or-edit-container").append(noButton)
    }
}

class book extends watchItem {
    constructor(dbid, title, thumb, lrgImage, longDescription, year, genre, note) {
        super(dbid, title, thumb, lrgImage, longDescription, year, genre, note)
        this.type = "book";
        this.icon = `<div class="icon-bg"><i class="fas fa-book m-1"></i></div>`;
        this.searchItem = this.searchItem.bind(this);
        this.itemPreview = this.itemPreview.bind(this);
        this.card = this.card.bind(this);
        this.updateCollections = this.updateCollections.bind(this);
    }

    itemPreview(location) {
        let preview = super.itemPreview(location);
        preview.append("<p>book preivew is not yet completed</p>");
        return preview
    }
    getRecommendations(location) {
        if (location == "card") {
            makePopUp()
        }
        $("#add-or-edit-container").html(`<p><strong>Because you liked ${this.title} you might also like </strong></p>
        <ul>
        <li>Author</li>
        <li>Genre</li>
        </ul>
        `);
        let noButton = $(`<div class="btn btn-more-info text-center">No Thanks</div>`);
        noButton.on("click", () => {
            closePopUp();
        })
        $("#add-or-edit-container").append(noButton)
    }

}

class game extends watchItem {
    constructor(dbid, title, thumb, lrgImage, longDescription, year, genre, note) {
        super(dbid, title, thumb, lrgImage, longDescription, year, genre, note)
        this.type = "game";
        this.icon = `<div class="icon-bg"><i class="fas fa-gamepad m-1"></i></div>`;
        this.searchItem = this.searchItem.bind(this);
        this.itemPreview = this.itemPreview.bind(this);
        this.card = this.card.bind(this);
        this.updateCollections = this.updateCollections.bind(this);
    }
    itemPreview(location) {
        let preview = super.itemPreview(location);
        preview.append("<p>game preview is not yet completed</p>");
        return preview
    }
    getRecommendations(location) {
        if (location == "card") {
            makePopUp()
        }
        $("#add-or-edit-container").html(`<p><strong>Because you liked ${this.title} you might also like </strong></p>
        <ul>
        <li>Platform</li>
        <li>Genre</li>
        </ul>
        `);
        let noButton = $(`<div class="btn btn-more-info text-center">No Thanks</div>`);
        noButton.on("click", () => {
            closePopUp();
        })
        $("#add-or-edit-container").append(noButton)
    }

}