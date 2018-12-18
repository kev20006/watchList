"use strict"

let watchList = {
    /** Load Data From Local Storage**/
    contents: [],
    collections: [],
    load: ()=>{
        if (window.localStorage.getItem('watchListData')) {
            let prevData = JSON.parse(window.localStorage.getItem('watchListData'));
            console.log("local storage")
            console.log(prevData)
            if (prevData.contents){
                console.log("findingContents")
                prevData.contents.forEach((item)=>{
                    console.log(item)
                    switch (item.type){
                        case "movie":
                            watchList.add(new movie(item.title, item.thumb, item.collection, item.longDescription, item.year, item.genre, item.note, item.cast));
                            break;
                        case "tv":
                            watchList.add(new tv(item.title, item.thumb, item.collection, item.longDescription, item.year, item.genre, item.note, item.cast));
                            break;
                        case "book":
                            watchList.add(new book(item.title, item.thumb, item.collection, item.longDescription, item.year, item.genre, item.note, item.cast));
                            break;
                        case "game":
                            watchList.add(new game(item.title, item.thumb, item.collection, item.longDescription, item.year, item.genre, item.note, item.cast));
                            break;
                    }
                });
            }
            if (prevData.collections){
                watchList.collections = prevData.collections;
            }
            watchList.updateLocalStorage();
            watchList.render(watchList.contents);
            watchList.renderCollections();
        }
    }, 
    add: (obj)=>{
        watchList.contents.push(obj);
        watchList.render(watchList.contents);
        watchList.updateLocalStorage();
    },
    remove: (id)=>{
        watchList.contents.splice(id, 1);
        watchList.render(watchList.contents);
        watchList.updateLocalStorage();
    },
    render: (list)=>{
        if (list.length >= 1) {
            $("#watch-list").removeClass("d-flex")
                            .addClass("card-columns");
            let index = 0;
            $("#watch-list").html(""); 
            list.forEach((element) => {
                element.id = "card-"+index;
                console.log("element")
                $("#watch-list").append(element.card());
                element.updateCollections();
                index++;
            })
        }else{
            $("#watch-list").addClass("d-flex")
                .removeClass("card-columns");
            $("#watch-list").html(`<div class="no-results text-center">
                <h1><i class="fas fa-asterisk"></i></h1>
                <h5>Currently you have no items in your list</h5>
                <p >Click the add button to the right to start adding movies, tv shows and games to your to watch list</p> 
                </div>
            `);
        }
        
    },
    filter: (filterBy, value)=>{
        
        
        let filterList = {} 
        if(filterBy == "type"){
            filterList = watchList.contents.filter((element) => {
                return element[filterBy] == value;
            })
        }else{
            filterList = watchList.contents.filter((element) => {
                return element.collection.includes(value);
            })
        }
        let icons = {
            movie:`<i class="fas fa-film"></i>`,
            tv:`<i class="fas fa-tv"></i>`,
            book:`<i class="fas fa-book"></i>`,
            game:`<i class="fas fa-gamepad"></i>`
        }
        if(filterList.length == 0){
            $("#watch-list").addClass("d-flex")
                            .removeClass("card-columns");
            let htmlString = ""
            if (filterBy == "type"){
               htmlString = `<div class="no-results text-center">
                <h1>${icons[value]}</h1>
                <h5>Currently you have no ${value} in your list</h5>
                <p>Click the add button to the right to start adding some ${value}s</p>
                </div>
            `
            }else{
                htmlString = `
                <div class="no-results text-center">
                <h5>Collection: ${value}, no longer has any contents</h5>
                </div>
                `
            }  
            $("#watch-list").html(htmlString);
        }else{
            watchList.render(filterList)
        }
    },
    addCollection: (name)=>{
        watchList.collections.push(name);
        watchList.renderCollections();
        watchList.updateLocalStorage();
    },
    removeCollection: (id) =>{
        watchList.collections.splice(id, 1);
        watchList.renderCollections();
        watchList.updateLocalStorage();
    },
    renderCollections: ()=>{
        $("#category-list").html("");
        if(watchList.collections.length != 0){
            watchList.collections.forEach(element =>{
                let collectionItem = $(`<li>${element}</li>`)
                    .on("click",()=>{
                        performFilter("collection", element);
                    })
                $("#category-list").append(collectionItem);
            }) 
        }
        let addNew = $("<li class='add-new'>Edit Collections</li>")
        addNew.on("click", () =>{
            makePopUp("manageFilters")
        });
        $("#category-list").append(addNew)
    },
    updateLocalStorage: ()=>{
        window.localStorage.setItem('watchListData', JSON.stringify({ collections: watchList.collections, contents: watchList.contents }));
    }
};

watchList.load();
watchList.render(watchList.contents);
watchList.renderCollections();
if (watchList.contents.length == 0){
    makePopUp('help')
}
