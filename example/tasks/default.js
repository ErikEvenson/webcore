/**
 * Provides gulp default tasks.
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

  // Show project information
  debug(config.pkg.name + ' ' + config.pkg.version);

  gulp.task('default', ['server:start'], function() {
    var watcher = gulp.watch(config.build.jsfiles, ['lint', 'server:restart']);

    watcher.on('change', function(e) {
      console.log('File ' + e.path + ' was ' + e.type + ', running tasks...');
    });
  });
};
