/*
 * app_.js is the main application file, prior to being browserified.  Edits
 * should be made to it, but not the browserified app.js file.
 */
var appName = 'app';

var appModule = angular.module(appName, ['example', 'templates']);

require('./templates/templates');
require('./example.js');

angular.element(document).ready(function() {
  angular.bootstrap(document, [appName]);
});
