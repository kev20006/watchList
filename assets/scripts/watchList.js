"use strict"
//This file creates loads and manages all the watchlist data
//including analytical data, the current watch lists, tags assigned to each movie.

//html should only be appear in "render" - methods


let watchList = {
/** Initialise for first use **/
    analytics:{
        movie:{
            likes: 0,
            dislikes: 0,
            genres:{},
            lastFive:[]
        },
        tv: {
            likes: 0,
            dislikes: 0,
            genres: {},
            lastFive: []
        },
        game: {
            likes: 0,
            dislikes: 0,
            genres: {},
            lastFive: []
        },
        book: {
            likes: 0,
            dislikes: 0,
            genres: {},
            lastFive: []
        }
    },
    contents: [],
    collections: {},
/** Load Data From Local Storage**/
    load: ()=>{
        if (window.localStorage.getItem('watchListData')) {
            let prevData = JSON.parse(window.localStorage.getItem('watchListData'));
            if (prevData.list.contents){
                prevData.list.contents.forEach((item)=>{
                    switch (item.type){
                        case "movie":
                            watchList.add(new movie({
                                dbid: item.dbid, 
                                title: item.title, 
                                thumb: item.thumb, 
                                lrgImage: item.lrgImage,
                                longDescription: item.longDescription,
                                year: item.year, 
                                genre: item.genre, 
                                note: item.note, 
                                director: item.director, 
                                rating: item.rating,
                                cast: item.cast, 
                                })
                            );
                            break;
                        case "tv":
                            watchList.add(new tv({
                                dbid: item.dbid,
                                title: item.title,
                                thumb: item.thumb,
                                lrgImage: item.lrgImage,
                                longDescription: item.longDescription,
                                year: item.year,
                                genre: item.genre,
                                note: item.note,
                                rating: item.rating,
                                cast: item.cast,
                                genre: item.genre,
                                lastEpisode: item.lastEpisode,
                                nextEpisode: item.nextEpisode,
                                seasons: item.seasons,
                                epTracker: item.epTracker
                                })
                            )
                            break;
                    }
                });
            }
            if (prevData.list.collections){
                watchList.collections = prevData.list.collections;
            } 
            if (prevData.list.analytics) {
                if (prevData.list.analytics.movie){
                    watchList.analytics.movie = prevData.list.analytics.movie;
                } 
                if (prevData.list.analytics.tv) {
                    watchList.analytics.tv = prevData.list.analytics.tv;
                }
                if (prevData.list.analytics.book) {
                    watchList.analytics.book = prevData.list.analytics.book;
                }
                if (prevData.list.analytics.game) {
                    watchList.analytics.tv = prevData.list.analytics.game;
                }
                    
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
    render: (list, isRecommendation = false)=>{
        if (list.length >= 1) {
            let index = 0;
            $("#watch-list").html(""); 
            list.forEach((element) => {
                element.id = "card-"+index;
                $("#watch-list").append(element.card(isRecommendation));
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
                let stringFix = ""
                switch (value){
                    case "movie": 
                    case "game":
                    case "book":
                        stringFix = `${value}s`;
                        break;
                    case "tv":
                        stringFix = "Tv Shows";
                        break;
                }
                $("#view-title").html(`<h6>${stringFix[0].toUpperCase() + stringFix.slice(1)}</h6>`);
                htmlString = `<div class="no-results text-center">
                <h1>${icons[value]}</h1>
                <h5>Currently you have no ${stringFix} in your list</h5>
                <p>Click the add button to the right to start adding some ${value}s</p>
                </div>
            `
            }else{
                $("#view-title").html(`<h6>Items with the ${value} tag </h6>`)
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
        let addNew = $("<li class='add-new'>Add or Edit Tags</li>")
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
    },
    addLike:(type, id, title, genres)=>{
        watchList.analytics[type].likes ++
        genres.forEach(element=>{
            if (watchList.analytics[type].genres[element.name]) {
                watchList.analytics[type].genres[element.name] += 1
            } else {
                watchList.analytics[type].genres[element.name] = 1
            }
        })
        watchList.analytics[type].lastFive.push({
            id: id,
            title: title,
        })
        watchList.updateLocalStorage();
    },

    addDislike:(type)=>{
        watchList.analytics[type].dislikes++
        watchList.updateLocalStorage();
    },

    resetAll:() =>{
        watchList.analytics = {
            movie: {
                likes: 0,
                dislikes: 0,
                genres: { },
                lastFive: []
            },
            tv: {
                likes: 0,
                dislikes: 0,
                genres: {},
                lastFive: []
            },
            game:{
                likes: 0,
                dislikes: 0,
                genres: {},
                lastFive: []
            },
            book:{
                likes: 0,
                dislikes: 0,
                genres: {},
                lastFive: []
            }
        };
        watchList.contents = [];
        watchList.collections= {}
        watchList.render(watchList.contents);
        watchList.renderCollections(); 
        watchList.updateLocalStorage();
    }

};

watchList.load();
watchList.render(watchList.contents);
if (watchList.contents.length == 0){
    makePopUp('help')
}
