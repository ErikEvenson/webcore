/*
 * app_.js is the main application file, prior to being browserified.  Edits
 * should be made to it, but not the browserified app.js file.
 */
var appName = 'app';

var appModule = angular.module(
  appName,
  [
    'example',
    'ngResource',
    'ngRoute',
    'organizations',
    'templates',
    'users'
  ]
);

require('./templates/templates');
require('./modules');

angular.element(document).ready(function() {
  angular.bootstrap(document, [appName]);
});
