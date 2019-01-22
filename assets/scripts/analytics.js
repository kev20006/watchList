//this will be used to generate D3/DC Crossfilter dashboard to show user information.

const analytics = {
    render: ()=>{
        $("#view-title").html(`<h6>My Watch History</h6>`);
        console.log(watchList.analytics)
        $("#watch-list").html("");
        $("#watch-list").append("<p>D3/DC dashboard will go here.</p>")
        
    }
}