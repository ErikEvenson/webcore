require('angular-resource');
require('angular-route');

angular.module('organizations').factory('Organizations', [
  '$resource',
  function($resource) {
    return $resource(
      'api/organizations/:id',
      { id: '@_id' },
      { update: { method: 'PUT' } }
    );
  }
]);

angular.module('organizations').controller('OrganizationsController', [
  '$scope', '$routeParams', '$location', 'Authentication', 'Organizations',
  function($scope, $routeParams, $location, Authentication, Organizations) {
    $scope.authentication = Authentication;

    $scope.create = function() {
      var organization = new Organizations({
        name: this.name,
        notes: this.notes
      });

      organization.$save(
        function(response) {
          $location.path('organizations/' + response._id);
        },
        function(errorResponse) {
          $scope.error = errorResponse.data.message;
        }
      );
    };

    // $scope.delete = TBD

    $scope.find = function() {
      $scope.organizations = Organizations.query();
    };

    $scope.findOne = function() {
      $scope.organization = Organizations.get({
        id: $routeParams.id
      });
    };

    // $scope.update = TBD
  }
]);
