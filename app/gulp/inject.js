const path = require('path')
const inject = require('gulp-inject')
const directories = require('../directories.js')
const sourcefiles = require('./sourcefiles.js')
const config = require('../config.js')

function injectIntoViews(gulp, mode){

  let jsFiles = mode === 'production' ?
    [path.join(directories.COMPILED.JS, config.productionJS)] :
    sourcefiles.getJS(directories.COMPILED.JS)

  let cssFiles = mode === 'production' ?
    [path.join(directories.COMPILED.STYLES, config.productionCSS)] :
    sourcefiles.getStyles(directories.COMPILED.STYLES)

  gulp
    .src(path.join(directories.SOURCES.VIEWS, '**/*.pug'))
    .pipe(inject(gulp.src(jsFiles.concat(cssFiles), {read: false})))
    .pipe(gulp.dest(directories.COMPILED.VIEWS))
}

module.exports = injectIntoViews