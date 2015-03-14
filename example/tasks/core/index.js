/**
 * Provides gulp build tasks.
 *
 * @param {object} gulp - The gulp object.
 * @param {object} config - The configuration object.
*/

module.exports = function(gulp, config) {
  var
    _ = require('underscore'),
    argv = require('yargs').argv,
    browserify = require('browserify'),
    concat = require('gulp-concat'),
    bower = require('gulp-bower'),
    debug = require('gulp-debug'),
    del = require('del'),
    gulpif = require('gulp-if'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade'),
    karma = require('karma').server,
    lib = require('./lib')(config),
    mainBowerFiles = require('main-bower-files'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    mocha = require('gulp-mocha'),
    newer = require('gulp-newer'),
    path = require('path'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    sourcemaps = require('gulp-sourcemaps'),
    templateCache = require('gulp-angular-templatecache'),
    transform = require('vinyl-transform'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref');

  gulp.task('bower', function() {
    return bower();
  });

  gulp.task('browserify', ['templates'], function() {
    // transform regular node stream to gulp (buffered vinyl) stream
    var browserified = transform(function(filename) {
      var b = browserify(filename);
      return b.bundle();
    });

    return gulp.src(config.build.basepath + '/public/js/app_.js')
      .pipe(browserified)
      // .pipe(sourcemaps.init({loadMaps: true}))
      //     // Add transformation tasks to the pipeline here.
      //     .pipe(uglify())
      // .pipe(sourcemaps.write('./'))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('./public/js/'));
  });

  // Build task
  gulp.task('build', ['buildClient', 'buildServer', 'lint'], function() {
    return;
  });

  // Build client task
  gulp.task('buildClient', ['jsClient'], function() {
    return;
  });

  // Build server task (removed htmlServer for now)
  gulp.task('buildServer',
    ['cssServer', 'jsServer', 'misc', 'views', 'vendor'], function() {
    return;
  });

  // Clean build folder and temp folder.
  gulp.task('clean', function(cb) {
    del([config.build.build + '*', config.build.temp + '*'], cb);
  });

  // Concatenate and minify css files.
  gulp.task('cssServer', ['bower'], function(cb) {
    // Get css files from bower and application.
    var files = mainBowerFiles('**/*.css').concat(config.build.cssServerFiles);

    return gulp.src(files, {base: './'})
      // .pipe(debug({title: 'cssServer'}))
      .pipe(concat('public/css/main.min.css', {newLine: ''}))
      .pipe(minifyCss({keepBreaks: true}))
      .pipe(gulp.dest(config.build.build));
  });

  gulp.task('deploy', ['heroku-deploy', 'syncS3Files'], function() {
    return;
  });

  /*
   * Process client side javascript.  Concatenate and minify files and send
   * to the build directory.
   */
  gulp.task('jsClient', ['bower', 'browserify'], function(cb) {
    var files = mainBowerFiles('**/*.js')
      .concat(config.build.basepath + '/public/js/app.js');

    return gulp.src(files, {base: './'})
      // .pipe(debug({title: 'jsClient'}))
      .pipe(concat('public/js/app.min.js', {newLine: ''}))
      .pipe(uglify())
      .pipe(gulp.dest(config.build.build));
  });

  /*
   * Process server side javascript files.  Send to the build directory.
   */
  gulp.task('jsServer', function(cb) {
    return gulp.src(config.build.jsServerFiles, {base: './'})
      .pipe(newer(config.build.build))
      .pipe(gulp.dest(config.build.build));
  });

  // Move miscellaneous files to build directory.
  gulp.task('misc', function() {
    return gulp.src(config.build.miscFiles, {base: './'})
      .pipe(newer(config.build.build))
      .pipe(gulp.dest(config.build.build));
  });

  // Sync everything in the build public directory to the instance's AWS S3
  // bucket.
  gulp.task('syncS3Files', function() {
    var instance = argv.instance;
    var instances = config.build.instances;

    if (!instance || !_.contains(_.keys(instances), instance)) {
      console.log('Instance ' + instance + ' is not configured.');
      return;
    }

    var instanceConfig = instances[instance];

    if (!instanceConfig.awsS3Bucket) {
      console.log('Instance ' + instance + ' has no S3 bucket configured.');
      return;
    }

    var files = [config.build.build + 'public/**/*'];

    return lib.syncS3Bucket({
      bucket: instanceConfig.awsS3Bucket,
      files: files,
      gulp: gulp,
      key: config.env.AWS_ACCESS_KEY_ID,
      region: config.env.region,
      secret: config.env.AWS_SECRET_ACCESS_KEY
    });
  });

  // Test
  gulp.task('test', function(done) {
    // karma.start({
    //   configFile: config.build.basepath + '/karma.conf.js',
    //   singleRun: true
    // }, done);

    return gulp.src(config.build.testFiles, {read: false})
      .pipe(mocha({reporter: 'nyan'}));
  });

  // Move vendor files to build directory.
  gulp.task('vendor', function() {
    return gulp.src(config.build.vendorFiles, {base: './'})
      .pipe(newer(config.build.build))
      .pipe(gulp.dest(config.build.build));
  });

  // Move views to build directory.
  gulp.task('views', ['processViews'], function() {
    return gulp.src(config.build.viewFiles, {base: './'})
      .pipe(newer(config.build.build))
      .pipe(gulp.dest(config.build.build));
  });

  /*
   * Wire up bower dependencies.
   */
  gulp.task('wiredep', ['bower'], function(cb) {
    var LOCALS = {};
    var wiredep = require('wiredep').stream;

    return gulp.src(config.build.wiredepFiles, {base: './'})
      .pipe(wiredep({
        bowerJson: require(path.join(config.build.basepath, './bower.json')),
        directory: path.join(config.build.basepath, 'public/bower_components/'),
        ignorePath: /(\.\.\/)*public/
      }))
      .pipe(jade({locals: LOCALS, pretty: true}))
      .pipe(gulp.dest('./'));
  });

  /*
   * Process server-delivered html files.  Replace multiple css and javascript
   * sources with processed css and javascript files.  Set origin for static
   * files if instance is provided.  Minify resulting html and send to the
   * build directory.
   */
  gulp.task('processViews', ['wiredep'], function(cb) {
    var
      instance = argv.instance,
      instances = config.build.instances,
      origin = '';

    if (instance && _.contains(_.keys(instances), instance)) {
      instanceConfig = instances[instance];

      if (instanceConfig.awsS3Bucket) {
        origin = 'https://' + instanceConfig.awsS3Bucket + '.s3.amazonaws.com/';
      }
    }

    var instanceConfig = instances[instance];
    var assets = useref.assets();

    var condition = function(file) {
      if (path.extname(file.path) === '.html') { return true; }
      else { return false; }
    };

    return gulp.src(config.build.processFiles, {base: config.build.basepath})
      // Replace build blocks.
      .pipe(assets)
      .pipe(assets.restore())
      .pipe(useref())

      // Set origin
      .pipe(gulpif(
        condition,
        replace('css/main.min.css', origin + 'css/main.min.css'))
      )

      .pipe(gulpif(
        condition,
        replace('js/app.min.js', origin + 'js/app.min.js'))
      )

      .pipe(gulp.dest(config.build.build));
  });

  gulp.task('cleanTemplates', function(cb) {
    del(['./public/js/templates'], cb);
  });

  gulp.task('templates', ['cleanTemplates'], function() {
    var files = [
      './public/views/**/*.jade'
    ];

    gulp.src(files, {base: './'})
      .pipe(jade())
      .pipe(templateCache('templates.js', {
        base: path.join(config.build.basepath, 'public'),
        moduleSystem: 'Browserify',
        standalone: true
      }))
      .pipe(gulp.dest('public/js/templates'));
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
