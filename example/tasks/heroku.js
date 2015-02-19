module.exports = function(gulp, config){
  var
    argv     = require('yargs').argv,
    async    = require('async'),
    fs       = require('fs'),
    gzip     = require('gulp-gzip'),
    Heroku   = require('heroku-client'),
    heroku   = new Heroku({token: config.env.HEROKU_API_TOKEN}),
    request  = require('request'),
    tar      = require('gulp-tar'),
    url      = require('url');

  gulp.task('heroku-deploy', ['heroku-tarball'], function(cb){
    app = argv.app;

    async.waterfall([
      // Create source
      function(cb){
        console.log('Creating upload source...');

        heroku.apps(app).sources().create(
          {},
          function(err, source){
            if (err){ cb(err); } else { cb(null, source); }
          }
        );
      },
      // PUT tarball
      function(source, cb){
        console.log('Uploading tarball...');
        putUrl = source.source_blob.put_url;
        urlObj = url.parse(putUrl);
        
        fs.readFile(config.build.temp + 'archive.tar.gz', function(err, data){
          if (err){ cb(err); }
          else {
            options = {
              body   : data,
              method : 'PUT',
              url    : urlObj
            };

            request(options, function(err, incoming, response){
              if (err){ cb(err); } else { cb(null, source); }
            });
          }
        });
      },
      // Create build
      function(source, cb){
        console.log('Building app...');

        heroku.apps(app).builds().create(
          {
            source_blob: {
              url: source.source_blob.get_url
            }
          },
          function(err, result) {
            if (err) { cb(err); } else { cb(null, result); }
          }
        );
      }
    ], function(err, result){
      if (err) {
        console.log(err.body.message);
        cb();
      } else {
        console.log('Build deployed.');
        cb();
      }
    });
  });

  gulp.task('heroku-tarball', function() {
    return gulp.src(config.build.build + '*')
      .pipe(tar('archive.tar'))
      .pipe(gzip())
      .pipe(gulp.dest(config.build.temp));
  });

  // heroku API
  // app
  gulp.task('heroku-appsCreate', function(cb){
    heroku.apps().create(
      {
        name: argv.app
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

  gulp.task('heroku-appsDelete', function(cb){
    heroku.apps(argv.app).delete(
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

  gulp.task('heroku-appsInfo', function(cb){
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

  gulp.task('heroku-appsList', function(cb){
    heroku.apps().list(function (err, apps) {
      if (err) {
        console.log(err.body.message);
      } else {
        apps.forEach(function(app){
          console.log(app.name);
        });

        cb();
      }
    });
  });

  // build
  gulp.task('heroku-buildsCreate', function(cb){
    heroku.apps(argv.app).builds().create(
      {
        source_blob: {
          url: argv.geturl
        }
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

  // source
  gulp.task('heroku-sourcesCreate', function(cb){
    heroku.apps(argv.app).sources().create(
      {},
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
