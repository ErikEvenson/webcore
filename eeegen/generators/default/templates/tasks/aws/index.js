/**
 * Provides gulp AWS tasks.
 *
 * @param {object} gulp - The gulp object.
 * @param {object} config - The configuration object.
*/
module.exports = function(gulp, config) {
  var
    argv = require('yargs').argv,
    lib = require('./lib')(config);

  gulp.task('aws-s3-clearBucket', function(cb) {
    lib.clearBucket(argv.name, function(err, data) {
      if (err) {
        console.log(err);
        cb();
      } else {
        console.log(data);
        cb();
      }
    });
  });

  gulp.task('aws-s3-bucketsList', function(cb) {
    lib.listBuckets(function(err, data) {
      if (err) {
        console.log(err);
        cb();
      } else {
        console.log(data);
        cb();
      }
    });
  });

  gulp.task('aws-s3-createBucket', function(cb) {
    lib.createBucket(argv.name, function(err, result) {
      if (err) {
        console.log(err);
        cb();
      } else {
        console.log(result);
        cb();
      }
    });
  });

  gulp.task('aws-s3-objectsList', function(cb) {
    lib.listObjects(argv.name, function(err, data) {
      if (err) {
        console.log(err);
        cb();
      } else {
        console.log(data);
        cb();
      }
    });
  });

  // gulp.task('aws-s3-test', function(cb) {
  //   lib.test(argv.name, function(err, result) {
  //     if (err) {
  //       console.log(err);
  //       cb();
  //     } else {
  //       console.log(result);
  //       cb();
  //     }
  //   });
  // });

};
