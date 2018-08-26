(function(){

  const Race = {}
  BestOfNes.Race = Race

  Race.init = function(){
    let raceEl = document.querySelector('#race')
    BestOfNes.Utils.tabize(
      raceEl.querySelectorAll('.nav-link'),
      raceEl.querySelectorAll('section')
    )
  }

})()