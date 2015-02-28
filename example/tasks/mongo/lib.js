/**
 * @param {Function} config - Provide configuration hash.
 * @return {Object} - Export the lib hash of mongo functions.
 */
module.exports = function(config) {
  var
    async = require('async'),
    utils = require('mongo-utils'),
    mongoose = require('mongoose');

  var seed = function seed(cb) {
    var appConfig = require(
      config.build.basepath + '/server/config/environment'
    );

    require(config.build.basepath + '/server/lib/connection')(appConfig);
    require(config.build.basepath + '/server/models');

    var data = {
      organizations: [
        { name: 'Acme Space' }
      ]
    };

    var addOrganizations = function(cb) {
      var Organization = mongoose.model('Organization');

      Organization.create(data.organizations, function(err) {
        cb(err);
      });
    };

    async.series([
      addOrganizations
    ], function(err, results) {
      if (err) { cb(err); }
      else {
        var Organization = mongoose.model('Organization');

        Organization.find().find(function(err, results) {
          mongoose.connection.close();
          cb(null, results);
        });
      }
    });
  };

  var lib = {
    seed: seed
  };

  return lib;
};
