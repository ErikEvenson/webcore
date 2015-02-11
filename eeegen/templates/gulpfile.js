// Include gulp and plugins
var
  gulp  = require('gulp'),

  del   = require('del'),
  newer = require('gulp-newer');

// File locations
var
  source = './',
  build  = 'build/',

  miscFiles = [
    './**',
    '!./build',
    '!./build/**',
    '!./gulpfile.js',
    '!./node_modules',
    '!./node_modules/**',
    '!./README.md'
  ],

  pkg = require('./package.json');

// Show project information
console.log(pkg.name + ' ' + pkg.version)

// Clean build folder
gulp.task('clean', function(){
  del([
    build + '*'
  ]);
});

// Move miscellaneous files to build folder
gulp.task('misc', function(){
  return gulp.src(miscFiles, {dot: true})
    .pipe(newer(build))
    .pipe(gulp.dest(build));
});

// Default task
gulp.task('default', ['misc'], function(){
  // gulp.watch(source, ['misc']);
});

