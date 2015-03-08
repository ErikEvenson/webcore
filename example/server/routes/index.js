/**
 * @param {Object} app - The application instance.
 * @return {Object} router -- The router.
 */
module.exports = function(app) {
  var
    express = require('express'),
    router = express.Router();

  // Insert routes below
  app.use('/api/organizations', require('../api/organization'));

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.sendFile(app.get('basepath') + '/layouts/index.html');
  });

  return router;
};
