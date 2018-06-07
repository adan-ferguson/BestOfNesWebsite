(function(){

  const Twitch = {}

  // User logged in with twitch, parse the query string and save the user's
  // access token in local storage, then redirect to the page it was at before.
  Twitch.handleRedirect = function(){

    debugger
    let params = BestOfNes.Utils.parseHash()
    let redirectTarget = localStorage.redirectTarget || '/'

    if(params.state === localStorage.stateGuid){
      localStorage.removeItem('stateGuid')
      localStorage.accessToken = params.access_token
      localStorage.idToken = params.id_token
    }

    window.location = redirectTarget
  }

  BestOfNes.Twitch = Twitch

})()