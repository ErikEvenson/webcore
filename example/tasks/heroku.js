module.exports = function(gulp, config){
  var
    argv    = require('yargs').argv,
    buffer  = require('gulp-buffer'),
    fs      = require('fs'),
    gzip    = require('gulp-gzip'),
    Heroku  = require('heroku-client'),
    heroku  = new Heroku({token: config.env.HEROKU_API_TOKEN}),
    request = require('request'),
    tar     = require('gulp-tar');

  // NOT WORKING
  gulp.task('heroku-puttest', function(cb) {
    options = {
      url: argv.puturl,
      headers: {
        'Content-Type': null
      }
    }
    
    fs.createReadStream(config.build.temp + 'archive.tar.gz')
      // .pipe(process.stdout);
      .pipe(request.put(options, cb));
  });

  // gulp.task('heroku-deploy', ['heroku-tarball'], function(cb) {

  // });

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
          console.log(result)
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
          console.log(result)
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
          console.log(result)
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
          console.log(result)
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
          console.log(result)
        }
        cb();
      }
    );
  });
}
