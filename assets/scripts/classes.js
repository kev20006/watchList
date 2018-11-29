'use strict';

class watchItem {
    constructor(title, thumb, longDescription, year, genre) {
        this.title = title;
        this.thumb = thumb;
        this.longDescription = longDescription;
        if (longDescription.length <= 50) {
            this.shortDescription = longDescription.substring(0, longDescription.length);
        } else {
            this.shortDescription = `${longDescription.substring(0, 50)}...`;
        }
        this.year = year;
        this.genre = genre;
    }
    set setCollection(args) {
        this.collection = [...args]
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
        this.searchItem = this.searchItem.bind(this);
        this.itemPreview = this.itemPreview.bind(this);
    }
}