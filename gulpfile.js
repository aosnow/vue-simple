const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const rm = require('rimraf');
const chalk = require('chalk');

gulp.task('clean:last', function(cb) {
  rm('lib', err => {
    if (err) throw err;
    console.log(chalk.cyan('  All old files deleted.\n'));
  });
  // gulp.src('lib').pipe(
  //   clean()
  // );
});

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

gulp.task('default', ['clean:last', 'babel']);
