
let addMenuVis = false;
$(document).on("click", (e)=>{
  if($(e.target).closest('div[id]').attr("id") =="add"){
    let startPos = 60;
    ["movie", "tv","game","book"].forEach((element)=>{
      $(`#${element}`).animate({
        display: 'toggle',
        top: startPos,
        "z-index": 4
      }, 500,()=>{
          $(`#${element}`).show();
          addMenuVis = true;
        $(`#${element}`).on("click", () => {
          makePopUp(`${element}`)
        })
      });
      startPos += 50;
    })
  }else{
      if(addMenuVis){
          ["movie", "tv","game","book"].forEach((element)=>{
            $(`#${element}`).animate({
            display: "toggle",
            top: 7,
            "z-index": -1
        }, 500,()=>{
            $(`#${element}`).hide();
            addMenuVis = false;
      });
    })
  }
      }
    
});

