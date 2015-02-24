var
  async = require('async'),
  fs = require('fs'),
  gulp = require('gulp'),
  gzip = require('gulp-gzip'),
  request = require('request'),
  Stream = require('stream'),
  tar = require('gulp-tar'),
  url = require('url');

var addAddOns = function addAddOns(app, addons, cb) {
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
};

var configureApp = function configureApp(app, configVars, cb) {
  app.configVars().update(
    configVars,
    function(err, result) {
      if (err) { cb(err); } else { cb(null, result); }
    }
  );
};

var createApp = function createApp(name, heroku, cb) {
  heroku.apps().create(
    {
      name: name
    },
    function(err, result) {
      if (err) { cb(err); } else { cb(null, result); }
    }
  );
};

var createBuild = function createBuild(app, getUrl, cb) {
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
};

var createSource = function createSource(app, cb) {
  app.sources().create(
    {},
    function(err, source) {
      if (err) { cb(err); } else { cb(null, source); }
    }
  );
};

var createTarball = function createTarball(config, cb) {
  gulp.src([config.build.build + '*', config.build.build + '**/*'])
    .pipe(tar(config.build.TARFILE_NAME))
    .pipe(gzip())
    .pipe(gulp.dest(config.build.temp))
    .pipe(gulpCallback(cb));
};

var deploySource = function deploySource(app, config, cb) {
  async.waterfall([
    // Create tarball
    function(cb) {
      createTarball(config, cb);
    },
    // Create upload source
    function(cb) {
      createSource(app, function(err, source) {
        if (err) { cb(err); } else { cb(null, source); }
      });
    },
    // PUT tarball
    function(source, cb) {
      var
        putUrl = source.source_blob.put_url,
        file = config.build.temp + config.build.TARFILE_NAME + '.gz';

      putFile(file, putUrl, function(err) {
        if (err) { cb(err); } else { cb(null, source); }
      });
    }
  ], function(err, result) {
    if (err) {
      cb(err);
    } else {
      cb(null, result);
    }
  });
};

var gulpCallback = function gulpCallback(obj) {
  var stream = new Stream.Transform({objectMode: true});

  stream._transform = function(file, unused, callback) {
    obj();
    callback(null, file);
  };

  return stream;
};

var putFile = function putFile(file, putUrl, cb) {
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
};

var lib = {
  addAddOns: addAddOns,
  configureApp: configureApp,
  createApp: createApp,
  createBuild: createBuild,
  createSource: createSource,
  createTarball: createTarball,
  deploySource: deploySource,
  gulpCallback: gulpCallback,
  putFile: putFile
};

/** @param {Object} module.exports - Export library functions. */
module.exports = lib;
