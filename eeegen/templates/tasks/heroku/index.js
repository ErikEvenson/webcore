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

  // Adapted from:
  // stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
  function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
  }

  gulp.task('heroku-tarball', function(cb) {
    lib.createTarball(config, cb);
  });

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

  // Deploy an app setup
  gulp.task('heroku-setup', ['heroku-tarball'], function(cb) {
    var
      app,
      name,
      getUrl,
      instance = argv.instance;

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
