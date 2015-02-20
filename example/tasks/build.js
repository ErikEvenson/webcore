/**
 * Provides gulp build tasks.
 *
 * @param {object} gulp - The gulp object.
 * @param {object} config - The configuration object.
*/
module.exports = function(gulp, config) {
  var
    del = require('del'),
    gutil = require('gulp-util'),
    newer = require('gulp-newer');

  // Clean build folder
  gulp.task('clean', function(cb) {
    del([config.build.build + '*', config.build.temp + '*'], cb);
  });

  // Move miscellaneous files to build folder
  gulp.task('misc', function() {
    return gulp.src(config.build.miscFiles, {base: './'})
      .pipe(newer(config.build.build))
      .pipe(gulp.dest(config.build.build));
  });

  // Build task
  gulp.task('build', ['lint', 'misc'], function() {
    // gulp.watch(source, ['misc']);
  });

  // Watch task
  gulp.task('watch', function() {
    var watcher = gulp.watch(config.build.jsfiles, ['lint']);

    watcher.on('change', function(e) {
      console.log('File ' + e.path + ' was ' + e.type + ', running tasks...');
    });
  });
};
