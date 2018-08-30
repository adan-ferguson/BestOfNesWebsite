const cleanup = require('./cleanup.js')
const compile = require('./compile.js')
const inject = require('./inject.js')
const log = require('fancy-log')

const watch = require('gulp-debounced-watch')

module.exports = async (gulp, options) => {

  cleanup()
  await compile.writeJS(gulp, options.mode)
  await compile.writeStyles(gulp, options.mode)
  inject(gulp, options.mode)

  watch(['web/js/**/*'], async () => {
    cleanup('JS')
    await compile.writeJS(gulp, options.mode)
    inject(gulp, options.mode)
    log('Recompiled and injected JS')
  })

  watch(['web/styles/**/*'], async () => {
    cleanup('STYLES')
    await compile.writeStyles(gulp, options.mode)
    inject(gulp, options.mode)
    log('Recompiled and injected CSS')
  })

  watch(['web/views/**/*'], {events: ['change']}, () => {
    cleanup('VIEWS')
    inject(gulp, options.mode)
    log('Injected')
  })
}