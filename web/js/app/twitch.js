(function(){

  const Twitch = {}

  // User logged in with twitch, parse the query string and save the user's
  // access token in local storage, then redirect to the page it was at before.
  Twitch.handleLogin = function(){

    let params = BestOfNes.Utils.parseHash()
    let redirectTarget = localStorage.redirectTarget || '/'

    if(localStorage.state && params.state === localStorage.stateGuid){
      localStorage.removeItem('stateGuid')
      localStorage.removeItem('redirectTarget')
      localStorage.accessToken = params.access_token
      localStorage.idToken = params.id_token
    }

    window.location = redirectTarget
  }

  Twitch.checkAdminLogin = async function(){

    if(!localStorage.accessToken) {
      return
    }

    let headers = new Headers()
    headers.append('access-token', localStorage.accessToken)

    let response = await fetch('/admin/checkAccessToken', {
      method: 'post',
      headers: headers
    })

    let data = await response.json()

    if(data.valid){
      window.location = '/admin/dashboard'
    }
  }

  BestOfNes.Twitch = Twitch

})()