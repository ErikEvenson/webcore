var
  passport = require('passport'),
  path = require('path');

module.exports = function(app) {
  var
    users = require(path.join(app.get('basepath'), 'controllers/users'));

  app.route('/signup')
    .get(users.renderSignup)
    .post(users.signup);

  app.route('/signin')
    .get(users.renderSignin)
    .post(passport.authenticate(
      'local',
      {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true
      }
    ));

  app.get('/signout', users.signout);
};
