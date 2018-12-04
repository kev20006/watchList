"use strict"

let watchListDOM = document.getElementById("watch-list")

function miscItem(element){
    let newItem = document.createElement("div");
    newItem.setAttribute("id", element.id);
    newItem.innerHTML = `
                    <h3>${element.title}</h3>
                    <p>${element.type}</p>`;
    return newItem;
}

function movieItem(element) {
    console.log(element)
    let newItem = $("<div></div>")
        .attr("class", "col-6 col-md-4 col-lg-3 mx-2 list-card")
        .attr("id", element.id);
    let deleteButton = $("<button></button>").text("delete")
    deleteButton.on("click", ()=>{
        console.log(element.id)
        watchList.remove(element.id)
    });
    
    newItem.html(`<h3>${element.title}</h3>
                <img src=${element.image} alt=${element.title}>
                <p>${element.description.split(".")[0]}</p>`)   
        .append(deleteButton)        
                
    return newItem;
}


let watchList = {

    contents: [],

    //test objects will only have an id and a title and a type of other
    add: (obj)=>{
        watchList.contents.push(obj);
        console.log(watchList.contents);
        watchList.render(watchList.contents);
    },
    remove: (id)=>{
        watchList.contents.splice(id, 1);
        watchList.render(watchList.contents);
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
            $("#watch-list").html(`<div>
                <h5>Currently you have no items in your list</h5>
                <p >Click the add button to the left to start adding movies, tv shows and games to your to watch list</p> 
                </div>
            `);
        }
        
    },
    filter: (type)=>{
        let filterList = watchList.contents.filter((element) =>{
            console.log(element)
            return element.type == type
        })
        console.log(filterList)
        if(filterList.length == 0){
            $("#watch-list").html(`<div>
                <h5>Currently you have no ${type} in your list</h5>
                <p>Click the add button to the right to start adding some ${type}s</p>
                </div>
            `);
        }else{
            watchList.render(filterList)
        }
        
    }
};

watchList.render(watchList.contents);

