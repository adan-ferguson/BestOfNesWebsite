const request = require('request-promise-native')
const config = require('./config.js')

module.exports = {
  a: async () => {

    let resp = await request({
      method: 'get',
      url: 'https://api.twitch.tv/helix/streams?game_id=33214',
      headers: {
        'Client-ID': config.twitch.clientID
      },
      json: true
    })

  }
}