// Include gulp and plugins
var
  gulp  = require('gulp'),
  del   = require('del'),
  newer = require('gulp-newer');

// Get configuration
var
  config = {};

config.build  = require('./config/build');
config.pkg    = require('./package.json');

try {
  config.env = require('./config/env');
} catch(e) {
  config.env = {};
}

// Show project information
console.log(config.pkg.name + ' ' + config.pkg.version);

// Load tasks
require('./tasks/heroku')(gulp, config);
require('./tasks/lint')(gulp, config);

// Clean build folder
gulp.task('clean', function(cb){
  del([config.build.build + '*', config.build.temp + '*'], cb);
});

// Move miscellaneous files to build folder
gulp.task('misc', function(){
  return gulp.src(config.build.miscFiles, {base: './'})
    .pipe(newer(config.build.build))
    .pipe(gulp.dest(config.build.build));
});

// Default task
gulp.task('default', ['misc'], function(){
  // gulp.watch(source, ['misc']);
});
