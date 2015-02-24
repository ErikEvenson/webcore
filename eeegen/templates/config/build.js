/**
 * Provides build parameters.
*/
var
  buildConfig = {};
  path = require('path');

buildConfig = {
  TARFILE_NAME: 'archive.tar',
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

  jsBuildFiles: [
    './bin/www.js',
    './config/**/*.js',
    './gulpfile.js',
    './tasks/**/*.js'
  ],

  jsClientFiles: [
    './public/js/**/*.js'
  ],

  jsServerFiles: [
    './server/**/*.js'
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

/** @param {Object} buildConfig.jsFiles - Combine all js files. */
buildConfig.jsFiles = [].concat(
  buildConfig.jsBuildFiles,
  buildConfig.jsClientFiles,
  buildConfig.jsServerFiles
);

/** @param {Object} module.exports - Export build configuration. */
module.exports = buildConfig;
