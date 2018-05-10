const options = require('../config.json')
const packageOptions = require('../package.json')

const filename = packageOptions.name.toLowerCase().replace(/[ -]/g, '.')

const defaults = {
  port: 3000,
  name: packageOptions.name,
  productionJS: filename + '.min.js',
  productionCSS: filename + '.css'
}

module.exports = Object.assign(defaults, options)