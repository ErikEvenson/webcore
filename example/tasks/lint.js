/**
 * Provides gulp linting tasks.
 *
 * @param {object} gulp - The gulp object.
 * @param {object} config - The configuration object.
*/
module.exports = function(gulp, config) {
  var
    cache = require('gulp-cached'),
    gjslint = require('gulp-gjslint'),
    jshint = require('gulp-jshint');

  gulp.task('gjslint', function() {
    return gulp.src(config.build.jsfiles)
      .pipe(cache('gjslinting'))
      .pipe(gjslint())
      .pipe(gjslint.reporter('console'));
  });

  gulp.task('jslint', function() {
    return gulp.src(config.build.jsfiles)
      .pipe(cache('jslinting'))
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
  });

  gulp.task('lint', ['jslint', 'gjslint'], function() {
    // Linting...
  });
};
