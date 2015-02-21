/**
 * Provides initializr function.
 * https://github.com/verekia/initializr/tree/ac535f34d66411d99718be892290ee62199968ba/war/builder/modules
 *
*/
var
  conflict = require('gulp-conflict'),
  gulp = require('gulp'),
  rename = require('gulp-rename'),
  template = require('gulp-template');

module.exports = function(answers) {
  return function(module, cb) {
    gulp.src(__dirname + '/' + module + '/**')
      .pipe(template(answers))
      .pipe(rename(function (file) {
          if (file.basename[0] === '_') {
              file.basename = '.' + file.basename.slice(1);
          }
      }))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .on('end', function () {
          cb();
      });
  };
};
