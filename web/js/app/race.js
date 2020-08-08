(function(){

  const Race = {}
  BestOfNes.Race = Race

  Race.init = function(){
    let raceEl = document.querySelector('#race')
    BestOfNes.Utils.tabize(
      raceEl.querySelectorAll('.nav-link'),
      raceEl.querySelectorAll('section'),
      document.location.hash.substring(1)
    )
  }

  Race.setupSignupLink = async function(){
    let link = document.querySelector('a.race-sign-up')
    let twitchInfo = await BestOfNes.Twitch.getInfo()

    // If logged in then we don't need to use twitch link.
    if(twitchInfo.username){
      link.href = window.location.pathname + '/signup'
    }else{
      link.href = twitchInfo.loginLink
      link.addEventListener('click', () => {
        localStorage.stateGuid = twitchInfo.stateID
        localStorage.redirectTarget = window.location.pathname + '/signup'
      })
    }
  }

})()