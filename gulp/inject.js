const inject = require('gulp-inject')
const directories = require('../app/directories.js')
const sourcefiles = require('./sourcefiles.js')
const minifiedName = require('../app/config.js').filename + '.min.js'

function injectIntoViews(gulp, mode){

  let jsFiles = mode === 'production' ?
    [directories.COMPILED_ASSETS + 'js/' + minifiedName] :
    sourcefiles.getJS(directories.COMPILED_ASSETS + 'js/')

  gulp
    .src(directories.VIEWS + '**/*.pug')
    .pipe(inject(gulp.src(jsFiles, {read: false})))
    .pipe(gulp.dest(directories.COMPILED_VIEWS))
}

module.exports = injectIntoViews