const gulp = require('gulp');
const babel = require('gulp-babel');
const chalk = require('chalk');

gulp.task('babel', function() {
  gulp.src('packages/**/*.js').pipe(
    babel({
      presets: ['stage-2'],
      plugins: [
        "transform-vue-jsx",
        "transform-runtime"
      ]
    })
  ).pipe(gulp.dest('lib'));
});

gulp.task('default', ['babel']);
