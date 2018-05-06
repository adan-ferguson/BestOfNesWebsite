const path = require('path')
const inject = require('gulp-inject')
const directories = require('../app/directories.js')
const sourcefiles = require('./sourcefiles.js')
const minifiedName = require('../app/config.js').filename + '.min.js'

function injectIntoViews(gulp, mode){

  let jsFiles = mode === 'production' ?
    [path.join(directories.COMPILED.JS, minifiedName)] :
    sourcefiles.getJS(directories.COMPILED.JS)

  gulp
    .src(path.join(directories.SOURCES.VIEWS, '**/*.pug'))
    .pipe(inject(gulp.src(jsFiles, {read: false})))
    .pipe(gulp.dest(directories.COMPILED.VIEWS))
}

module.exports = injectIntoViews