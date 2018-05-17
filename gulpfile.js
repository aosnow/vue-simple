var gulp = require('gulp');
var babel = require('gulp-babel');

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
