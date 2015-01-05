'use strict';

// Development specific configuration
// ==================================
module.exports = {
  hostname: 'localhost',
  
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/example-dev'
  },

  seedDB: false
};
