const request = require('request-promise-native')
const config = require('./config.js')

module.exports = {
  // a: async () => {
  //
  //   let resp = await request({
  //     method: 'get',
  //     url: 'https://api.twitch.tv/helix/streams?game_id=33214',
  //     headers: {
  //       'Client-ID': config.twitch.clientID
  //     },
  //     json: true
  //   })
  //
  //   return resp
  //
  // },
  getLoginLink: () => {

    let obj = {
      client_id: config.twitch.clientID,
      redirect_uri: config.twitch.redirectURI,
      response_type: 'token',
      scope: 'openid'
    }

    return 'https://id.twitch.tv/oauth2/authorize' + jsonToQueryString(obj)
  }
}

function jsonToQueryString(json) {
  return '?' +
    Object.keys(json).map(function(key) {
      return encodeURIComponent(key) + '=' +
        encodeURIComponent(json[key])
    }).join('&')
}