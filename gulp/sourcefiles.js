module.exports = {
  getJS: (prependDir = '') => {
    return [
      'vendor/**/*.js',
      'bestofnes.js',
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