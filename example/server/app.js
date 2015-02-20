var 
  express = require('express'),
  path = require('path');

var
  app = express(),
  routes = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/', routes);

app.listen(app.get('port'), function() {
  console.log('Node app is running at localhost:' + app.get('port'));
});

module.exports = app;
