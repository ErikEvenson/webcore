/**
 * Provides gulp serving tasks.
 *
 * @param {object} gulp - The gulp object.
 * @param {object} config - The configuration object.
*/
module.exports = function(gulp, config) {
  var
    debug = require('debug')(__filename),
    path = require('path'),
    server = require('gulp-develop-server');

  var
    app = path.join(config.build.basepath, 'bin/www.js');

  gulp.task('server:start', function() {
    server.listen({path: app});
  });

  gulp.task('server:restart', function() {
    gulp.watch([app], server.restart);
  });
};

