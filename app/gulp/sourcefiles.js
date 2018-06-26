const path = require('path')

module.exports = {
  getJS: (prependDir = '') => {
    return [
      'vendor/**/*.js',
      'app/index.js',
      'app/**/*.js'
    ].map(s => path.join(prependDir, s))
  },
  getStyles: (prependDir = '') => {
    return [
      '**/*.css',
      '**/*.sass'
    ].map(s => path.join(prependDir, s))
  }
}