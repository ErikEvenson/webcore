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
    // production: {
    //   awsS3BucketLocation: 'http://TBD.s3.amazonaws.com/',
    //   herokuAppName: 'TBD'
    // },
    // staging: {
    //   awsS3BucketLocation: 'http://TBD.s3.amazonaws.com/',
    //   herokuAppName: 'TBD'
    // }
  },

  htmlServerFiles: [
    './public/**/*.html'
  ],

  jadeServerFiles: [
    './public/**/*.jade',
    '!./public/initializr{,/**}',
    '!./public/bower_components{,**}'
  ],

  jsBuildFiles: [
    './config/**/*.js',
    './gulpfile.js',
    './tasks/**/*.js'
  ],

  jsClientFiles: [
    './public/js/**/*.js',
    '!./public/js/vendor/**/*.js'
  ],

  jsServerFiles: [
    './server/**/*.js',
    '.bin/www'
  ],

  miscFiles: [
    './bin{,/**}',
    './server/**/*.js',
    'app.json',
    'package.json',
    'Procfile'
  ],

  /*
   * Vendor files are files that will be made available on the build app's
   * static file server.  These files typically do not include bower css and
   * javascript files as these are optimized into a single css and js file.
   */
  vendorFiles: [
    './public/bower_components{,/**}',
    '!./public/bower_components/**/*.map',
    '!./public/bower_components/**/*.coffee',
    '!./public/bower_components/**/*.js',
    '!./public/bower_components/**/*.less',
    '!./public/bower_components/**/*.css',
    './public/js/vendor{,/**}'
  ],

  jsNoLintFiles: [
    '!./public/js/vendor{,/**}'
  ],

  source: './',
  temp: './temp/',

  testFiles: [
    './test/**/*.js'
  ]
};

/** @param {Object} buildConfig.jsFiles - Combine all js files. */
buildConfig.jsFiles = [].concat(
  buildConfig.jsBuildFiles,
  buildConfig.jsClientFiles,
  buildConfig.jsServerFiles
);

/** @param {Object} buildConfig.lintFiles - Create list of lintable jsfiles. */
buildConfig.jsLintFiles = [].concat(
  buildConfig.jsFiles,
  buildConfig.jsNoLintFiles
);

/** @param {Object} module.exports - Export build configuration. */
module.exports = buildConfig;
