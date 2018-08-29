const path = require('path')

module.exports = {
  getJS: (prependDir = '') => {

    let vendor = {
      name: 'vendor',
      transpile: false,
      files: [
        'vendor/polyfill.js',
        'vendor/moment.js',
        'vendor/**/*.js',
      ].map(s => path.join(prependDir, s))
    }

    let app = {
      name: 'app',
      transpile: true,
      files: [
        'app/index.js',
        'app/**/index.js',
        'app/**/*.prq.js',
        'app/**/*.js'
      ].map(s => path.join(prependDir, s))
    }

    return [vendor, app]
  },
  getStyles: (prependDir = '') => {
    return [
      'vendor/**/*.css',
      '**/*.css',
      '**/*.sass'
    ].map(s => path.join(prependDir, s))
  }
}