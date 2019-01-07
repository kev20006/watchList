'use strict';

class watchItem {
    constructor(title, thumb, lrgImage, collection, longDescription, year, genre, note) {
        this.title = title;
        this.thumb = thumb;
        this.lrgImage = lrgImage;
        if(longDescription == undefined){
            this.longDescription = "no description given";
            this.shortDescription = "no description given";
        }
        else{
            this.longDescription = longDescription;
            if (longDescription.length <= 200) {
                this.shortDescription = longDescription.substring(0, longDescription.length);
            } else {
                this.shortDescription = `${longDescription.substring(0, 150)}...`;
            }
        }
        this.year = year;
        this.genre = genre;
        this.active = false;
        this.note = note;
        if (collection.length == 0){
            this.collection = [];
        }else{
            this.collection = collection;
        }
        this.searchItem = this.searchItem.bind(this);
        this.itemPreview = this.itemPreview.bind(this);
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
            $(`#results`).html(this.itemPreview());
        })
        wrapper.append(imgWrapper, textWrapper);
        return wrapper
    }

    itemPreview() {
        let wrapper = $(`<div class="row mx-0"></div>`);
        let previewHeader = $(`<header class="col-12"></header>`);
        let titleContainer = $(`<div class="row mx-0 p-2"></div>`);
        let titleContent = $(`<h3><strong>${this.title}</strong> <small class="ml-3">(${this.year})</small></h3>`);
        let genreContainer = $(`<div class="row mx-0 p-2 mb-0"></div>`)
        //placeholder for genres - this will need to iterate
        let genresContent = $(`<p><strong>Genres:</strong><span class="ml-2">Family,</span><span class="ml-2">Fantasy,</span><span class="ml-2">Adventure</span> </p>`)
        titleContainer.append(titleContent);
        genreContainer.append(genresContent);
        previewHeader.append(titleContainer, genreContainer);
        wrapper.append(previewHeader, $(`<hr>`));
        let previewBody = $(`<main class="row mx-0"></main>`);
        let imageWrapper = $(`<div class="col-12 col-sm-3 d-flex justify-content-center"></div>`);
        //style this image properly using scss please
        imageWrapper.append(` <img class="p-2 pl-2" style="width:180px; height: 270px" src=${this.lrgImage} alt=${this.title} />`)
        previewBody.append(imageWrapper);
        let previewMainContentContainer = $(`<div class="content col-12 col-sm-9"></div>`);
        let controlsContainer = $(`<div class="controls d-flex justify-content-around flex-wrap"></div>`)
            .append(`<div class="rating">75%</div>`);
        let addBtn = $(`<div class="btn-add-to-list">(A)</div>`)
            .on("click", (e) => {
                this.note = $(e.target).siblings("textarea").val()
                closePopUp();
                watchList.add(this);
            });
        let likeBtn = $(`<div class="btn-thumbs-up">(Y)</div>`);
        let dislikeBtn = $(`<div class="btn-thumbs-dowm">(N)</div>`);
        let deleteBtn = $(`<div class="btn-delete">(D)</div>`);
        let backBtn = $(`<div class="btn-back"> -> </div>`)
            .on("click", () => {
                let searchTerm = $("#search-box input").val()
                $("#results").html("")
                searches[this.type](searchTerm, $("#results").attr("data-page"));
            });

        controlsContainer.append(addBtn, likeBtn, dislikeBtn, deleteBtn, backBtn)
        let previewDescription = $(`
            <p><strong>Overview:</strong></p>
        <p>${this.longDescription}</p>
        <p><strong>Tags:</strong></p>
        `)
        let tagsContainer = $(`<div class=" d-flex flex-wrap preview-tags"></div>`)
            .focus("input", () => {
                $(".preview-tags input").attr("placeholder", "")
                if ($(".preview-tags input").val().length <= 1) {
                    $(".preview-tags input").css("width", "20px")
                }
            })
            .focusout("input", () => {
                $(".preview-tags input").attr("placeholder", "add new");
                $(".preview-tags input").val("");
                $(".preview-tags input").css("width", "80px");
            })

            .on('keydown', "input", (e) => {
                if ($(".add-tag").val().length >= 1) {
                    $(".add-tag").css("width", `${20 + ($(".add-tag").val().length * 9)}px`)
                }
                if (e.keyCode == 13) {
                    movietags.push($(".add-tag").val());
                    console.log(movietags)
                    let newInput = $(`<input type="text" placeholder="add new"></input>`)
                        .addClass("add-tag")
                    let newSpan = $(`<span class="tag"></span>`)
                        .append(newInput);
                    $(".preview-tags")
                        .html("")
                        .append(newSpan)
                        .append(renderTags())
                }
            })
            .append(`<span class="tag"><input class="add-tag" type="text" placeholder="add new"></input></span>`);
        
        previewMainContentContainer.append(controlsContainer, previewDescription, tagsContainer)
        previewBody.append(previewMainContentContainer)
        
        wrapper.append(previewBody);
        return wrapper
        
    }

    updateCollections(value) {
        let htmlString = ""
        if (value) {
            this.collection.push(value)
        }
        if (!this.collection.length == 0) {
            this.collection.forEach(element => {
                htmlString += `<span class="collection-item"><small>${element}</small></span>`
            })
        }
        htmlString += `<span class="collection-item"><small>add new collection</small></span>`
        $(`#${this.id} .collection-tags`).html(htmlString);
    }

}

