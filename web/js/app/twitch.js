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

    twitchNav = new TwitchNav(document.querySelector('#header .nav-link.twitch'))

    // Check our access token if we're not already logged in
    if(!twitchInfo.username && localStorage.accessToken){
      checkAccessToken()
    }else{
      twitchNav.update(twitchInfo)
    }
  }

  Twitch.getInfo = function(){

    return new Promise(yay => {
      if(twitchNav && twitchNav.twitchInfo){
        return yay(twitchNav.twitchInfo) //LOL
      }
      fireAfterInfoRecieved = yay
    })
  }

  let fireAfterInfoRecieved
  async function checkAccessToken(){

    if(!localStorage.accessToken) {
      twitchNav._notLoggedIn()
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

    if(fireAfterInfoRecieved){
      fireAfterInfoRecieved(twitchInfo)
    }
  }

  class TwitchNav {

    constructor(el){
      this.link = el

      this.link.querySelectorAll('.dropdown').forEach(dd => {
        new window.Dropdown(dd)
      })

      this.link.querySelector('.logout').addEventListener('click', () => {
        localStorage.clear()
      })

      this.link.querySelector('.notLoggedIn').addEventListener('click', () => {
        localStorage.stateGuid = this.twitchInfo.stateID
        localStorage.redirectTarget = window.location.pathname
      })

      this._showOption(this.link.getAttribute('mode'))
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
      this._showOption('loggedIn')
      this.link.querySelector('.my-channel').href = 'https://twitch.tv/' + this.twitchInfo.username
      this.link.querySelector('.name').textContent = this.twitchInfo.username
    }

    _notLoggedIn(){
      this._showOption('notLoggedIn')
      this.link.querySelector('.notLoggedIn').href = this.twitchInfo.loginLink
    }

    _showOption(name){
      this.link.setAttribute('mode', name)
      this.link.querySelectorAll('.option').forEach(e => {
        e.classList.add('hidden')
        if(e.classList.contains(name)){
          e.classList.remove('hidden')
        }
      })
    }
  }

  BestOfNes.Twitch = Twitch

})()