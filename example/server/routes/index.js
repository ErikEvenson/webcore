/**
 * @param {Object} app - The application instance.
 * @return {Object} router -- The router.
 */
module.exports = function(app) {
  var
    express = require('express'),
    path = require('path'),
    router = express.Router();

  // Serve static assets
  app.use(express.static(path.join(app.get('basepath'), '..', 'public')));

  // Insert routes below
  app.use('/api/organizations', require('../api/organizations'));

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.sendFile(app.get('basepath') + '/layouts/index.html');
  });

  return router;
};
