"use strict"

let watchList = {

    contents: [],
    add: (obj)=>{
        watchList.contents.push(obj);
        console.log(watchList.contents);
    }
    
};

