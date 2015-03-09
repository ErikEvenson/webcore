/** @param {Object} app - The express app. */
module.exports = function(app) {
  app.service('OrganizationsService', ['$http', function($http) {
    this.fetch = function() {
      return $http.get('/api/organizations');
    };

    this.create = function(post) {
      return $http.post('/api/organizations', post);
    };
  }]);

  app.controller('OrganizationsController', ['$scope', 'OrganizationsService',
    function($scope, OrganizationsService) {
      $scope.addOrganization = function() {
        if ($scope.organizationNotes) {
          OrganizationsService.create({
            name: 'testorg',
            notes: $scope.organizationNotes
          }).success(function(post) {
            $scope.organizations.unshift(post);
            $scope.organizationNotes = null;
          });
        }
      };

      OrganizationsService.fetch()
        .success(function(organizations) {
          $scope.organizations = organizations;
        });
    }
  ]);
};
