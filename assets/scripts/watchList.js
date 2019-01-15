"use strict"

let watchList = {
    /** Load Data From Local Storage**/
    contents: [],
    collections: {},
    load: ()=>{
        if (window.localStorage.getItem('watchListData')) {
            let prevData = JSON.parse(window.localStorage.getItem('watchListData'));
            if (prevData.list.contents){
                prevData.list.contents.forEach((item)=>{
                    switch (item.type){
                        case "movie":
                            watchList.add(new movie(item.dbid, item.title, item.thumb, item.lrgImage, item.longDescription, item.year, item.genre, item.note, item.cast));
                            break;
                        case "tv":
                            watchList.add(new tv(item.dbid, item.title, item.thumb, item.lrgImage, item.longDescription, item.year, item.genre, item.note, item.cast));
                            break;
                        case "book":
                            watchList.add(new book(item.dbid, item.title, item.thumb, item.lrgImage, item.longDescription, item.year, item.genre, item.note, item.cast));
                            break;
                        case "game":
                            watchList.add(new game(item.dbid, item.title, item.thumb, item.lrgImage, item.longDescription, item.year, item.genre, item.note, item.cast));
                            break;
                    }
                });
            }
            if (prevData.list.collections){
                watchList.collections = prevData.list.collections;
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
            let index = 0;
            $("#watch-list").html(""); 
            list.forEach((element) => {
                element.id = "card-"+index;
                $("#watch-list").append(element.card());
                element.updateCardTags();
                index++;
            })
        }else{
            $("#watch-list").html(`<div class="no-results text-center">
                <h1><i class="fas fa-asterisk"></i></h1>
                <h5>Currently you have no items in your list</h5>
                <p >Click the add button to the right to start adding movies, tv shows and games to your to watch list</p> 
                </div>
            `);
        }
        watchList.renderCollections();
        
    },
    filter: (filterBy, value)=>{
        let filterList = {} 
        if(filterBy == "type"){
            filterList = watchList.contents.filter((element) => {
                return element[filterBy] == value;
            })
        }else{
            filterList = watchList.contents.filter((element) => {
                if (watchList.collections[value].includes(element.dbid)) return true;
            })
        }
        let icons = {
            movie:`<i class="fas fa-film"></i>`,
            tv:`<i class="fas fa-tv"></i>`,
            book:`<i class="fas fa-book"></i>`,
            game:`<i class="fas fa-gamepad"></i>`
        }
        if(filterList.length == 0){
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
                <h5>Collection: ${value.key}, no longer has any contents</h5>
                </div>
                `
            }  
            $("#watch-list").html(htmlString);
        }else{
            watchList.render(filterList)
        }
    },
    addCollection: (name, id)=>{
        if (!Object.keys(watchList.collections).includes(name)){
            if(!id){
                watchList.collections[name] = [];
            }else{
                watchList.collections[name] = [id];
            }
        }else{
            watchList.collections[name].push(id);
        }
        
        watchList.renderCollections();
        watchList.updateLocalStorage();
    },
    removeCollection: (key) =>{
        delete watchList.collections[key]
        watchList.renderCollections();
        watchList.updateLocalStorage();
    },
    renderCollections: ()=>{
        //update collection list in drawer menu
        $("#category-list").html("");
        if (Object.keys(watchList.collections).length != 0){
            Object.entries(watchList.collections).forEach(element =>{
                let collectionItem = $(`<li>${element[0]}</li>`)
                    .on("click",()=>{
                        performFilter("collection", element[0]);
                    })
                $("#category-list").append(collectionItem);
            }) 
        }
        let addNew = $("<li class='add-new'>Edit Collections</li>")
        addNew.on("click", () =>{
            makePopUp("manageFilters")
        });
        $("#category-list").append(addNew)
        watchList.contents.forEach(element=>{
            element.updateCardTags();
        })
    },
    updateLocalStorage: ()=>{
        window.localStorage.setItem('watchListData', JSON.stringify({ list: watchList}));
    }
};

watchList.load();
watchList.render(watchList.contents);
if (watchList.contents.length == 0){
    makePopUp('help')
}
