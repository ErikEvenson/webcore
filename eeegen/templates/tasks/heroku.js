module.exports = function(gulp, config){
  var
    Heroku = require('heroku-client'),
    heroku = new Heroku({token: process.env.HEROKU_API_TOKEN});

  gulp.task('heroku-createApp', function(cb){
    heroku.apps().create({}, function(err, app){
      console.log(app);
      cb(err);
    });
  });

  gulp.task('heroku-listApps', function(cb){
    heroku.apps().list(function (err, apps) {
      apps.forEach(function(app){
        console.log(app.name);
      });

      cb(err);
    });
  });
}