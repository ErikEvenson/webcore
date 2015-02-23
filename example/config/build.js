/**
 * Provides build parameters.
*/
var
  path = require('path');

/** @param {Object} module.exports - Export build configuration. */
module.exports = {
  basepath: path.join(__dirname, '..'),
  build: './build/',

  cssServerFiles: [
    './public/css/**/*.css',
    '!./public/css/initializr{,/**}'
  ],

  instances: {
    production: null,
    staging: 'agile-basin-3894'
  },

  htmlServerFiles: [
    './public/**/*.html'
  ],

  jadeServerFiles: [
    './server/views/**/*.jade',
    '!./server/views/initializr{,/**}'
  ],

  jsServerFiles: [
    './public/js/**/*.js'
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
