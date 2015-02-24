/**
 * Provides gulp Heroku tasks.
 *
 * @param {object} gulp - The gulp object.
 * @param {object} config - The configuration object.
*/
module.exports = function(gulp, config) {
  var
    ARCHIVE_NAME = 'archive.tar',

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

  // Deploy build to a source URL
  gulp.task('heroku-deploy', function(cb) {
    var
      app,
      name,
      instance = argv.instance;

    // Guard clauses
    if (instance) {
      app = config.build.instances[instance];

      if (!app) {
        console.error('The ' + instance + ' instance has not been configured.');
        return;
      }
    } else {
      app = argv.app;
    }

    name = app;
    app = heroku.apps(app);

    if (!app) {
      console.error('An app must be provided for the deployment.');
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
        console.log(name + ' deployed.');
        cb();
      }
    });
  });

  // Deploy build to a source URL
  gulp.task('heroku-setup', function(cb) {
    var
      app,
      name,
      getUrl,
      instance = argv.instance;

    // // Guard clauses
    // if (instance) {
    //   app = config.build.instances[instance];

    //   if (!app) {
    //     console.error('The ' + instance + ' instance has not been configured.');
    //     return;
    //   }
    // } else {
    //   app = argv.app;
    // }

    // name = app;
    // app = heroku.apps(app);

    // if (!app) {
    //   console.error('An app must be provided for the deployment.');
    //   return;
    // }

    async.waterfall([
      function(cb) {
        var
          attributes = {},
          // getUrl = source.source_blob.get_url;
          getUrl = "https://dl.dropboxusercontent.com/u/6779408/Temporary/archive.tar.gz";

        attributes = {
          source_blob: {
            url: getUrl
          }
        }
        console.log(attributes);

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

  // // Create Heroku app
  // gulp.task('heroku-createApp', function(cb) {
  //   var
  //     app,
  //     name = argv.app,
  //     instance = argv.instance,
  //     webUrl;

  //     addOns = [
  //       { plan: 'mongolab' }
  //     ];

  //   // Create
  //   async.waterfall([
  //     // Create app
  //     function(cb) {
  //       console.log('Creating app...');
  //       lib.createApp(name, heroku, cb);
  //     },
  //     // Set configVars
  //     function(result, cb) {
  //       var configVars = {};
  //       app = heroku.apps(result.name);
  //       name = result.name;
  //       webUrl = result.webUrl;

  //       if (instance) {
  //         configVars.NODE_ENV = instance;
  //       }

  //       console.log('Configuring app...');
  //       lib.configureApp(app, configVars, cb);
  //     },
  //     // Add addons
  //     function(result, cb) {
  //       console.log('Adding addons...');
  //       lib.addAddOns(app, addOns, cb);
  //     }
  //   ], function(err, result) {
  //     if (err) {
  //       console.log(err.body.message);
  //       cb();
  //     } else {
  //       console.log(name + ' created and configured at ' + webUrl + '.');
  //       cb();
  //     }
  //   });
  // });

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
        } else {
          console.log(result);
        }
        cb();
      }
    );
  });

  gulp.task('heroku-appsInfo', function(cb) {
    heroku.apps(argv.app).info(
      function(err, result) {
        if (err) {
          console.log(err.body.message);
        } else {
          console.log(result);
        }
        cb();
      }
    );
  });

  gulp.task('heroku-appsList', function(cb) {
    heroku.apps().list(function(err, apps) {
      if (err) {
        console.log(err.body.message);
      } else {
        apps.forEach(function(app) {
          console.log(app.name);
        });

        cb();
      }
    });
  });

  // configVars
  gulp.task('heroku-configVarsInfo', function(cb) {
    heroku.apps(argv.app).configVars().info(
      function(err, result) {
        if (err) {
          console.log(err.body.message);
        } else {
          console.log(result);
        }
        cb();
      }
    );
  });
};
