var
  async = require('async'),
  fs = require('fs'),
  gzip = require('gulp-gzip'),
  request = require('request'),
  Stream = require('stream'),
  tar = require('gulp-tar'),
  url = require('url');

var lib = {
  addAddOns: function addAddOns(app, addons, cb) {
    async.each(
      addons,
      function(addon, cb) {
        app.addons().create(
          addon,
          cb
        );
      },
      function(err, results) {
        if (err) { cb(err); } else { cb(null, results); }
      }
    );
  },
  configureApp: function configureApp(app, configVars, cb) {
    app.configVars().update(
      configVars,
      function(err, result) {
        if (err) { cb(err); } else { cb(null, result); }
      }
    );
  },
  createApp: function createApp(name, cb) {
    app.create(
      {
        name: name
      },
      function(err, result) {
        if (err) { cb(err); } else { cb(null, result); }
      }
    );
  },
  createBuild: function createBuild(app, getUrl, cb) {
    app.builds().create(
      {
        source_blob: {
          url: getUrl
        }
      },
      function(err, result) {
        if (err) { cb(err); } else { cb(null, result); }
      }
    );
  },
  createSource: function createSource(app, cb) {
    app.sources().create(
      {},
      function(err, source) {
        if (err) { cb(err); } else { cb(null, source); }
      }
    );
  },
  gulpCallback: function gulpCallback(obj) {
    var stream = new Stream.Transform({objectMode: true});

    stream._transform = function(file, unused, callback) {
      obj();
      callback(null, file);
    };

    return stream;
  },
  putFile: function putFile(file, putUrl, cb) {
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
};

/** @param {Object} module.exports - Export library functions. */
modules.exports = lib;
