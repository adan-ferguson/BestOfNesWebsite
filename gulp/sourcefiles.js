

module.exports = {
  getJS: (prependDir = '') => {
    return [
      'vendor/**/*.js',
      'index.js',
      '**/index.js',
      '**/*.js',
    ].map(s => prependDir + s)
  },
  getStyles: (prependDir = '') => {
    return [
      '**/*.less',
      '**/*.css'
    ].map(s => prependDir + s)
  }
}