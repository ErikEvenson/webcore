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

  // Configure app
  function configureApp(app, configVars, cb) {
    heroku.apps(app).configVars().update(
      configVars,
      function(err, result) {
        if (err) { cb(err); } else { cb(null, result); }
      }
    );
  }

  // Create app
  function createApp(app, cb) {
    heroku.apps().create(
      {
        name: app
      },
      function(err, result) {
        if (err) { cb(err); } else { cb(null, result); }
      }
    );
  }

  // Create build
  function createBuild(app, getUrl, cb) {
    heroku.apps(app).builds().create(
      {
        source_blob: {
          url: getUrl
        }
      },
      function(err, result) {
        if (err) { cb(err); } else { cb(null, result); }
      }
    );
  }

  // Create a source for an app
  function createSource(app, cb) {
    heroku.apps(app).sources().create(
      {},
      function(err, source) {
        if (err) { cb(err); } else { cb(null, source); }
      }
    );
  }

  function gulpCallback(obj) {
    var stream = new Stream.Transform({objectMode: true});

    stream._transform = function(file, unused, callback) {
      obj();
      callback(null, file);
    };

    return stream;
  }

  // PUT file to a URL
  function putFile(file, putUrl, cb) {
    var urlObj = url.parse(putUrl);

    fs.readFile(file, function(err, data) {
      if (err) { cb(err); }
      else {
        var options = {
          body: data,
          method: 'PUT',
          url: urlObj
        };

        request(options, function(err, incoming, response) {
          if (err) { cb(err); } else { cb(null); }
        });
      }
    });
  }

  // Create Heroku app
  gulp.task('heroku-createApp', function(cb) {
    var
      app = argv.app,
      instance = argv.instance;

    // Guard clauses
    if (!app) {
      console.error('A name must be provided.');
      return;
    }

    // Create
    async.waterfall([
      // Create app
      function(cb) {
        console.log('Creating app...');
        createApp(app, cb);
      },
      // Set configVars
      function(result, cb) {
        var configVars = {};

        if (instance) {
          configVars.NODE_ENV = instance;
        }

        console.log('Configuring app...');
        configureApp(app, configVars, cb);
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
      app = argv.app,
      instance = argv.instance,
      options = {};

    // Guard clauses
    if (instance) {
      app = config.build.instances[instance];

      if (!app) {
        console.error('The ' + instance + ' instance has not been configured.');
        return;
      }
    }

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

  gulp.task('heroku-tarball', function() {
    return gulp.src([config.build.build + '*', config.build.build + '**/*'])
      .pipe(tar(ARCHIVE_NAME))
      .pipe(gzip())
      .pipe(gulp.dest(config.build.temp));
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

  // // app
  // gulp.task('heroku-appsCreate', function(cb) {
  //   heroku.apps().create(
  //     {
  //       name: argv.app
  //     },
  //     function(err, result) {
  //       if (err) {
  //         console.log(err.body.message);
  //       } else {
  //         console.log(result);
  //       }
  //       cb();
  //     }
  //   );
  // });

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
