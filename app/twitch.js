const request = require('request-promise-native')
const config = require('./config.js')
const users = require('./models/users.js')
const guid = require('uuid/v4')
const log = require('fancy-log')

let appAccessToken = null

const twitch = {
  getUsernameFromAccessToken: async (token) => {
    try {
      let resp = await request({
        method: 'get',
        url: 'https://api.twitch.tv/helix/users',
        headers: {
          Authorization: 'Bearer ' + token,
          'client-id': config.twitch.clientID
        },
        json: true
      })
      if(resp.data.length > 0){
        return resp.data[0].login
      }
      return null
    } catch(e) {
      return null
    }
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
  },
  middleware: (req, res, next) => {
    // Attach the user's twitch info or general login info
    res.locals.twitch = twitch.getTwitchInfo(req.session.username)
    next()
  },
  getTwitchInfo: username => {
    let id = guid()
    return  {
      username: username || null,
      loginLink: twitch.getLoginLink(id),
      stateID: id,
      isAdmin: users.isAdmin(username)
    }
  },
  /**
   * @param usernames array of usernames
   * @returns array of usernames who are currently streaming
   */
  getStreamStatuses: async (usernames) => {

    if(usernames.length > 100){
      let statuses = []
      for(let i = 0; i < usernames.length; i += 100){
        statuses.concat(twitch.getStreamStatuses(usernames.slice(i, i + 100)))
      }
      return statuses
    }

    let qs = ''
    usernames.forEach(username => {
      qs += `user_login=${username}&`
    })
    qs = qs.substring(0, qs.length - 1) // Remove final &

    try {
      let results = await request({
        method: 'get',
        url: 'https://api.twitch.tv/helix/streams?' + qs,
        headers: {
          Authorization: 'Bearer ' + await getAppAccessToken(),
          'client-id': config.twitch.clientID
        },
        json: true
      })
      return results.data.map(result => result.user_name)
    } catch(e) {
      log('Could not get user statuses: ', e)
      if(e.status === 401){
        appAccessToken = null
      }
      return []
    }
  }
}

async function getAppAccessToken(){

  if(appAccessToken){
    return appAccessToken
  }

  try {
    appAccessToken = await requestNewAppAccessToken()
  }catch(e) {
    log('Could not get app access token: ', e)
  }

  return appAccessToken

  async function requestNewAppAccessToken(){
    let resp = await request({
      method: 'post',
      url: 'https://id.twitch.tv/oauth2/token',
      qs: {
        client_id: config.twitch.clientID,
        client_secret: config.twitch.clientSecret,
        grant_type: 'client_credentials'
      },
      json: true
    })
    return resp.access_token
  }
}

function jsonToQueryString(json) {
  return '?' +
    Object.keys(json).map(function(key) {
      return encodeURIComponent(key) + '=' +
        encodeURIComponent(json[key])
    }).join('&')
}

module.exports = twitch