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
    request = require('request'),
    Stream = require('stream'),
    tar = require('gulp-tar'),
    url = require('url');

  // Deploy build to a source URL
  gulp.task('heroku-deploySource', function(cb) {

  });

  // Create Heroku app
  gulp.task('heroku-createAppOld', function(cb) {
    var
      name = argv.app,
      instance = argv.instance;

      addOns = [
        { plan: 'mongolab' }
      ];

    // Create
    async.waterfall([
      // Create app
      function(cb) {
        console.log('Creating app...');
        createApp(name, cb);
      },
      // Set configVars
      function(result, cb) {
        var configVars = {};
        var app = heroku.app(name);

        if (instance) {
          configVars.NODE_ENV = instance;
        }

        console.log('Configuring app...');
        configureApp(app, configVars, cb);
      },
      // Add addons
      function(result, cb) {
        console.log('Adding addons...');
        addAddOns(app, addOns, cb);
      }
    ], function(err, result) {
      if (err) {
        console.log(err.body.message);
        cb();
      } else {
        console.log(app + ' created and configured.');
        cb();
      }
    });
  });

  // Deploy to Heroku
  gulp.task('heroku-deploy', function(cb) {
    var
      app,
      instance = argv.instance,
      options = {};

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

    app = heroku.app(app);

    if (!app) {
      console.error('An app must be provided for the deployment.');
      return;
    }

    // Deploy
    async.waterfall([
      // Create tarball
      function(cb) {
        console.log('Creating tarball...');

        gulp.src([config.build.build + '*', config.build.build + '**/*'])
          .pipe(tar(ARCHIVE_NAME))
          .pipe(gzip())
          .pipe(gulp.dest(config.build.temp))
          .pipe(gulpCallback(cb));
      },

      // Create upload source
      function(cb) {
        console.log('Creating upload source...');

        createSource(app, function(err, source) {
          options.source = source;
          if (err) { cb(err); } else { cb(null, options); }
        });
      },

      // PUT tarball
      function(options, cb) {
        var
          putUrl = options.source.source_blob.put_url,
          file = config.build.temp + ARCHIVE_NAME + '.gz';

        console.log('Uploading tarball...');

        putFile(file, putUrl, function(err) {
          if (err) { cb(err); } else { cb(null, options); }
        });
      },

      // Create build
      function(options, cb) {
        var getUrl = options.source.source_blob.get_url;
        console.log('Building app...');
        createBuild(app, getUrl, cb);
      }
    ], function(err, result) {
      if (err) {
        console.log(err.body.message);
        cb();
      } else {
        console.log('Build deployed to ' + app + '.');
        cb();
      }
    });
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
