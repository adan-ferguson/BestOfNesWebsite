const pump = require('pump')
const config = require('../app/config.js')

const concat = require('gulp-concat')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

const directories = require('../app/directories.js')
const sourcefiles = require('./sourcefiles.js')

const minifiedName = config.filename + '.min.js'

function writeJS(gulp, mode){

  return new Promise((yay, nay) => {

    const pumpArray = [gulp.src(sourcefiles.getJS(directories.SOURCES.JS))]

    if(mode === 'production'){
      pumpArray.push(concat(minifiedName))
      pumpArray.push(babel({
        presets: ['env']
      }))
      pumpArray.push(uglify())
    }

    pumpArray.push(gulp.dest(directories.COMPILED.JS))

    pump(pumpArray, e => {
      if(e){
        nay(e)
      }
      yay()
    })
  })
}

module.exports = {writeJS}