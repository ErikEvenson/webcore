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
    app = path.join(config.build.basepath, 'bin/www');

  // Show project information
  debug(config.pkg.name + ' ' + config.pkg.version);

  gulp.task('default', ['browserify', 'wiredep', 'server:start'],
    function() {
      var jadeWatcher = gulp.watch(
        config.build.jadeServerFiles,
        ['jadeServer', 'server:restart']
      );

      var jsWatcher = gulp.watch(
        [config.build.jsClientFiles, config.build.jsServerFiles],
        ['browserify', 'lint', 'server:restart']
      );

      function notify(e) {
        console.log('File ' + e.path + ' was ' + e.type + ', running tasks...');
      }

      jadeWatcher.on('change', function(e) {
        notify(e);
      });

      jsWatcher.on('change', function(e) {
        notify(e);
      });
    }
  );
};
