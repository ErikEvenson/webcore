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

  // Build task
  gulp.task('build', ['css', 'html', 'lint', 'misc'], function() {
    // gulp.watch(source, ['misc']);
  });

  // Clean build folder
  gulp.task('clean', function(cb) {
    del([config.build.build + '*', config.build.temp + '*'], cb);
  });

  // Process css files
  gulp.task('css', function(cb) {
    return gulp.src(config.build.cssFiles, {base: './'})
      .pipe(newer(config.build.build))
      .pipe(gulp.dest(config.build.build));
  });

  // Process html/jade files
  gulp.task('html', function(cb) {
    return gulp.src(config.build.htmlFiles, {base: './'})
      .pipe(newer(config.build.build))
      .pipe(gulp.dest(config.build.build));
  });

  // Move miscellaneous files to build folder
  gulp.task('misc', function() {
    return gulp.src(config.build.miscFiles, {base: './'})
      .pipe(newer(config.build.build))
      .pipe(gulp.dest(config.build.build));
  });

  // Watch task
  gulp.task('watch', function() {
    var watcher = gulp.watch(config.build.jsFiles, ['lint']);

    watcher.on('change', function(e) {
      console.log('File ' + e.path + ' was ' + e.type + ', running tasks...');
    });
  });
};
