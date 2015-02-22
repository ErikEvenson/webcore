/**
 * Provides initializr function.
 * https://github.com/verekia/initializr/tree/ac535f34d66411d99718be892290ee62199968ba/war/builder/modules
 *
*/
var
  _ = require('underscore'),
  conflict = require('gulp-conflict'),
  gulp = require('gulp'),
  rename = require('gulp-rename'),
  template = require('gulp-template');

var
  incompatabilities = {
    'h5bp-content': ["izr-responsive", "boot-hero"],
    'h5bp-css': ["boot-css"],
    'modernizr': ["html5shiv", "modernizrrespond", "html5shivrespond"]
  };

function isIncompatible(module, modules) {
  var intersection = _.intersection(incompatabilities[module], modules);
  
  if (intersection.length > 0) {
    return module + ' is not compatible with ' + intersection.toString();
  }

  return false;
}

module.exports = {
  processor: function(answers) {
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
  },

  validator: function(modules){
    var retval = true;
    if (modules === undefined) { return retval; }
    
    find = _.find(modules, function(module){
      var incompatible = isIncompatible(module, modules);
      
      if (incompatible) {
        retval = incompatible;
        return true;
      }

      return false;
    });

    return retval;
  }
};
