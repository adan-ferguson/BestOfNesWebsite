const gulp = require('gulp')
const begin = require('./app/gulp/begin.js')

gulp.task('development', async () => {
  await begin(gulp, {mode: 'development'})
})

gulp.task('production', async () => {
  await begin(gulp, {mode: 'production'})
})