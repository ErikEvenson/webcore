var
  developmentConfig = {
    env: process.env.NODE_ENV,
    hostname: 'localhost'
  };

/** @param {Constructor} module.exports - Export development config. */
module.exports = developmentConfig;
