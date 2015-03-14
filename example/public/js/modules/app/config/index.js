require('angular-route');

angular.module('app').config([
  '$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/view.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]);