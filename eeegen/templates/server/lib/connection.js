/**
 * @param {Object} config - Provide configuration.
 */
module.exports = function(config) {
  var mongoose = require('mongoose');
  mongoose.connect(config.mongo.uri);

  // Close the Mongoose connection on Control+C
  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose default connection disconnected.');
      process.exit(0);
    });
  });
};
