/**
 * Provides build parameters.
*/
var
  path = require('path');

/** @param {Object} module.exports - Export build configuration. */
module.exports = {
  basepath: path.join(__dirname, '..'),
  build: './build/',

  instances: {
    production: null,
    staging: null
  },

  htmlFiles: [
    './views/**/*.jade'
  ],

  jsFiles: [
    './bin/www.js',
    './config/**/*.js',
    './gulpfile.js',
    './server/**/*.js',
    './tasks/**/*.js'
  ],

  miscFiles: [
    './bin/**/*.js',
    './server/**/*.js',
    'app.json',
    'package.json',
    'Procfile'
  ],

  source: './',
  temp: './temp/'
};
