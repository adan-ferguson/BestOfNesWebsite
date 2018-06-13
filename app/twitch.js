const request = require('request-promise-native')
const config = require('./config.js')

module.exports = {
  getUsernameFromAccessToken: async (token) => {
    let resp = await request({
      method: 'get',
      url: 'https://api.twitch.tv/helix/users',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    })

    if(resp.data.length > 0){
      return resp.data[0].login
    }

    return null
  },
  getLoginLink: (stateID) => {

    let obj = {
      client_id: config.twitch.clientID,
      redirect_uri: config.twitch.redirectURI,
      response_type: 'token id_token',
      scope: 'openid',
      state: stateID
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