/**
 * Provides gulp AWS tasks.
 *
 * @param {object} gulp - The gulp object.
 * @param {object} config - The configuration object.
*/
module.exports = function(gulp, config) {
  var
    AWS = require('aws-sdk');

  gulp.task('aws-s3-bucketsList', function(cb) {
    AWS.config.update({
      accessKeyId: config.env.AWS_ACCESS_KEY_ID,
      region: config.aws.region,
      secretAccessKey: config.env.AWS_SECRET_ACCESS_KEY
    });

    var s3 = new AWS.S3(s3);

    s3.listBuckets(function(err, data) {
      if (err) {
        console.log('Error: ', err);
        cb();
      } else {
        for (var index in data.Buckets) {
          var bucket = data.Buckets[index];
          console.log('Bucket: ', bucket.Name, ' : ', bucket.CreationDate);
        }
        cb();
      }
    });
  });

  gulp.task('aws-s3-getPutUrl', function(cb) {
    AWS.config.update({
      accessKeyId: config.env.AWS_ACCESS_KEY_ID,
      region: config.aws.region,
      secretAccessKey: config.env.AWS_SECRET_ACCESS_KEY
    });

    var s3 = new AWS.S3({computeChecksums: true});
    var params = {Bucket: 'eeegen', Key: 'test'};
    var url = s3.getSignedUrl('putObject', params);
    console.log('The URL is: ', url);
  });

};

