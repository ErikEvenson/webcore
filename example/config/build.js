/**
 * Provides build parameters.
*/
var
  buildConfig = {};
  path = require('path');

buildConfig = {
  // TARFILE_NAME is the name of the file generated by the deploy process.
  TARFILE_NAME: 'archive.tar',

  // basepath is the path to the root directory of the project.
  basepath: path.join(__dirname, '..'),

  // build is the path to the build directory
  build: path.join(__dirname, '../build/'),

  // cssServerFiles is an array of paths to css files delivered from the server.
  // This does not include vendor files.
  cssServerFiles: [
    './public/css/**/*.css',
    '!./public/css/initializr{,/**}'
  ],

  // instances is an object of objects representing different instances of the
  // application.  Each object has properties for that instance.
  instances: {
    development: {
      awsS3Bucket: null,
      herokuAppName: null
    },
    staging: {
      awsS3Bucket: 'blooming-forest-5734',
      herokuAppName: 'blooming-forest-5734'
    }
  },

  // htmlServerFiles is an array of sources of server-delivered html files.
  htmlServerFiles: [
    './server/**/*.html'
  ],

  // jadeServerFiles is an array of sources of server-delivered jade files.
  jadeServerFiles: [
    './server/**/*.jade'
  ],

  // jsBuildFiles is an array of javascript build files that are to be watched
  // for changes when running the development server.
  jsBuildFiles: [
    './config/**/*.js',
    './gulpfile.js',
    './tasks/**/*.js'
  ],

  // jsClientFiles is an array of javascript files that are targetted towards
  // the browser.  app.js is loaded first to guarantee initialization.
  jsClientFiles: [
    './public/js/app.js',
    './public/js/**/*.js',
    '!./public/js/vendor/**/*.js'
  ],

  // jsServerFiles is an array of javascript files that are targetted for
  // execution on the server by node.
  jsServerFiles: [
    './server/**/*.js',
    '.bin/www'
  ],

  // miscFiles is an array of sources that should be sent to the server.
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
   * Vendor files do not include application files -- non-vendor files.
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

  // jsNoLintFiles is an array of sources that should not be linted.
  jsNoLintFiles: [
    '!./public/js/vendor{,/**}'
  ],

  // source: './',

  // temp is the path to the temp directory
  temp: path.join(__dirname, '../temp/'),

  // testFiles is an array of sources for test files.
  testFiles: [
    './test/**/*.js'
  ]
};

/** @param {Array} buildConfig.herokuSlugFiles - Slug static files. */
buildConfig.herokuSlugFiles = [
  buildConfig.build + '*',
  buildConfig.build + '**/*'
];

/** @param {Array} buildConfig.jsFiles - Combine all js files. */
buildConfig.jsFiles = [].concat(
  buildConfig.jsBuildFiles,
  buildConfig.jsClientFiles,
  buildConfig.jsServerFiles
);

/** @param {Array} buildConfig.lintFiles - Create list of lintable jsfiles. */
buildConfig.jsLintFiles = [].concat(
  buildConfig.jsFiles,
  buildConfig.jsNoLintFiles
);

/** @param {Object} module.exports - Export build configuration. */
module.exports = buildConfig;
