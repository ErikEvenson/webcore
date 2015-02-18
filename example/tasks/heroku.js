module.exports = function(gulp, config){
  var
    argv     = require('yargs').argv,
    async    = require('async'),
    fs       = require('fs'),
    gzip     = require('gulp-gzip'),
    Heroku   = require('heroku-client'),
    heroku   = new Heroku({token: config.env.HEROKU_API_TOKEN}),
    request = require('request'),
    shell    = require('gulp-shell'),
    tar      = require('gulp-tar'),
    url      = require('url');

  gulp.task('heroku-deploy', function(cb){
    request.debug = true;
    app = argv.app

    async.waterfall([
      // Create source
      function(cb){
        heroku.apps(app).sources().create(
          {},
          function(err, source){
            if (err){
              cb(err);
            } else {
              cb(null, source);
            }
          }
        );
      },
      // PUT tarball
      function(source, cb){
        putUrl = source.source_blob.put_url;
        urlObj = url.parse(putUrl);

        options = {
          headers: {},
          method : 'PUT',
          url    : urlObj
        }

        // console.log('OPTIONS: ', options);
        // cb(null, source);
        
        fs.createReadStream(config.build.temp + 'archive.tar.gz')
          .pipe(request(
            options, 
            function(err, incoming, response){
              console.log(err, response);

              console.log(incoming.headers);

              if (err){
                cb(err);
              } else {
                cb(null, source);
              }
            }
          ));
      },
      // Create build
      function(source, cb){
        cb(null, 'create build...');
      }
    ], function(err, result){
      if (err) {
        console.log(err.body.message);
        cb();
      } else {
        console.log(result);
        cb();
      }
    });
  });

// { source_blob: 
//    { get_url: 'https://s3-external-1.amazonaws.com/heroku-sources-production/heroku.com/2c6641c3-af40-4d44-8cdb-c44ee5f670c2?AWSAccessKeyId=AKIAJURUZ6XB34ESX54A&Signature=hYYNQ1WjwHqyyO0QMtjVXYBvsJg%3D&Expires=1424156543',
//      put_url: 'https://s3-external-1.amazonaws.com/heroku-sources-production/heroku.com/2c6641c3-af40-4d44-8cdb-c44ee5f670c2?AWSAccessKeyId=AKIAJURUZ6XB34ESX54A&Signature=ecj4bxLnQL%2FZr%2FSKx6URJMr6hPk%3D&Expires=1424156543'
//    }
// }

// > PUT /heroku-sources-production/heroku.com/752fdf90-c30b-42f1-8639-6a49affe2913?AWSAccessKeyId=AKIAJURUZ6XB34ESX54A&Signature=1Hvh5B6BfSU5Hs0Xrw9Cr2bvbSU%3D&Expires=1424207671 HTTP/1.1
// > User-Agent: curl/7.35.0
// > Host: s3-external-1.amazonaws.com
// > Accept: */*
// > Content-Length: 851
// > 
// } [data not shown]
// * upload completely sent off: 851 out of 851 bytes
// < HTTP/1.1 200 OK
// < x-amz-id-2: gsgXK/MAD3CC49gizlJW8tKQMKFgKypgxNTn3iDnZT9LK+XNjtyU5Mkrkt3FYeuIWbXnLt8ntMw=
// < x-amz-request-id: F57681A6CD756E29
// < Date: Tue, 17 Feb 2015 20:15:02 GMT
// < ETag: "495bb30fd134e4274de2c18f55e767f3"
// < Content-Length: 0
// * Server AmazonS3 is not blacklisted
// < Server: AmazonS3
// < 

// REQUEST { url: 
//    { protocol: 'https:',
//      slashes: true,
//      auth: null,
//      host: 's3-external-1.amazonaws.com',
//      port: null,
//      hostname: 's3-external-1.amazonaws.com',
//      hash: null,
//      search: '?AWSAccessKeyId=AKIAJURUZ6XB34ESX54A&Signature=XdB3WSC7dMrP5%2B71c0UZsCOBBzc%3D&Expires=1424208069',
//      query: 'AWSAccessKeyId=AKIAJURUZ6XB34ESX54A&Signature=XdB3WSC7dMrP5%2B71c0UZsCOBBzc%3D&Expires=1424208069',
//      pathname: '/heroku-sources-production/heroku.com/4cca2ad6-ca43-4295-819d-694430fea113',
//      path: '/heroku-sources-production/heroku.com/4cca2ad6-ca43-4295-819d-694430fea113?AWSAccessKeyId=AKIAJURUZ6XB34ESX54A&Signature=XdB3WSC7dMrP5%2B71c0UZsCOBBzc%3D&Expires=1424208069',
//      href: 'https://s3-external-1.amazonaws.com/heroku-sources-production/heroku.com/4cca2ad6-ca43-4295-819d-694430fea113?AWSAccessKeyId=AKIAJURUZ6XB34ESX54A&Signature=XdB3WSC7dMrP5%2B71c0UZsCOBBzc%3D&Expires=1424208069' },
//   method: 'PUT',
//   headers: {},
//   callback: [Function],
//   uri: undefined }

  gulp.task('heroku-puttest', shell.task([
    "curl '" + argv.puturl + "' -X PUT -H 'Content-Type:' --data-binary @temp/archive.tar.gz"
  ]))

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
