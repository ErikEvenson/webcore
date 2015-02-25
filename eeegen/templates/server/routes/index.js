/** @param {Function} module.exports - Set up routes. */
module.exports = function(app) {
  var
    express = require('express'),
    router = express.Router();

  // Insert routes below
  app.use('/api/organizations', require('../api/organization'));

  /* GET home page. */
  router.get('/*', function(req, res, next) {
    res.sendFile('public/index.html');
  });
};
