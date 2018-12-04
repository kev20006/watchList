'use strict';

class watchItem {
    constructor(title, thumb, longDescription, year, genre) {
        this.title = title;
        this.thumb = thumb;
        this.longDescription = longDescription;
        if (longDescription.length <= 200) {
            this.shortDescription = longDescription.substring(0, longDescription.length);
        } else {
            this.shortDescription = `${longDescription.substring(0, 200)}...`;
        }
        this.year = year;
        this.genre = genre;
        this.active = false;
        this.note = "";
        this.collection = [];
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
        let add = $(`<input type="button" value="add to list"/>`);
        let back = $(`<input type="button" value="back"/>`);
        add.on("click", () => {
            minimizeMenu();
            watchList.add(this);
        });
        back.on("click", () => {
            $("#results").html("")
            searches[this.type]($("#search").val());
        });
        imgWrapper.append(`<img src=${this.thumb} class="result-thumb" alt=${this.title} />`);
        textWrapper.append(`<p class="result-title">${this.title}</p>`, `<p>${this.shortDescription}</p>`);
        textAndImageWrapper.append(imgWrapper, textWrapper)
        buttonWrapper.append(add, back);
        wrapper.append(textAndImageWrapper, buttonWrapper);
        return wrapper
    }

}

class movie extends watchItem {
    constructor(title, thumb, longDescription, year, genre, cast) {
        super(title, thumb, longDescription, year, genre)
        this.cast = cast
        this.type = "movie";
        this.icon = `<div class="icon-bg"><i class="fas fa-film m-1"></i></div>`;
        this.searchItem = this.searchItem.bind(this);
        this.itemPreview = this.itemPreview.bind(this);
        this.movieCard = this.movieCard.bind(this);
        this.updateCollections = this.updateCollections.bind(this);
    }
    movieCard(){
        let newCard = $(`<article id=${this.id} class="card"></article>`);
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
        
        let imageWrapper = $(`<div class="image-wrapper d-flex justify-content-center">`);
        imageWrapper.css("background-image", `url(${this.thumb});`);
        imageWrapper.html(`<img class="movie-thumb" src="${this.thumb}" alt="${this.title}" />`)
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
                    <p class="collection-tags">
                    </p>
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
    updateCollections(value){
        let htmlString = ""
        if (value){
            this.collection.push(value)
        }
        if (!this.collection.length == 0) {
           this.collection.forEach(element =>{
               htmlString += `<span class="collection-item"><small>${element}</small></span>`
           })
        }
        htmlString += `<span class="collection-item"><small>add new collection</small></span>`
        $(`#${this.id} .collection-tags`).html(htmlString);
    }
    
}