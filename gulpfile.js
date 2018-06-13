const gulp = require('gulp')
const begin = require('./app/gulp/begin.js')

gulp.task('development', () => {
  begin(gulp, {mode: 'development'})
})

gulp.task('production', () => {
  begin(gulp, {mode: 'production'})
})