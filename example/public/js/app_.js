/*
 * app_.js is the main application file, prior to being browserified.  Edits
 * should be made to it, but not the browserified app.js file.
 */

angular.element(document).ready(function() {
  angular.bootstrap(document, [appName]);
});