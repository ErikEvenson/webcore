/**
 * Application routes.
*/

var
  express = require('express'),
  router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Example' });
});

/** @param {Constructor} module.exports - Export router. */
module.exports = router;
