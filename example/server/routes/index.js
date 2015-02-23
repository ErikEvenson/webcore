/**
 * Application routes.
*/

var
  express = require('express'),
  router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('public/index.html');
});

/** @param {Constructor} module.exports - Export router. */
module.exports = router;
