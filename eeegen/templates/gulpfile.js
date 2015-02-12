// Include gulp and plugins
var
  gulp  = require('gulp'),
  del   = require('del'),
  newer = require('gulp-newer');

var
  config = require('./config.json'),
  pkg    = require('./package.json');

config.pkg = pkg;

// Show project information
console.log(pkg.name + ' ' + pkg.version);
require('./tasks/heroku')(gulp, config);

// Clean build folder
gulp.task('clean', function(cb){
  del([config.build + '*'], cb);
});

// Move miscellaneous files to build folder
gulp.task('misc', function(){
  return gulp.src(config.miscFiles, {dot: true})
    .pipe(newer(config.build))
    .pipe(gulp.dest(config.build));
});

// Default task
gulp.task('default', ['misc'], function(){
  // gulp.watch(source, ['misc']);
});

