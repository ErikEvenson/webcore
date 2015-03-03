/**
 * Provides gulp build tasks.
 *
 * @param {object} gulp - The gulp object.
 * @param {object} config - The configuration object.
*/
module.exports = function(gulp, config) {
  var
    concat = require('gulp-concat'),
    debug = require('gulp-debug'),
    del = require('del'),
    gulpif = require('gulp-if'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade'),
    mainBowerFiles = require('main-bower-files'),
    minifyCss = require('gulp-minify-css'),
    newer = require('gulp-newer'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    useref = require('gulp-useref');

  // Build task
  gulp.task('build', ['buildClient', 'buildServer', 'lint'], function() {
    // gulp.watch(source, ['misc']);
  });

  // Build client task
  gulp.task('buildClient', ['jsClient'], function() {
    // gulp.watch(source, ['misc']);
  });

  // Build server task
  gulp.task('buildServer',
    ['cssServer', 'jsServer', 'htmlServer', 'misc', 'vendor'], function() {
    // gulp.watch(source, ['misc']);
  });

  // Clean build folder
  gulp.task('clean', function(cb) {
    del([config.build.build + '*', config.build.temp + '*'], cb);
  });

  // Process css files
  gulp.task('cssServer', function(cb) {
    var files = mainBowerFiles('**/*.css').concat(config.build.cssServerFiles);

    return gulp.src(files, {base: './'})
      .pipe(debug({title: 'cssServer'}))
      .pipe(concat('public/css/main.min.css', {newLine: ''}))
      .pipe(minifyCss({keepBreaks: true}))
      .pipe(gulp.dest(config.build.build));
  });

  // Process html files
  gulp.task('htmlServer', ['jadeServer'], function(cb) {
    var assets = useref.assets();

    return gulp.src(config.build.htmlServerFiles, {base: './'})
      .pipe(assets)
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest(config.build.build));
  });

  // Process jade server files
  gulp.task('jadeServer', function(cb) {
    var LOCALS = {};
    var wiredep = require('wiredep').stream;

    return gulp.src(config.build.jadeServerFiles, {base: './'})
      .pipe(wiredep({
        directory: path.join(config.build.basepath, 'public/bower_components/'),
        bowerJson: require(path.join(config.build.basepath, './bower.json'))
      }))
      .pipe(jade({locals: LOCALS, pretty: true}))
      .pipe(gulp.dest('./'));
  });

  // Process js client files
  gulp.task('jsClient', function(cb) {
    var files = mainBowerFiles('**/*.js').concat(config.build.jsClientFiles);

    return gulp.src(files, {base: './'})
      .pipe(debug({title: 'jsClient'}))
      .pipe(concat('public/js/app.min.js', {newLine: ''}))
      .pipe(uglify())
      .pipe(gulp.dest(config.build.build));
  });

  // Process js server files
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

  // Move vendor files to build folder
  gulp.task('vendor', function() {
    return gulp.src(config.build.vendorFiles, {base: './'})
      .pipe(newer(config.build.build))
      .pipe(gulp.dest(config.build.build));
  });

  // Watch task
  gulp.task('watch', function() {
    var watcher = gulp.watch(
      [
        config.build.jsBuildFiles,
        config.build.jsClientFiles,
        config.build.jsServerFiles
      ],
      ['lint']
    );

    watcher.on('change', function(e) {
      console.log('File ' + e.path + ' was ' + e.type + ', running tasks...');
    });
  });
};
