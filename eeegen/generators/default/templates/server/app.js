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
  forceSSL = require('./middleware/ssl').force(config.hostname);

var
  app,
  routes;

// Connect to the database
require('./lib/connection')(config);

// Create the server app
app = express();

// Set the server app basepath
app.set('basepath', __dirname);

// Add middleware
app.use(bodyParser.json());

if (config.env === 'production' || config.env === 'staging') {
  app.use(forceSSL);
}

// Set up the routes
routes = require('./routes')(app);

// Serve server routes
app.use('/', routes);

// Start listening
app.listen(app.get('port'), function() {
  debug('Node app is running at localhost:' + app.get('port'));
});

/** @param {Object} module.exports - Export application. */
module.exports = app;
