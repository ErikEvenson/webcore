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

  miscFiles: [
    './server/**/*.js',
    'app.json',
    'package.json',
    'Procfile'
  ],

  temp: './temp/'
};
