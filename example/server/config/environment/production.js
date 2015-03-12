var
  productionConfig = {
    env: process.env.NODE_ENV,
    hostname: null,

    mongo: {
      uri: process.env.MONGOLAB_URI
    },

    sessionSecret: 'FILL_IN_THIS_SECRET'
  };

/** @param {Constructor} module.exports - Export development config. */
module.exports = productionConfig;
