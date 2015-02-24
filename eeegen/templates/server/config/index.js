var
  all,
  _ = require('underscore');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations with extend this object.
all = {
  env: process.env.NODE_ENV,
  temp: 'all'
};

/** @param {Constructor} module.exports - Export combined config. */
module.exports = _.extend(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {}
);
