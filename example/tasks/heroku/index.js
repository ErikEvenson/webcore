/**
 * Provides gulp Heroku tasks.
 *
 * Heroku API reference:
 * https://devcenter.heroku.com/articles/platform-api-reference
 *
 * node-heroku-client docs:
 * https://github.com/heroku/node-heroku-client/tree/master/docs
 *
 * @param {object} gulp - The gulp object.
 * @param {object} config - The configuration object.
*/
module.exports = function(gulp, config) {
  var
    argv = require('yargs').argv,
    async = require('async'),
    fs = require('fs'),
    gzip = require('gulp-gzip'),
    Heroku = require('heroku-client'),
    heroku = new Heroku({token: config.env.HEROKU_API_TOKEN}),
    lib = require('./lib'),
    request = require('request'),
    Stream = require('stream'),
    tar = require('gulp-tar'),
    url = require('url');

  function getApp(options) {
    var
      appName = options.appName,
      instance = options.instance;

    // Guard clauses
    if (instance) {
      appName = config.build.instances[instance];
      if (!appName) { return null; }
    }

    app = heroku.apps(appName);
    return app;
  }

  // Adapted from:
  // stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
  function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
  }

  // Deploy build to a source URL
  gulp.task('heroku-deploy', function(cb) {
    var app = getApp({
      appName: argv.app,
      instance: instance
    });

    if (!app) {
      console.error('An app must be provided.');
      return;
    }

    async.waterfall([
      function(cb) {
        lib.deploySource(app, config, cb);
      },
      function(source, cb) {
        getUrl = source.source_blob.get_url;
        lib.createBuild(app, getUrl, cb);
      }
    ], function(err, result) {
      if (err) {
        console.log(err.body.message);
        cb();
      } else {
        console.log(result);
        cb();
      }
    });
  });

  gulp.task('heroku-backup', function(cb) {
    var app = getApp({
      appName: argv.app,
      instance: instance
    });

    var options = {
      app: app,
      config: config,
      instance: argv.instance
    };

    lib.backup(options, function(err, stdout, stderr) {
      if (err) { console.error(err.message); cb(); }
      else {
        console.info(stdout);
        console.error(stderr);
        cb();
      }
    });
  });

  gulp.task('heroku-copy', function(cb) {
    var
      fromInstance = argv.from,
      toInstance = argv.to;

    var fromApp = getApp({ instance: fromInstance });
    var toApp = getApp({ instance: toInstance });
    var fromUri = null;

    async.series([
      function(cb) {
        lib.getInstanceUri({
          app: fromApp,
          config: config,
          instance: fromInstance
        }, function(err, result) {
          fromUri = result;
          cb(err, fromUri);
        });
      },
      function(cb) {
        var options = {
          app: fromApp,
          config: config,
          instance: fromInstance
        };

        lib.backup(options, function(err, stdout, stderr) {
          if (err) { console.error(err.message); cb(); }
          else {
            cb(null, {
              stdout: stdout,
              stderr: stderr
            });
          }
        });
      },
      function(cb) {
        var options = {
          app: toApp,
          config: config,
          dir: fromUri.split('/').slice(-1)[0],
          instance: toInstance
        };

        cb(null, options);

        lib.restore(options, function(err, stdout, stderr) {
          if (err) { console.error(err.message); cb(); }
          else {
            cb(null, {
              stdout: stdout,
              stderr: stderr
            });
          }
        });
      }
    ], function(err, results) {
      var output = results[2];
      console.error(output.stderr);
      console.info(output.stdout);
    });
  });

  gulp.task('heroku-restore', function(cb) {
    var app = getApp({
      appName: argv.app,
      instance: instance
    });

    var options = {
      app: app,
      dir: argv.dir,
      config: config,
      instance: argv.instance
    };

    lib.restore(options, function(err, stdout, stderr) {
      if (err) { console.error(err.message); cb(); }
      else {
        console.info(stdout);
        console.error(stderr);
        cb();
      }
    });
  });

  // Deploy an app setup
  gulp.task('heroku-setup', ['heroku-tarball'], function(cb) {
    var getUrl;

    async.waterfall([
      // Create AWS url
      function(cb) {
        var
          AWS = require('aws-sdk'),
          key = uuid() + '/' + config.build.TARFILE_NAME + '.gz',
          params,
          s3;

        AWS.config.update({
          accessKeyId: config.env.AWS_ACCESS_KEY_ID,
          region: config.aws.region,
          secretAccessKey: config.env.AWS_SECRET_ACCESS_KEY
        });

        s3 = new AWS.S3({computeChecksums: true});
        params = {Bucket: 'eeegen', Key: key};

        s3.getSignedUrl('putObject', params, function(err, putUrl) {
          cb(err, putUrl);
        });
      },
      // PUT tarball
      function(putUrl, cb) {
        var file = config.build.temp + config.build.TARFILE_NAME + '.gz';

        lib.putFile(file, putUrl, function(err) {
          if (err) { cb(err); } else { cb(null, putUrl.split('?')[0]); }
        });
      },
      function(getUrl, cb) {
        var attributes = { source_blob: { url: getUrl } };
        heroku.appSetups().create(attributes, cb);
      }
    ], function(err, result) {
      if (err) {
        console.log(err.body.message);
        cb();
      } else {
        console.log(result);
        cb();
      }
    });
  });

  gulp.task('heroku-tarball', function(cb) {
    lib.createTarball(config, cb);
  });

  // heroku API
  // add on
  gulp.task('heroku-addonsCreate', function(cb) {
    heroku.apps(argv.app).addons().create(
      {
        config: argv.config,
        plan: argv.plan
      },
      function(err, result) {
        if (err) {
          console.log(err.body.message);
          cb();
        } else {
          console.log(result);
          cb();
        }
      }
    );
  });

  gulp.task('heroku-appsInfo', function(cb) {
    heroku.apps(argv.app).info(
      function(err, result) {
        if (err) {
          console.log(err.body.message);
          cb();
        } else {
          console.log(result);
          cb();
        }
      }
    );
  });

  // appSetups
  gulp.task('heroku-appSetupsInfo', function(cb) {
    heroku.appSetups(argv.id).info(function(err, result) {
      if (err) {
        console.log(err.body.message);
        cb();
      } else {
        console.log(result);
        cb();
      }
    });
  });

  gulp.task('heroku-appsList', function(cb) {
    heroku.apps().list(function(err, apps) {
      if (err) {
        console.log(err.body.message);
        cb();
      } else {
        apps.forEach(function(app) {
          console.log(app.name);
        });

        cb();
      }
    });
  });

  // buildResult
  gulp.task('heroku-buildsResultInfo', function(cb) {
    var app = getApp({
      appName: argv.app,
      instance: instance
    });

    if (!app) {
      console.error('An app must be provided.');
      return;
    }

    app.builds(argv.id).info(
      function(err, result) {
        if (err) {
          console.log(err.body.message);
          cb();
        } else {
          console.log(result);
          cb();
        }
      }
    );
  });

  // configVars
  gulp.task('heroku-configVarsInfo', function(cb) {
    var app = getApp({
      appName: argv.app,
      instance: instance
    });

    if (!app) {
      console.error('An app must be provided.');
      return;
    }

    app.configVars().info(
      function(err, result) {
        if (err) {
          console.log(err.body.message);
          cb();
        } else {
          console.log(result);
          cb();
        }
      }
    );
  });

  // gulp.task('heroku-configVarsUpdate', function(cb) {
  //   var app = getApp();

  //   if (!app) {
  //     console.error('An app must be provided.');
  //     return;
  //   }

  //   app.configVars().update(
  //     {

  //     },
  //     function(err, result) {
  //       if (err) {
  //         console.log(err.body.message);
  //         cb();
  //       } else {
  //         console.log(result);
  //         cb();
  //       }
  //     }
  //   );
  // });
};
