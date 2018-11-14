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
    let newItem = document.createElement("div");
    newItem.setAttribute("class", "col-6 col-md-4 col-lg-3 mx-2 list-card")
    newItem.setAttribute("id", element.id);
    newItem.innerHTML = `
                    <img src=${element.image} alt=${element.title}>
                    <h6>${element.title}</h6>
                    <p>${element.description}</p>`;
    return newItem;
}


let watchList = {

    contents: [],

    //test objects will only have an id and a title and a type of other
    add: (obj)=>{
        watchList.contents.push(obj);
        console.log(watchList.contents);
        watchList.render()
    },
    remove: (id)=>{
        //do something
    },
    render: ()=>{
        let index = 0;
        watchListDOM.innerHTML = ""
        watchList.contents.forEach((element)=>{
            element.id= index;
            switch(element.type){
                case "Movie":
                    watchListDOM.appendChild(movieItem(element));
                    break;
                case "Book":
                    break;
                case "Game":
                    break;
                case "TV Show":
                    break;
                default:
                    watchListDOM.appendChild(miscItem(element));
            }
            index ++;
        })
    }
    
};

watchList.render();

