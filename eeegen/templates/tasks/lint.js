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
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    map = require('map-stream');

  var beeper = function(file, cb) {
    return map(function(file, cb) {
      if (!file.jshint.success) {
        // console.log('JSHINT fail in '+file.path);
        file.jshint.results.forEach(function(err) {
          if (err) { gutil.beep(); }
        });
      }
      cb(null, file);
    });
  };

  gulp.task('gjslint', function() {
    var options = {
      // This flag doesn't seem to work...
      flags: ['--beep']
    };

    return gulp.src(config.build.jsLintFiles)
      .pipe(cache('gjslinting'))
      .pipe(gjslint(options))
      .pipe(gjslint.reporter('console'));
  });

  gulp.task('jshint', function() {
    return gulp.src(config.build.jsLintFiles)
      .pipe(cache('jshinting'))
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(beeper());
  });

  gulp.task('lint', ['gjslint', 'jshint'], function() {
    // Linting...
  });
};

