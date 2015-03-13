/**
 * @param {Function} config - Provide configuration hash.
 * @return {Object} - Export the lib hash of AWS functions.
 */
module.exports = function(config) {
  var
    awspublish = require('gulp-awspublish'),
    parallelize = require('concurrent-transform');

  var syncS3Bucket = function syncS3Bucket(options) {
    var
      bucket = options.bucket,
      files = options.files,
      gulp = options.gulp,
      key = options.key,
      maxUploads = 20,
      region = options.region,
      secret = options.secret;

    // create a new publisher
    var publisher = awspublish.create({
      bucket: bucket,
      key: key,
      region: region,
      secret: secret
    });

    return gulp.src(files)
      .pipe(parallelize(publisher.publish(), maxUploads))
      .pipe(publisher.sync())
      .pipe(awspublish.reporter());
  };

  var lib = {
    syncS3Bucket: syncS3Bucket
  };

  return lib;
};
