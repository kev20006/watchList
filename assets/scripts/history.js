//this will be used to generate D3/DC Crossfilter dashboard to show user information.

const analytics = {
    render: ()=>{
        closeDrawerMenu()
        $("#view-title").html(`<h6>My Watch History</h6>`);
        console.log(watchList.analytics)
        $("#watch-list").html("");
        $("#watch-list").append("<p>D3/DC dashboard will go here.</p>");
        $("#watch-list").append(`<p>Your Current WatchList Contains....</p>`);
        $("#watch-list").append(`<div id="pie1" style="margin: 15px;"></div>`);
        watchListOverviewPie();

        
    }
}

function watchListOverviewPie(){
    let data = JSON.parse(window.localStorage.getItem('watchListData')).list.contents;
    console.log(data)
    let ndx = crossfilter(data);
    console.log(ndx)
    let typeDimension = ndx.dimension(type => type.type)
    let groupedTypes = typeDimension.group();
    console.log(groupedTypes.all())    
    let pie1 = dc.pieChart("#pie1");
    pie1
        .width(200)
        .height(200)
        .innerRadius(0)
        .label(function (d) {
            return d.key + ': ' + d.value;
        })
        .dimension(typeDimension)
        .group(groupedTypes);
    pie1.render();
}

