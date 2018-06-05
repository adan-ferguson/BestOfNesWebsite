const options = require('../config.json')
const packageOptions = require('../package.json')

const defaults = {
  port: 3000,
  db: {
    port: 27017,
    name: 'bestofnes'
  },
  name: packageOptions.name,
  twitch: {
    clientID: null,
    clientSecret: null
  }
}

module.exports = Object.assign(defaults, options)