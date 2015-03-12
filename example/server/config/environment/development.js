var
  developmentConfig = {
    env: process.env.NODE_ENV,
    hostname: 'localhost',

    mongo: {
      uri: 'mongodb://localhost/example-dev'
    },

    sessionSecret: 'FILL_IN_THIS_SECRET'
  };

/** @param {Constructor} module.exports - Export development config. */
module.exports = developmentConfig;
