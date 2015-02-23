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
    jade = require('gulp-jade'),
    newer = require('gulp-newer');

  // Build task
  gulp.task('build', ['buildClient', 'buildServer'], function() {
    // gulp.watch(source, ['misc']);
  });

  // Build client task
  gulp.task('buildClient', [], function() {
    // gulp.watch(source, ['misc']);
  });

  // Build server task
  gulp.task('buildServer',
    ['cssServer', 'jsServer', 'htmlServer', 'lint', 'misc'], function() {
    // gulp.watch(source, ['misc']);
  });

  // Clean build folder
  gulp.task('clean', function(cb) {
    del([config.build.build + '*', config.build.temp + '*'], cb);
  });

  // Process css files
  gulp.task('cssServer', function(cb) {
    return gulp.src(config.build.cssServerFiles, {base: './'})
      .pipe(newer(config.build.build))
      .pipe(gulp.dest(config.build.build));
  });

  // Process html files
  gulp.task('htmlServer', ['jadeServer'], function(cb) {
    return gulp.src(config.build.htmlServerFiles, {base: './'})
      .pipe(newer(config.build.build))
      .pipe(gulp.dest(config.build.build));
  });

  // Process jade server files
  gulp.task('jadeServer', function(cb) {
    var LOCALS = {};

    return gulp.src(config.build.jadeServerFiles, {base: './server/views/'})
      .pipe(newer(config.build.build))
      .pipe(jade({locals: LOCALS}))
      .pipe(gulp.dest(config.build.source + '/public'));
  });

  // Process client-side js files
  gulp.task('jsServer', function(cb) {
    return gulp.src(config.build.jsServerFiles, {base: './'})
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
