/*
 * app_.js is the main application file, prior to being browserified.  Edits
 * should be made to it, but not the browserified app.js file.
 */
require('angular-route');
var appName = 'app';

var appModule = angular.module(
  appName,
  [
    'example',
    'ngRoute',
    'templates'
  ]
);

require('./templates/templates');
require('./example.js');
require('./config/routes');

appModule.config([
  '$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

angular.element(document).ready(function() {
  angular.bootstrap(document, [appName]);
});