//helper function that doesn't work
function renderTags() {
    htmlString = ""
    movietags.forEach((element) => {
        htmlString += `<span class="tag">${element}</span>`;
    })
    return htmlString;
}

class movie extends watchItem {
    constructor(title, thumb, lrgImage, collection, longDescription, year, genre, note, cast) {
        super(title, thumb, lrgImage, collection, longDescription, year, genre, note)
        this.cast = cast
        this.type = "movie";
        this.icon = `<div class="icon-bg"><i class="fas fa-film m-1"></i></div>`;
        this.searchItem = this.searchItem.bind(this);
        this.itemPreview = this.itemPreview.bind(this);
        this.card = this.card.bind(this);
        this.updateCollections = this.updateCollections.bind(this);
    }
    card(){
        let newCard = $(`<article id=${this.id} class="card"></article>`);
        let cardInner = $(`<div class="card-inner"></div>`);
        let cardImage = $(`<div class="card-bg"></div>`);
        cardImage.css("background-image", `url("${this.lrgImage}")`);
        cardInner.append(cardImage);
        let cardInfo = $(`<div class="card-info p-2 scrollbar-ripe-malinka"></div>`);
        let cardTitle = $(
            `<h5 class="text-left">${this.title}<span class="year"> - ${this.year} </span></h5>`
        );
        let directedBy = $(
            ` <p class="text-right"><strong>Directed By: </strong>Chris Columbus</p><hr>`
        );
        let shortDescription = $(`
                                    <p><strong>Description</strong></p>
                                    <p><small>${this.shortDescription}</small></p>
                                    <hr>
                                `)
        let collectionsSubHeading = $(`<p><strong>Collections:</strong></p>`);
        let collectionsArea = $(`<div class="d-flex flex-wrap"></div>`);
        if (this.collection.length >= 1) {
            console.log(this)
            console.log(this.collection)
            this.collection.forEach(element => {
                collectionsArea.append(
                    `<span class="collection-tag mr-1 mb-1"> ${element} </span>`
                );
            });
        } else {
            collectionsArea.append(
                `<span class="collection-tag mr-1 mb-1">no collections</span>`
            );
        }
        let findOutMore = $(
            `<hr><div class="btn btn-more-info text-center"> find out more</div>`
        );
        let buttonWrapper = $('<div class="d-flex justify-content-around"></div>');
        let deleteButton = $(`<div class="btn btn-action text-center"><i class="fas fa-trash-alt"></i></div>`);
        let thumbUpButton = $(`<div class="btn btn-action text-center"><i class="fas fa-thumbs-up"></i></div>`);
        let thumbDownButton = $(`<div class="btn btn-action text-center"><i class="fas fa-thumbs-up"></i></div>`);
        deleteButton.on("click", () => {
            watchList.remove(this.id.split("-")[1]);
        })
        buttonWrapper.append(thumbDownButton, deleteButton, thumbUpButton)
        cardInfo.append(cardTitle, directedBy, shortDescription, collectionsSubHeading, collectionsArea, findOutMore, buttonWrapper)
        cardInner.append(cardInfo)
        newCard.append(cardInner);
        return newCard;
    }
    
}


