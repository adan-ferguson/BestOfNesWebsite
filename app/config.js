const options = require('../config.json')
const packageOptions = require('../package.json')

const defaults = {
  port: 3000,
  name: packageOptions.name
}

module.exports = Object.assign(defaults, options)