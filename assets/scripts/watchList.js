"use strict"

let watchList = {
    /** Load Data From Local Storage**/
    contents: [],
    collections: [],
    load: ()=>{
        if (window.localStorage.getItem('watchListData')) {
            let prevData = JSON.parse(window.localStorage.getItem('watchListData'));
            if (prevData.contents){
                prevData.contents.forEach((item)=>{
                    console.log(item)
                    watchList.add(new movie(item.title, item.thumb, item.collection, item.longDescription, item.year, item.genre, item.note, item.cast));
                });
            }
            console.log(prevData)
            if (prevData.collections){
                watchList.collections = prevData.collections;
            }
            watchList.render(watchList.contents);
            watchList.renderCollections();
        }
    }, 
    add: (obj)=>{
        watchList.contents.push(obj);
        watchList.render(watchList.contents);
        window.localStorage.setItem('watchListData', JSON.stringify({ collections: watchList.collections, contents: watchList.contents }));
    },
    remove: (id)=>{
        watchList.contents.splice(id, 1);
        watchList.render(watchList.contents);
        window.localStorage.setItem('watchListData', JSON.stringify({ collections: watchList.collections, contents: watchList.contents}));
    },
    render: (list)=>{
        if (list.length >= 1) {
            let index = 0;
            $("#watch-list").html(""); 
            list.forEach((element) => {
                element.id = "card-"+index;
                $("#watch-list").append(element.movieCard());
                element.updateCollections();
                index++;
            })
        }else{
            $("#watch-list").html(`<div class="no-results text-center">
                <h1><i class="fas fa-asterisk"></i></h1>
                <h5>Currently you have no items in your list</h5>
                <p >Click the add button to the left to start adding movies, tv shows and games to your to watch list</p> 
                </div>
            `);
        }
        
    },
    filter: (type)=>{
        let filterList = watchList.contents.filter((element) =>{
            return element.type == type
        })
        let icons = {
            movie:`<i class="fas fa-film"></i>`,
            tv:`<i class="fas fa-tv"></i>`,
            book:`<i class="fas fa-gamepad"></i>`,
            game:`<i class="fas fa-book"></i>`
        }
        if(filterList.length == 0){
            $("#watch-list").html(`<div class="no-results text-center">
                <h1>${icons[type]}</h1>
                <h5>Currently you have no ${type} in your list</h5>
                <p>Click the add button to the right to start adding some ${type}s</p>
                </div>
            `);
        }else{
            watchList.render(filterList)
        }
    },
    addCollection: (name)=>{
        watchList.collections.push(name);
        watchList.renderCollections();
        window.localStorage.setItem('watchListData', JSON.stringify({ collections: watchList.collections, collections: watchList.collections }));
    },
    removeCollection: (id) =>{
        watchList.collections.splice(id, 1);
        watchList.renderCollections();
        window.localStorage.setItem('watchListData', JSON.stringify({ collections: watchList.collections, collections: watchList.collections }));
    },
    renderCollections: ()=>{
        $("#category-list").html("");
        if(watchList.collections.length != 0){
            watchList.collections.forEach(element =>{
                $("#category-list").append(`<li>${element}</li>`)
            }) 
        }
        let addNew = $("<li class='add-new'>Edit Collections</li>")
        addNew.on("click", () =>{
            makePopUp("manageFilters")
        });
        $("#category-list").append(addNew)
    }
};
watchList.load();
watchList.render(watchList.contents);
watchList.renderCollections();