//carbon copy of Movie at the moment, will modify shortly
class tv extends watchItem{
    constructor(title, thumb, lrgImage, collection, longDescription, year, genre, note, cast) {
        super(title, thumb, lrgImage, collection, longDescription, year, genre, note)
        this.cast = cast
        this.type = "tv";
        this.icon = `<div class="icon-bg"><i class="fas fa-tv m-1"></i></div>`;
        this.searchItem = this.searchItem.bind(this);
        this.itemPreview = this.itemPreview.bind(this);
        this.card = this.card.bind(this);
        this.updateCollections = this.updateCollections.bind(this);
    }
    card() {
        let newCard = $(`<article id=${this.id} class="card tv"></article>`);
        let newCardHeader = $(`<header class="card-header d-flex"></header>`);
        let headerContents = [
            $(`<div class="icon mt-1 text-center">${this.icon}</div>`),
            $(`<h5 class="ml-3">${this.title}</h5>`)
        ]
        let deleteButton = $(`<div class="delete-button text-center fade-item "><i class="fas fa-trash-alt"></i></div>`)
        deleteButton.on("click", () => {
            watchList.remove(this.id.split("-")[1]);
        })
        headerContents.forEach(item => {
            newCardHeader.append(item);
        })
        newCardHeader.append(deleteButton);
        newCard.append(newCardHeader);
        let newCardMain = $(`<main></main>`);
        let collectionTagString = ""
        this.collection.forEach((element) => {
            collectionTagString += `<span class="collection-item"><small>${element}</small></span>`
        })
        let imageWrapper = $(`<div class="image-wrapper d-flex justify-content-center">`);
        imageWrapper.css("background-image", `url(${this.thumb});`);
        imageWrapper.html(`<img class="movie-thumb" src="${this.thumb}" alt="${this.title}" />`);
        let mainContents = $(`
                <div class="row card-content mx-0 py-3">
                    <div class="col">
                    <!-- collapseable Content -->
                    <div class="selected-content">
                        <p><strong>Cast:</strong></p>
                        <p><small>cast not yet implemented</small></p>
                        <p><strong>Description:</strong></p>
                        <p><small>${this.shortDescription}</small></p>
                        <p><small><strong>more info</strong></small></p>
                    </div>
                    <!-- end of Collapseable Content -->
                    <!-- User Generated Card Info -->
                    <p><strong>Collections:</strong></p>
                    ${collectionTagString}
                    <p><strong>Note:</strong></p>
                    <input type="text" class="media-note" value="${this.note}"></input>
                    <!-- end of User Generated Card Info -->
                </div>
            </div>`);
        imageWrapper.css("background-image", `url(${this.thumb})`)
        newCardMain.append(imageWrapper, mainContents)
        newCard.append(newCardMain)

        let newCardFooter = $(`<footer class="card-footer p-3 row mx-0"></footer>`);
        let footerContents = $(`
            <div class="selected-content col-6 text-center">
                <span class="context-button thumb-up text-center"><i class="fas fa-thumbs-up"></i></span>
            </div>
            <div class="selected-content col-6 text-center">
                <span class="context-button thumb-down text-center"><i class="fas fa-thumbs-down"></i></span>
            </div>
        `);
        newCardFooter.append(footerContents);
        newCard.append(newCardFooter);
        return newCard;
    }
}

class book extends watchItem {
    constructor(title, thumb, lrgImage, collection, longDescription, year, genre, note, cast) {
        super(title, thumb, lrgImage, collection, longDescription, year, genre, note)
        this.cast = cast
        this.type = "book";
        this.icon = `<div class="icon-bg"><i class="fas fa-book m-1"></i></div>`;
        this.searchItem = this.searchItem.bind(this);
        this.itemPreview = this.itemPreview.bind(this);
        this.card = this.card.bind(this);
        this.updateCollections = this.updateCollections.bind(this);
    }
    card() {
        let newCard = $(`<article id=${this.id} class="card book"></article>`);
        let newCardHeader = $(`<header class="card-header d-flex"></header>`);
        let headerContents = [
            $(`<div class="icon mt-1 text-center">${this.icon}</div>`),
            $(`<h5 class="ml-3">${this.title}</h5>`)
        ]
        let deleteButton = $(`<div class="delete-button text-center fade-item "><i class="fas fa-trash-alt"></i></div>`)
        deleteButton.on("click", () => {
            watchList.remove(this.id.split("-")[1]);
        })
        headerContents.forEach(item => {
            newCardHeader.append(item);
        })
        newCardHeader.append(deleteButton);
        newCard.append(newCardHeader);
        let newCardMain = $(`<main></main>`);
        let collectionTagString = ""
        this.collection.forEach((element) => {
            collectionTagString += `<span class="collection-item"><small>${element}</small></span>`
        })
        let imageWrapper = $(`<div class="image-wrapper d-flex justify-content-center">`);
        imageWrapper.css("background-image", `url(${this.thumb});`);
        imageWrapper.html(`<img class="movie-thumb" src="${this.thumb}" alt="${this.title}" />`);
        let mainContents = $(`
                <div class="row card-content mx-0 py-3">
                    <div class="col">
                    <!-- collapseable Content -->
                    <div class="selected-content">
                        <p><strong>Author:</strong></p>
                        <p><small>cast not yet implemented</small></p>
                        <p><strong>Description:</strong></p>
                        <p><small>${this.shortDescription}</small></p>
                        <p><small><strong>more info</strong></small></p>
                    </div>
                    <!-- end of Collapseable Content -->
                    <!-- User Generated Card Info -->
                    <p><strong>Collections:</strong></p>
                    ${collectionTagString}
                    <p><strong>Note:</strong></p>
                    <input type="text" class="media-note" value="${this.note}"></input>
                    <!-- end of User Generated Card Info -->
                </div>
            </div>`);
        imageWrapper.css("background-image", `url(${this.thumb})`)
        newCardMain.append(imageWrapper, mainContents)
        newCard.append(newCardMain)
        let newCardFooter = $(`<footer class="card-footer p-3 row mx-0"></footer>`);
        let footerContents = $(`
            <div class="selected-content col-6 text-center">
                <span class="context-button thumb-up text-center"><i class="fas fa-thumbs-up"></i></span>
            </div>
            <div class="selected-content col-6 text-center">
                <span class="context-button thumb-down text-center"><i class="fas fa-thumbs-down"></i></span>
            </div>
        `);
        newCardFooter.append(footerContents);
        newCard.append(newCardFooter);
        return newCard;
    }

}

