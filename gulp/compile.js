const log = require('fancy-log')
const pump = require('pump')
const config = require('../app/config.js')

const concat = require('gulp-concat')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const inject = require('gulp-inject')

const directories = require('../app/directories.js')
const sourcefiles = require('./sourcefiles.js')

const MINIFIED_NAME = config.smallname + '.min.js'

function writeJS(gulp, compile){

  const pumpArray = [gulp.src(sourcefiles.getJS(ASSETS_DIR + 'js/'))]

  if(compile){
    pumpArray.push(concat(MINIFIED_NAME))
    pumpArray.push(babel({
      presets: ['env']
    }))
    pumpArray.push(uglify())
  }

  pumpArray.push(gulp.dest(TARGET_ASSETS_DIR + 'js/'))

  pump(pumpArray, e => {
    if(e){
      log('PUMP ERROR', e)
    }
  })
}

function injectIntoViews(gulp, minified){

  let jsFiles = minified ? [TARGET_ASSETS_DIR + 'js/' + MINIFIED_NAME] : sourcefiles.getJS(TARGET_ASSETS_DIR + 'js/')

  gulp
    .src(VIEW_DIR + '**/*.pug')
    .pipe(inject(gulp.src(jsFiles, {read: false})))
    .pipe(gulp.dest(TARGET_VIEW_DIR))
}

// function writeStyles(gulp){
//
//   //const pumpArray = [gulp.src(sourcefiles.getStyles())]
// }


writeJS(gulp, options.mode === 'production' ? true : false)
// writeStyles(gulp)

injectIntoViews(gulp, options.mode === 'production' ? true : false)

module.exports = async function(gulp, mode){

  cleanup()
  writeJS(gulp, mode)
  //writeStyles(gulp, mode)
  injectIntoViews(gulp, mode)
}