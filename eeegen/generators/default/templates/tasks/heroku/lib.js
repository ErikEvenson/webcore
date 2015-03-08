var
  _ = require('underscore'),
  async = require('async'),
  fs = require('fs'),
  gulp = require('gulp'),
  gzip = require('gulp-gzip'),
  mongoUtils = require('mongo-utils'),
  mongoose = require('mongoose'),
  request = require('request'),
  Stream = require('stream'),
  tar = require('gulp-tar'),
  url = require('url');

function backupUri(options, cb) {
  var
    dir = options.dir,
    uri = options.uri;

  mongoUtils.dumpDatabase(
    uri, dir, function(err, stdout, stderr) {
      return cb(err, stdout, stderr);
    });
}

function restoreUri(options, cb) {
  var
    dir = options.dir,
    uri = options.uri;

  mongoUtils.restoreDatabase(
    uri, dir, function(err, stdout, stderr) {
      return cb(err, stdout, stderr);
    });
}

var getInstanceUri = function getInstanceUri(options, cb) {
  var
    app = options.app,
    config = options.config,
    instance = options.instance;

  if (instance === 'development') {
    var appConfig = require(
      config.build.basepath + '/server/config/environment'
    );

    return cb(null, appConfig.mongo.uri);
  } else {
    var configVars = getConfigVars(app, function(err, result) {
      if (err) { cb(err); return; }
      else {
        return cb(null, result.MONGOLAB_URI);
      }
    });
  }
};

var backup = function backup(options, cb) {
  var
    app = options.app,
    config = options.config,
    instance = options.instance;

  if (!instance) { cb(new Error('No instance provided')); return; }

  var instances = Object.keys(config.build.instances);
  instances.push('development');

  if (instances.indexOf(instance) === -1) {
    return cb(new Error('That instance does not exist.'));
  }

  getInstanceUri(options, function(err, uri) {
    if (err) { cb(err); return; }
    else {
      backupUri(
        {
          dir: config.build.temp,
          uri: uri
        },
        function(err, stdout, stderr) {
          return cb(err, stdout, stderr);
        }
      );
    }
  });
};

var restore = function restore(options, cb) {
  var
    app = options.app,
    dir = options.dir,
    config = options.config,
    instance = options.instance;

  if (!instance) { cb(new Error('No instance provided')); return; }

  var instances = Object.keys(config.build.instances);
  instances.push('development');

  if (instances.indexOf(instance) === -1) {
    return cb(new Error('That instance does not exist.'));
  }

  getInstanceUri(options, function(err, uri) {
    if (err) { cb(err); return; }
    else {
      restoreUri(
        {
          dir: config.build.temp + '/' + options.dir,
          uri: uri
        },
        function(err, stdout, stderr) {
          return cb(err, stdout, stderr);
        }
      );
    }
  });
};

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
      if (err) { return cb(err); } else { return cb(null, results); }
    }
  );
};

var configureApp = function configureApp(app, configVars, cb) {
  app.configVars().update(
    configVars,
    function(err, result) {
      if (err) { return cb(err); } else { return cb(null, result); }
    }
  );
};

var createApp = function createApp(name, heroku, cb) {
  heroku.apps().create(
    {
      name: name
    },
    function(err, result) {
      if (err) { return cb(err); } else { return cb(null, result); }
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
      if (err) { return cb(err); } else { return cb(null, result); }
    }
  );
};

var createSource = function createSource(app, cb) {
  app.sources().create(
    {},
    function(err, source) {
      if (err) { return cb(err); } else { return cb(null, source); }
    }
  );
};

var createTarball = function createTarball(options, cb) {
  var
    config = options.config,
    instance = options.instance;

  var files = config.build.herokuSlugFiles;
  var instances = config.build.instances;

  if (instance && _.contains(_.keys(instances), instance)) {
    var instanceConfig = instances[instance];

    if (instanceConfig.awsS3Bucket) {
      files = files.concat(config.build.herokuSlugStaticFilesNegation);
    }
  }

  console.log('xxxx', files);

  gulp.src(files)
    .pipe(tar(config.build.TARFILE_NAME))
    .pipe(gzip())
    .pipe(gulp.dest(config.build.temp))
    .pipe(gulpCallback(cb));
};

var deploySource = function deploySource(app, config, instance, cb) {
  async.waterfall([
    // Create tarball
    function(cb) {
      createTarball({
        config: config,
        instance: instance
      }, cb);
    },
    // Create upload source
    function(cb) {
      createSource(app, function(err, source) {
        if (err) { return cb(err); } else { return cb(null, source); }
      });
    },
    // PUT tarball
    function(source, cb) {
      var
        putUrl = source.source_blob.put_url,
        file = config.build.temp + config.build.TARFILE_NAME + '.gz';

      putFile(file, putUrl, function(err) {
        if (err) { return cb(err); } else { return cb(null, source); }
      });
    }
  ], function(err, result) {
    if (err) { return cb(err); } else { return cb(null, result); }
  });
};

var getConfigVars = function getConfigVars(app, cb) {
  if (!app) { return cb(new Error('No app provided.')); }

  app.configVars().info(function(err, result) {
    return cb(err, result);
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
    if (err) { return cb(err); }
    else {
      var options = {
        body: data,
        method: 'PUT',
        url: urlObj
      };

      request(options, function(err, incoming, response) {
        if (err) { return cb(err); } else { return cb(null); }
      });
    }
  });
};

var lib = {
  addAddOns: addAddOns,
  backup: backup,
  configureApp: configureApp,
  createApp: createApp,
  createBuild: createBuild,
  createSource: createSource,
  createTarball: createTarball,
  deploySource: deploySource,
  getConfigVars: getConfigVars,
  getInstanceUri: getInstanceUri,
  gulpCallback: gulpCallback,
  putFile: putFile,
  restore: restore
};

/** @param {Object} module.exports - Export library functions. */
module.exports = lib;
