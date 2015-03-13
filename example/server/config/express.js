var
  bodyParser = require('body-parser'),
  compress = require('compression'),
  debug = require('debug')(__filename),
  express = require('express'),
  flash = require('connect-flash'),
  morgan = require('morgan'),
  passport = require('passport'),
  path = require('path'),
  session = require('express-session');

/**
  * @param {String} basepath - Application basepath.
  * @return {Object} - Application.
  */
module.exports = function(basepath) {
  var app = express();

  // Set the server app basepath
  app.set('basepath', basepath);

  // Load environment config
  var config = require('./environment');

  // Connect to the database
  require('./database')(config);

  // Load models
  require(path.join(basepath, './models'));

  // Add middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  forceSSL = require(path.join(basepath, './middleware/ssl'))
    .force(config.hostname);

  if (config.env === 'production' || config.env === 'staging') {
    app.use(forceSSL);
  }

  if (config.env === 'development') {
    app.use(morgan('dev'));
  } else if (config.env === 'production' || config.env === 'staging') {
    app.use(compress());
  }

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));

  // Set up view engines
  app.set('views', path.join(basepath, './views'));
  app.set('view engine', 'jade');

  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  // Set up the routes
  var routes = require(path.join(basepath, './routes'))(app);

  // Serve server routes
  app.use('/', routes);

  // Serve static assets
  app.use(express.static(path.join(basepath, '../public')));

  return app;
};
