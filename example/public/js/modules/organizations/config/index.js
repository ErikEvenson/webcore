require('angular-route');

angular.module('organizations').config([
  '$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/organizations', {
        templateUrl: 'views/organizations/list.html'
      })
      .when('/organizations/create', {
        templateUrl: 'views/organizations/create.html'
      })
      .when('/organizations/:id', {
        templateUrl: 'views/organizations/view.html'
      })
      .when('/organizations/:id/edit', {
        templateUrl: 'views/organizations/edit.html'
      });
  }
]);
