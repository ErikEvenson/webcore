/**
 * @param {Object} app - The application instance.
 * @return {Object} router -- The router.
 */
module.exports = function(app) {
  var
    express = require('express'),
    router = express.Router();

  // Insert routes below
  app.use('/api/organizations', require('./organizations'));
  app.use('/api/users', require('./users'));

  return router;
};
