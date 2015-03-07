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
    staging: {
      awsS3BucketLocation: 'http://peaceful-depths-5616.s3.amazonaws.com/',
      herokuAppName: 'peaceful-depths-5616'
    }
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

  vendorFiles: [
    './public/bower_components{,/**}',
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
