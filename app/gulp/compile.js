const pump = require('pump')

const concat = require('gulp-concat')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const rev = require('gulp-rev')

const directories = require('../directories.js')
const sourcefiles = require('./sourcefiles.js')

async function writeJS(gulp, mode){

  const pumpArray = [gulp.src(sourcefiles.getJS(directories.SOURCES.JS), {base: directories.SOURCES.JS})]

  if(mode === 'production'){
    pumpArray.push(concat('scripts.min.js'))
    pumpArray.push(babel({
      presets: ['env']
    }))
    pumpArray.push(uglify())
    pumpArray.push(rev())
  }

  pumpArray.push(gulp.dest(directories.COMPILED.JS))
  await pumpIt(pumpArray)
}

async function writeStyles(gulp, mode){

  const pumpArray = [
    gulp.src(sourcefiles.getStyles(directories.SOURCES.STYLES), {base: directories.SOURCES.STYLES}),
    sass()
  ]

  if(mode === 'production'){
    pumpArray.push(concat('styles.css'))
    pumpArray.push(rev())
  }

  pumpArray.push(gulp.dest(directories.COMPILED.STYLES))
  await pumpIt(pumpArray)
}

//async
function pumpIt(pumpArray){

  return new Promise((yay, nay) => {
    pump(pumpArray, e => {
      if(e){
        nay(e)
      }
      yay()
    })
  })
}

module.exports = {writeJS, writeStyles}