/**
 * Main server application.
*/

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');
var app = express(__dirname);
var debug = require('debug')(__filename);
var passport = require('./config/passport')();

// Start listening
app.listen(app.get('port'), function() {
  debug('Node app is running at localhost:' + app.get('port'));
});

/** @param {Object} module.exports - Export application. */
module.exports = app;
