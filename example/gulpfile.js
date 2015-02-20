/**
 * Root gulpfile.
*/

// Include gulp and plugins
var
  del = require('del'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  newer = require('gulp-newer');

// Create a configuration object.
var config = {};

/** @param {Object} config.build - Build configuration parameters. */
config.build = require('./config/build');

/** @param {Object} config.env - Secret environment parameters. */
config.env = {};

/** @param {Object} config.pkg - package.json data. */
config.pkg = require('./package.json');

try {
  config.env = require('./config/env');
} catch (e) {
  config.env = {};
}

// Show project information
console.log(config.pkg.name + ' ' + config.pkg.version);

// Load tasks
require('./tasks/build')(gulp, config);
require('./tasks/heroku')(gulp, config);
require('./tasks/lint')(gulp, config);

// Default task
gulp.task('default', ['build'], function() {
  // Default
});

