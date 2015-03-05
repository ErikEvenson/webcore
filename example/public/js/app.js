var app = angular.module('app', []);

app.controller('PeopleController', function($scope) {
  $scope.person = {
      name: 'John Doe',
      city: 'New York'
  };
});
