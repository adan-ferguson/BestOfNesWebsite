const path = require('path')

module.exports = {
  getJS: (prependDir = '') => {
    return [
      'vendor/moment.js',
      'vendor/**/*.js',
      'app/index.js',
      'app/**/index.js',
      'app/**/*.prq.js',
      'app/**/*.js'
    ].map(s => path.join(prependDir, s))
  },
  getStyles: (prependDir = '') => {
    return [
      'vendor/**/*.css',
      '**/*.css',
      '**/*.sass'
    ].map(s => path.join(prependDir, s))
  }
}