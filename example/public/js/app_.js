/*
 * app_.js is the main application file, prior to being browserified.  Edits
 * should be made to it, but not the browserified app.js file.
 */
var appName = 'app';

var appModule = angular.module(
  appName,
  [
    'example',
    'ngRoute',
    'templates',
    'users',
  ]
);

require('angular-route');
require('./templates/templates');
require('./modules');

appModule.config([
  '$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function() {
  angular.bootstrap(document, [appName]);
});
