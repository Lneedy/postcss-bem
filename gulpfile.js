const gulp = require('gulp')
const babel = require('gulp-babel')
const tape = require('gulp-tape')

gulp.task('build', () => {
  gulp
    .src('./index.js')
    .pipe(
      babel({
        presets: ['env']
      })
    )
    .pipe(gulp.dest('lib'))
})

gulp.task('tape', () => {
  gulp.src('./test/index.js').pipe(tape())
})
