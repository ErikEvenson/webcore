/**
 * @param {Function} config - Provide configuration hash.
 * @return {Object} - Export the lib hash of AWS functions.
 */
module.exports = function(config) {
  var
    AWS = require('aws-sdk'),
    s3;

  AWS.config.update({
    accessKeyId: config.env.AWS_ACCESS_KEY_ID,
    region: config.aws.region,
    secretAccessKey: config.env.AWS_SECRET_ACCESS_KEY
  });

  s3 = new AWS.S3(s3);

  var clearBucket = function clearBucket(bucketName, cb) {
    var items;
    var objects = [];

    listObjects(bucketName, function(err, data) {
      if (err) { return cb(err); }
      else {
        items = data.Contents;

        if (items.length === 0) {
          return cb(null, 'Empty bucket.');
        }

        for (var i = 0; i < items.length; i += 1) {
          objects.push({
            Key: items[i].Key
          });
        }

        deleteObjects(bucketName, objects, function(err, data) {
          return cb(err, data);
        });
      }
    });
  };

  var createBucket = function createBucket(bucketName, cb) {
    s3.createBucket({
      Bucket: bucketName
    }, cb);
  };

  var deleteObject = function deleteObject(bucketName, objectName, cb) {
    s3.createBucket({
      Bucket: bucketName
    }, cb);
  };

  var deleteObjects = function deleteObjects(bucketName, objects, cb) {
    s3.deleteObjects({
      Bucket: bucketName,

      Delete: {
        Objects: objects
      }
    }, cb);
  };

  var listBuckets = function listBuckets(cb) {
    s3.listBuckets(cb);
  };

  var listObjects = function listObjects(bucketName, cb) {
    s3.listObjects({
      Bucket: bucketName
    }, cb);
  };

  // var test = function test(bucketName, cb) {
  //   s3.getBucketPolicy({
  //     Bucket: bucketName
  //   }, cb);
  // };

  var lib = {
    clearBucket: clearBucket,
    createBucket: createBucket,
    deleteObject: deleteObject,
    deleteObjects: deleteObjects,
    listBuckets: listBuckets,
    listObjects: listObjects
    // test: test
  };

  return lib;
};
