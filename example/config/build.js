/**
 * Provides build parameters.
*/
module.exports = {
  source: './',
  build: './build/',

  instances: {
    production: null,
    staging: 'shielded-shore-8652'
  },

  jsfiles: [
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

  temp: './temp/'
};
