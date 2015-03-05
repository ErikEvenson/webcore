/*
 * slush-eeegen
 *
 * Copyright (c) 2015, 3E Enterprises, LLC
 * Licensed under the MIT license.
 */

'use strict';

var 
  _ = require('underscore.string'),
  conflict = require('gulp-conflict'),
  gulp = require('gulp'),
  inquirer = require('inquirer'),
  install = require('gulp-install'),
  rename = require('gulp-rename'),
  template = require('gulp-template');

// Set process environment variables
/** @param {String} process.env.DEBUG - Set DEBUG level. */
process.env.DEBUG = process.env.DEBUG || '*';

gulp = require('./generators/default')(
  gulp, install, conflict, template, rename, _, inquirer
);
