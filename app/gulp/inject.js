const path = require('path')
const inject = require('gulp-inject')
const directories = require('../directories.js')
const sourcefiles = require('./sourcefiles.js')

function injectIntoViews(gulp, mode){

  let jsFiles
  let cssFiles

  if(mode === 'production'){
    jsFiles = [path.join(directories.COMPILED.JS, '*.js')]
    cssFiles = [path.join(directories.COMPILED.STYLES, '*.css')]
  }else{
    jsFiles = sourcefiles.getJS(directories.COMPILED.JS)
    cssFiles = sourcefiles.getStyles(directories.COMPILED.STYLES)
  }

  gulp
    .src(path.join(directories.SOURCES.VIEWS, '**/*.pug'))
    .pipe(inject(gulp.src(jsFiles.concat(cssFiles), {read: false})))
    .pipe(gulp.dest(directories.COMPILED.VIEWS))
}

module.exports = injectIntoViews