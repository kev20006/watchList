"use strict"
//This file creates loads and manages all the watchlist data
//including analytical data, the current watch lists, tags assigned to each movie.

const watchList = {
/** Initialise for first use **/
    details:{
        tvGenres: [],
        movieGenres: []
    },
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
        }
    },
    contents: [],
    collections: {},
    returningUser: false,
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
            }
            if (prevData.list.details.movieGenres.length > 1 && prevData.list.details.tvGenres.length > 1){
                watchList.details.movieGenres = prevData.list.details.movieGenres;
                watchList.details.tvGenres = prevData.list.details.tvGenres;
            }
            else{
                let movieGenresPromise = tmdb.getGenres("movie");
                let tvGenresPromise = tmdb.getGenres("tv");
                movieGenresPromise.then((movieGenres) => { 
                    watchList.details.movieGenres= movieGenres.genres
                });
                tvGenresPromise.then((tvGenres) => { 
                    watchList.details.tvGenres = tvGenres.genres
                });
                Promise.all([movieGenresPromise, tvGenresPromise]).then(()=>{
                    watchListDom.renderDataLists();
                })
            }

            if (prevData.list.returningUser){
                watchList.returningUser = prevData.list.collections;
            }
            watchList.updateLocalStorage();
        }
    }, 
    add: (obj)=>{
        let matchFound= false
        watchList.contents.forEach(item =>{
            console.log(`${item.dbid} is the same as ${obj.dbid}`)
            if (item.dbid == obj.dbid){
                matchFound = true;
                return false;
            }
        });
        if (matchFound){
            return false;
        }
        else{
            watchList.contents.push(obj);
            watchList.updateLocalStorage();
            return true;
        }
        
    },
    remove: (id)=>{
        watchList.contents.splice(id, 1);
        watchList.updateLocalStorage();
    },
    filter: (filterBy, value)=>{
        let filterList = {} 
        if(filterBy == "type"){
            filterList = watchList.contents.filter((element) => {
                return element[filterBy] == value;
            })
        }
        else{
            filterList = watchList.contents.filter((element) => {
                if (watchList.collections[value].includes(element.dbid)) return true;
            })
        }
        return filterList;
    },
    addCollection: (name, id)=>{
        if (!Object.keys(watchList.collections).includes(name)){
            if(!id){
                watchList.collections[name] = [];
            }
            else{
                watchList.collections[name] = [id];
            }
        }
        else{
            watchList.collections[name].push(id);
        }
    },
    removeCollection: (key) =>{
        delete watchList.collections[key]
    },
    
    addLike:(type, id, title, genres)=>{
        watchList.analytics[type].likes ++
        genres.forEach(element=>{
            if (watchList.analytics[type].genres[element.name]) {
                watchList.analytics[type].genres[element.name] += 1
            } else {
                watchList.analytics[type].genres[element.name] = 1
            }
        });
                   
        if (watchList.analytics[type].lastFive.length >= 5) {
            watchList.analytics[type].lastFive = watchList.analytics[type].lastFive.slice(-4); 
        }
        watchList.analytics[type].lastFive.push({
            id: id,
            title: title
        });
        watchList.updateLocalStorage();
    },
    addDislike:(type)=>{
        watchList.analytics[type].dislikes++
        watchList.updateLocalStorage();
    },
    updateLocalStorage: () => {
        window.localStorage.setItem('watchListData', JSON.stringify({ list: watchList }));
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
        watchList.details.movieGenres= [];
        watchList.details.tvGenres = [];
        watchList.contents = [];
        watchList.collections= {};
        watchList.returningUser = false;
        watchList.updateLocalStorage();
    }

};