class game extends watchItem {
    constructor(title, thumb, lrgImage, collection, longDescription, year, genre, note, cast) {
        super(title, thumb, lrgImage, collection, longDescription, year, genre, note)
        this.cast = cast
        this.type = "game";
        this.icon = `<div class="icon-bg"><i class="fas fa-gamepad m-1"></i></div>`;
        this.searchItem = this.searchItem.bind(this);
        this.itemPreview = this.itemPreview.bind(this);
        this.card = this.card.bind(this);
        this.updateCollections = this.updateCollections.bind(this);
    }
    card() {
        let newCard = $(`<article id=${this.id} class="card game"></article>`);
        let newCardHeader = $(`<header class="card-header d-flex"></header>`);
        let headerContents = [
            $(`<div class="icon mt-1 text-center">${this.icon}</div>`),
            $(`<h5 class="ml-3">${this.title}</h5>`)
        ]
        let deleteButton = $(`<div class="delete-button text-center fade-item "><i class="fas fa-trash-alt"></i></div>`)
        deleteButton.on("click", () => {
            watchList.remove(this.id.split("-")[1]);
        })
        headerContents.forEach(item => {
            newCardHeader.append(item);
        })
        newCardHeader.append(deleteButton);
        newCard.append(newCardHeader);
        let newCardMain = $(`<main></main>`);
        let collectionTagString = ""
        this.collection.forEach((element) => {
            collectionTagString += `<span class="collection-item"><small>${element}</small></span>`
        })
        let imageWrapper = $(`<div class="image-wrapper d-flex justify-content-center">`);
        imageWrapper.css("background-image", `url(${this.thumb});`);
        imageWrapper.html(`<img class="movie-thumb" src="${this.thumb}" alt="${this.title}" />`);
        let mainContents = $(`
                <div class="row card-content mx-0 py-3">
                    <div class="col">
                    <!-- collapseable Content -->
                    <div class="selected-content">
                        <p><strong>Format:</strong></p>
                        <p><small>cast not yet implemented</small></p>
                        <p><strong>Description:</strong></p>
                        <p><small>${this.shortDescription}</small></p>
                        <p><small><strong>more info</strong></small></p>
                    </div>
                    <!-- end of Collapseable Content -->
                    <!-- User Generated Card Info -->
                    <p><strong>Collections:</strong></p>
                    ${collectionTagString}
                    <p><strong>Note:</strong></p>
                    <input type="text" class="media-note" value="${this.note}"></input>
                    <!-- end of User Generated Card Info -->
                </div>
            </div>`);
        imageWrapper.css("background-image", `url(${this.thumb})`)
        newCardMain.append(imageWrapper, mainContents)
        newCard.append(newCardMain)
        let newCardFooter = $(`<footer class="card-footer p-3 row mx-0"></footer>`);
        let footerContents = $(`
            <div class="selected-content col-6 text-center">
                <span class="context-button thumb-up text-center"><i class="fas fa-thumbs-up"></i></span>
            </div>
            <div class="selected-content col-6 text-center">
                <span class="context-button thumb-down text-center"><i class="fas fa-thumbs-down"></i></span>
            </div>
        `);
        newCardFooter.append(footerContents);
        newCard.append(newCardFooter);
        return newCard;
    }

}