/**
 * Main server application.
*/

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var
  bodyParser = require('body-parser'),
  config = require('./config/environment'),
  debug = require('debug')(__filename),
  express = require('express'),
  forceSSL = require('./middleware/ssl').force(config.hostname),
  path = require('path');

var
  app,
  routes;

require('./lib/connection')(config);
app = express();
app.set('basepath', __dirname);
app.use(bodyParser.json());

// require('./config/express');
routes = require('./routes')(app);

// middleware
if (config.env === 'production' || config.env === 'staging') {
  app.use(forceSSL);
}

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
