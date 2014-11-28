app.controller('AuthController', ['$scope', 'AuthFactory', function($scope, AuthFactory) {
 
  $scope.login = function() {
    AuthFactory.login($scope.userInfos);
  };
  $scope.logout = function() {
    AuthFactory.logout();
  };
}]);


