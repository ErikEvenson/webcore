/*
 * slush-eeegen
 *
 * Copyright (c) 2015, 3E Enterprises, LLC
 * Licensed under the MIT license.
 */

'use strict';

var 
  _ = require('underscore.string'),
  async = require('async'),
  conflict = require('gulp-conflict'),
  gulp = require('gulp'),
  inquirer = require('inquirer'),
  install = require('gulp-install'),
  rename = require('gulp-rename'),
  template = require('gulp-template'),
  url = require('url');

function format(string) {
  var username = string.toLowerCase();
  return username.replace(/\s/g, '');
}

var defaults = (function () {
  var homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
    workingDirName = process.cwd().split('/').pop().split('\\').pop(),
    osUserName = homeDir && homeDir.split('/').pop() || 'root',
    configFile = homeDir + '/.gitconfig',
    user = {};
  if (require('fs').existsSync(configFile)) {
    user = require('iniparser').parseSync(configFile).user;
  }
  return {
    appName: workingDirName,
    userName: format(user.name) || osUserName,
    authorEmail: user.email || ''
  };
})();

// Set process environment variables
/** @param {String} process.env.DEBUG - Set DEBUG level. */
process.env.DEBUG = process.env.DEBUG || '*';

gulp.task('default', function (done) {
  var initializrValidation = function(input){
    // var urlObject = url.parse(input, true);
    // var query = urlObject.query;
    return true;
  };

  var prompts = [{
    name: 'appName',
    message: 'What is the name of your project?',
    default: defaults.appName
  }, {
    name: 'appDescription',
    message: 'What is the description?'
  }, {
    name: 'appVersion',
    message: 'What is the version of your project?',
    default: '0.1.0'
  }, {
    name: 'authorName',
    message: 'What is the author name?',
  }, {
    name: 'authorEmail',
    message: 'What is the author email?',
    default: defaults.authorEmail
  }, {
    name: 'userName',
    message: 'What is the github username?',
    default: defaults.userName
  }, {    
    choices: [
      {
        name: 'h5bp-content'
      },
      {
        name: 'h5bp-css',
        disabled: 'Under development'
      },
      {
        name: 'h5bp-csshelpers',
        disabled: 'Under development'
      },
      {
        name: 'h5bp-mediaqueryprint',
        disabled: 'Under development'
      },
      {
        name: 'h5bp-mediaqueries',
        disabled: 'Under development'
      },
      {
        name: 'izr-emptyscript',
        disabled: 'Under development'
      },
      {
        name: 'modernizr'
      },
      {
        name: 'simplehtmltag',
        disabled: 'Under development'
      }
    ],
    name: 'initializrModules',
    message: 'What initializr modules would you like to include?',
    type: 'checkbox',
    validate: initializrValidation
  }, {
    type: 'confirm',
    name: 'moveon',
    message: 'Continue?'
  }];

  //Ask
  inquirer.prompt(prompts,
    function (answers) {
      if (!answers.moveon) { return done(); }
      answers.appNameSlug = _.slugify(answers.appName);

      async.parallel([
        // Templates
        function(cb){
          gulp.src(__dirname + '/templates/**')
            .pipe(template(answers))
            .pipe(rename(function (file) {
                if (file.basename[0] === '_') {
                    file.basename = '.' + file.basename.slice(1);
                }
            }))
            .pipe(conflict('./'))
            .pipe(gulp.dest('./'))
            .pipe(install())
            .on('end', function () {
                cb();
            });
        },
        // Initializr modules
        function(cb){
          // Guard clause
          var modules = answers.initializrModules;

          if (modules.indexOf('h5bp-content') === -1) {
            cb();
          } else {
            gulp.src(__dirname + '/initializr/h5bp-content/**')
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
          }
        }
      ], function(err, results){
        if (err) { console.log(err); }
        done();
      });
    });
});
