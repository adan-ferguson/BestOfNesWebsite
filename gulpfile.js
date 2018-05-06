const gulp = require('gulp')
// const begin = require('./gulp/begin.js')

gulp.task('development', () => {
  begin(gulp, {mode: 'development'})
})

gulp.task('production', () => {
  begin(gulp, {mode: 'production'})
})

gulp.task('run', () => {
  begin(gulp, {mode: 'production', startServer: true})
})