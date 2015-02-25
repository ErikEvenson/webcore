var
  developmentConfig = {
    env: process.env.NODE_ENV,
    hostname: 'localhost',

    mongo: {
      uri: 'mongodb://localhost/example-dev'
    }
  };

/** @param {Constructor} module.exports - Export development config. */
module.exports = developmentConfig;
