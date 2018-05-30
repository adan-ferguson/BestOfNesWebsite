const options = require('../config.json')
const packageOptions = require('../package.json')

const defaults = {
  port: 3000,
  db: {
    port: 27127,
    name: 'bestofnes'
  },
  name: packageOptions.name
}

module.exports = Object.assign(defaults, options)