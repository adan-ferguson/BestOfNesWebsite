const path = require('path')

module.exports = {
  getJS: (prependDir = '') => {
    return [
      'vendor/**/*.js',
      'index.js',
      '**/index.js',
      '**/*.js',
    ].map(s => path.join(prependDir, s))
  },
  getStyles: (prependDir = '') => {
    return [
      '**/*.less',
      '**/*.css'
    ].map(s => path.join(prependDir, s))
  }
}