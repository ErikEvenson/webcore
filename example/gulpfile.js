/**
 * Root gulpfile.
 *
 * Copyright (c) 2015, 3E Enterprises, LLC
 */

// Include gulp and plugins
var
  config = {},
  del = require('del'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  newer = require('gulp-newer'),
  path = require('path');

function loadConfig(config) {
  if (!config) { config = {}; }

  /** @param {Object} config.aws - AWS parameters. */
  config.aws = require('./config/aws');

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

  return config;
}

/**
 * @param {String} process.env.NODE_ENV - Gulp always run under the development
 * environment.
 */
process.env.NODE_ENV = 'development';

// Create a configuration object.
config = loadConfig(config);

// Set process environment variables
/** @param {String} process.env.DEBUG - Set DEBUG level. */
process.env.DEBUG = process.env.DEBUG || '*';

// Load tasks
require('./tasks/aws')(gulp, config);
require('./tasks/core')(gulp, config);
require('./tasks/default')(gulp, config);
require('./tasks/heroku')(gulp, config);
require('./tasks/lint')(gulp, config);
require('./tasks/mongo')(gulp, config);
require('./tasks/server')(gulp, config);
