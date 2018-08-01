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

  watch(['web/js/**/*'], {events: ['change']}, () => {
    compile.writeJS(gulp, options.mode)
    log('Recompiled JS')
  })

  watch(['web/js/**/*'], {events: ['add']}, async () => {
    await compile.writeJS(gulp, options.mode)
    inject(gulp, options.mode)
    log('Recompiled and injected JS')
  })

  watch(['web/styles/**/*'], {events: ['change']}, () => {
    compile.writeStyles(gulp, options.mode)
    log('Recompiled CSS')
  })

  watch(['web/styles/**/*'], {events: ['add']}, async () => {
    await compile.writeStyles(gulp, options.mode)
    inject(gulp, options.mode)
    log('Recompiled and injected CSS')
  })

  watch(['web/views/**/*'], {events: ['change']}, () => {
    inject(gulp, options.mode)
    log('Injected')
  })
}