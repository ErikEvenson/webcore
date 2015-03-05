var
  stagingConfig = {
    env: process.env.NODE_ENV,
    hostname: 'ancient-springs-6665.herokuapp.com',

    mongo: {
      uri: process.env.MONGOLAB_URI
    }

  };

/** @param {Constructor} module.exports - Export development config. */
module.exports = stagingConfig;
