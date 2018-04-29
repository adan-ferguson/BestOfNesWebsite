const log = require('fancy-log')
const pump = require('pump')

const sourcefiles = require('./sourcefiles.js')
const startserver = require('./startserver.js')

const concat = require('gulp-concat')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const inject = require('gulp-inject')

const ASSETS_DIR = './web/'
const TARGET_ASSETS_DIR = './public/compiled/'
const VIEW_DIR = './web/views/'
const TARGET_VIEW_DIR = './compiled/views/'

const MINIFIED_NAME = 'bestofnes.min.js'

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

module.exports = (gulp, options) => {

  cleanup()

  writeJS(gulp, options.mode === 'production' ? true : false)
  // writeStyles(gulp)
  injectIntoViews(gulp, options.mode === 'production' ? true : false)

  if(options.startServer){
    startserver()
  }
}