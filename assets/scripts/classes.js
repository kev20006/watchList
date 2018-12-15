'use strict';

class watchItem {
    constructor(title, thumb, collection, longDescription, year, genre, note) {
        this.title = title;
        this.thumb = thumb;
        if(longDescription == undefined){
            this.longDescription = "no description given";
            this.shortDescription = "no description given";
        }
        else{
            if (longDescription.length <= 200) {
                this.shortDescription = longDescription.substring(0, longDescription.length);
            } else {
                this.shortDescription = `${longDescription.substring(0, 200)}...`;
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
        imgWrapper.append(`<img src=${this.thumb} class="result-thumb" alt=${this.title} height="50px" />`);
        textWrapper.append(`<p class="result-title">${this.title} - ${this.year}</p>`);
        wrapper.on("click", () => {
            $(`#results`).html(this.itemPreview());
        })
        wrapper.append(imgWrapper, textWrapper);
        return wrapper
    }

    itemPreview() {
        let wrapper = $(`<div class="my-2 mx-1"></div>`);
        let textAndImageWrapper = $(`<div class="row d-flex mx-3"></div>`)
        let imgWrapper = $(`<div class="col"></div>`);
        let textWrapper = $(`<div></div>`);
        let buttonWrapper = $(`<div class="row mx-3"></div>`);
        let collectionWrapper = $(`<div class="row mx-0 d-flex"></div>`);
        let collectionList = $('<div class="collection-list"></div>')
        let addCollection = $(`<span><small><input type="text" placeholder="add new collection"></input></small></span>`)
            .on("keydown", (e)=>{
                if (e.which === 13 && $(e.target).val().length > 0){
                    let newCollectionName = $(e.target).val()
                    if (!this.collection.includes(newCollectionName)){
                        let htmlString = ``
                        this.collection.push(newCollectionName)
                        this.collection.forEach((element)=>{
                            htmlString +=`<span class="collection-item"><small>${element}</small><span class="delete button"> x </span></span>`;
                        })
                        $(e.target).closest("span").siblings().html(htmlString);
                    }
                    if (!watchList.collections.includes(newCollectionName)){
                        watchList.addCollection(newCollectionName);
                    }
                    $(e.target).val("");
                }
                
            });
        collectionWrapper.append(addCollection, collectionList);
        let note = "<textarea></textarea>"
        let add = $(`<input type="button" value="add to list"/>`);
        let back = $(`<input type="button" value="back"/>`);
        add.on("click", (e) => {
            this.note = $(e.target).siblings("textarea").val()
            closePopUp();
            watchList.add(this);
        });
        back.on("click", () => {
            let searchTerm = $("#search-box input").val()
            $("#results").html("")
            searches[this.type](searchTerm);
        });
       
        imgWrapper.append(`<img src=${this.thumb} class="result-thumb" alt=${this.title} />`);
        textWrapper.append(`<p class="result-title">${this.title}</p>`, `<p>${this.shortDescription}</p>`);
        textAndImageWrapper.append(imgWrapper, textWrapper)
        buttonWrapper.append(note, add, back);
        wrapper.append(textAndImageWrapper, collectionWrapper, buttonWrapper);
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

class movie extends watchItem {
    constructor(title, thumb, collection, longDescription, year, genre, note, cast) {
        super(title, thumb, collection, longDescription, year, genre, note)
        this.cast = cast
        this.type = "movie";
        this.icon = `<div class="icon-bg"><i class="fas fa-film m-1"></i></div>`;
        this.searchItem = this.searchItem.bind(this);
        this.itemPreview = this.itemPreview.bind(this);
        this.carard = this.card.bind(this);
        this.updateCollections = this.updateCollections.bind(this);
    }
    card(){
        let newCard = $(`<article id=${this.id} class="card movie"></article>`);
        let newCardHeader = $(`<header class="card-header d-flex"></header>`);
        let headerContents = [
            $(`<div class="icon mt-1 text-center">${this.icon}</div>`),
            $(`<h3 class="ml-3">${this.title}</h3>`) 
        ]
        let deleteButton = $(`<div class="delete-button text-center fade-item "><i class="fas fa-trash-alt"></i></div>`)
        deleteButton.on("click", ()=>{
            watchList.remove(this.id.split("-")[1]);
        })
        headerContents.forEach(item =>{
            newCardHeader.append(item);
        })
        newCardHeader.append(deleteButton);
        newCard.append(newCardHeader);
        let newCardMain = $(`<main></main>`);
        let collectionTagString = ""
        this.collection.forEach((element)=>{
            collectionTagString += `<span class="collection-item"><small>${element}</small></span>`
        })
        let imageWrapper = $(`<div class="image-wrapper d-flex justify-content-center">`);
        imageWrapper.css("background-image", `url(${this.thumb});`);
        imageWrapper.html(`<img class="movie-thumb" src="${this.thumb}" alt="${this.title}" />`);
        let mainContents = $(   `
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


//carbon copy of Movie at the moment, will modify shortly
class tv extends watchItem{
    constructor(title, thumb, collection, longDescription, year, genre, note, cast) {
        super(title, thumb, collection, longDescription, year, genre, note)
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
            $(`<h3 class="ml-3">${this.title}</h3>`)
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
    constructor(title, thumb, collection, longDescription, year, genre, note, cast) {
        super(title, thumb, collection, longDescription, year, genre, note)
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
            $(`<h3 class="ml-3">${this.title}</h3>`)
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
    constructor(title, thumb, collection, longDescription, year, genre, note, cast) {
        super(title, thumb, collection, longDescription, year, genre, note)
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
            $(`<h3 class="ml-3">${this.title}</h3>`)
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