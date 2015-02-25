/**
 * Provides gulp mongo tasks.
 *
 * @param {object} gulp - The gulp object.
 * @param {object} config - The configuration object.
*/
module.exports = function(gulp, config) {
  var
    argv = require('yargs').argv,
    lib = require('./lib')(config);

    gulp.task('mongo-seed', function(cb) {
      lib.seed(function(err, result) {
        if (err) { console.error(err); cb(); }
        else { console.info(result); cb(); }
      });
    });

};
