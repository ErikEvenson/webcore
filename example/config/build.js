/**
 * Provides build parameters.
*/
module.exports = {
  source: './',
  build: './build/',

  miscFiles: [
    './server/**/*.js',
    'app.json',
    'package.json',
    'Procfile'
  ],

  temp: './temp/'
};
