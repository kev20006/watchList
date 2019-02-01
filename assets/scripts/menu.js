//Animates the add new items quick dropdown menu, and attached event listeners.

["movie", "tv"].forEach((element) => {
  $(`#${element}`).on("click", () => {
    makePopUp(`${element}`)
  })
})


let addMenuVis = false;
$(document).on("click", (e)=>{
  if($(e.target).closest('div[id]').attr("id") =="add"){
    let startPos = 60;
    ["movie", "tv"].forEach((element)=>{
      $(`#${element}`).animate({
        display: 'toggle',
        top: startPos,
        "z-index": 4
      }, 500,()=>{
          $(`#${element}`).show();
          addMenuVis = true;
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

