/**
 * @param {Object} app - The application instance.
 * @return {Object} router -- The router.
 */
module.exports = function(app) {
  var
    express = require('express'),
    path = require('path'),
    router = express.Router();

  /* GET home page. */
  app.get('/', function(req, res, next) {
    res.render('index', {
      title: 'Angular sandbox',
      user: req.user
    });
  });

  require('./users')(app);
  require('../api')(app);

  // router.get('/', function(req, res, next) {
  //   res.sendFile(app.get('basepath') + '/layouts/index.html');
  // });

  return router;
};
