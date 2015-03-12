var
  stagingConfig = {
    env: process.env.NODE_ENV,
    hostname: 'blooming-forest-5734.herokuapp.com',

    mongo: {
      uri: process.env.MONGOLAB_URI
    },

    sessionSecret: 'FILL_IN_THIS_SECRET'
  };

/** @param {Constructor} module.exports - Export development config. */
module.exports = stagingConfig;
