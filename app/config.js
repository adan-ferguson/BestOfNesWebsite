const options = require('../config.json')
const packageOptions = require('../package.json')

const defaults = {
  port: 3000,
  db: {
    port: 27017,
    name: 'bestofnes'
  },
  name: packageOptions.name,
  accounts: {
    admins: [], // Twitch names of users who can access admin pages
    homepageStreams: [] // Twitch name of streams that appear on homepage if they're active
  },
  twitch: {
    clientID: null,
    clientSecret: null
  },
  requireHttps: false
}

if(!options.secret){
  throw 'config.json requires a "secret" value'
}

module.exports = Object.assign(defaults, options)