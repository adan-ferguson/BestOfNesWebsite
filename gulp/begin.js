const cleanup = require('./cleanup.js')
const compile = require('./compile.js')
const inject = require('./inject.js')
const startserver = require('./startserver.js')

module.exports = async (gulp, options) => {

  cleanup()
  await compile.writeJS(gulp, options.mode)
  //await compile.writeStyles(gulp, options.mode)
  inject(gulp, options.mode)

  if(options.startServer){
    startserver()
  }
}