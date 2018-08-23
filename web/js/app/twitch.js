(function(){

  const Twitch = {}

  // User logged in with twitch, parse the query string and save the user's
  // access token in local storage, then redirect to the page it was at before.
  Twitch.handleLogin = async function(){

    let params = BestOfNes.Utils.parseHash()
    let redirectTarget = localStorage.redirectTarget || '/'

    if(localStorage.stateGuid && params.state === localStorage.stateGuid){
      localStorage.removeItem('stateGuid')
      localStorage.removeItem('redirectTarget')
      localStorage.accessToken = params.access_token
      localStorage.idToken = params.id_token
    }

    window.location = redirectTarget
  }

  let twitchNav
  Twitch.checkLogin = async function(twitchInfo){

    twitchNav = new TwitchNav(document.querySelector('#header .twitchInfo'))

    // Check our access token if we're not already logged in
    if(!twitchInfo.username && localStorage.accessToken){
      checkAccessToken()
    }else{
      twitchNav.update(twitchInfo)
    }
  }

  async function checkAccessToken(){

    if(!localStorage.accessToken) {
      notLoggedIn()
      return
    }

    let headers = new Headers()
    headers.append('access-token', localStorage.accessToken)

    let response = await fetch('/checkAccessToken', {
      method: 'post',
      headers: headers,
      credentials: 'include'
    })

    let twitchInfo = await response.json()
    twitchNav.update(twitchInfo)
  }

  class TwitchNav {

    constructor(el){
      this.els = el.querySelectorAll('.option')
    }

    update(twitchInfo){
      this.twitchInfo = twitchInfo
      if(twitchInfo.username){
        this._loggedIn()
      }else{
        this._notLoggedIn()
      }
    }

    _loggedIn(){
      let el = this.els[1]
      this._showEl(el)

      let a = el.querySelector('a')
      a.text = this.twitchInfo.username
      a.href = 'https://twitch.tv/' + this.twitchInfo.username
    }

    _notLoggedIn(){
      let el = this.els[2]
      this._showEl(el)

      let a = el.querySelector('a')
      a.addEventListener('click', () => {
        localStorage.redirectTarget = window.location.pathname
      })
    }

    _showEl(el){
      this.els.forEach(e => e.classList.add('hidden'))
      el.classList.remove('hidden')
    }
  }

  BestOfNes.Twitch = Twitch

})()