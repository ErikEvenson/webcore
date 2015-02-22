/**
 * Main server application.
*/

var
  debug = require('debug')(__filename),
  express = require('express'),
  path = require('path');

var
  app = express(),
  routes = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/', routes);

app.listen(app.get('port'), function() {
  debug('Node app is running at localhost:' + app.get('port'));
});

/** @param {Object} module.exports - Export application. */
module.exports = app;
