const gulp = require('gulp')
const exec = require('child_process').exec
const log = require('fancy-log')

// const inject = require('gulp-inject')
// const babel = require('gulp-babel')
// const concat = require('gulp-concat')
// const uglify = require('gulp-uglify')

function begin(options){
  if(options.startServer){
    startServer()
  }
}

function startServer(){
  const cmd = 'forever start ./app/server.js'
  log(cmd)
  exec(cmd)
}

gulp.task('development', () => {
  begin({mode: 'development'})
})

gulp.task('production', () => {
  begin({mode: 'production'})
})

gulp.task('run', () => {
  begin({mode: 'production', startServer: true})
})