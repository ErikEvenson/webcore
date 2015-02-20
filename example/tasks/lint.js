/**
 * Provides gulp linting tasks.
 *
 * @param {object} gulp - The gulp object.
 * @param {object} config - The configuration object.
*/
module.exports = function(gulp, config) {
  var
    gjslint = require('gulp-gjslint'),
    jshint = require('gulp-jshint'),

    jsfiles = [
      './config/**/*.js',
      './gulpfile.js',
      './server/**/*.js',
      './tasks/**/*.js'
    ];

  gulp.task('gjslint', function() {
    return gulp.src(jsfiles)
      .pipe(gjslint())
      .pipe(gjslint.reporter('console'));
  });

  gulp.task('jslint', function() {
    return gulp.src(jsfiles)
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
  });

  gulp.task('lint', ['jslint', 'gjslint'], function() {
    // Linting...
  });
};
