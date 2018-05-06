const options = require('../config.json')
const packageOptions = require('../package.json')

const defaults = {
  port: 3000,
  name: packageOptions.name,
  filename: packageOptions.toLowerCase().replace(/[ -]/g, '.')
}

module.exports = Object.assign(defaults, options)