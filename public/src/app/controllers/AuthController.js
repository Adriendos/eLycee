app.controller('AuthController', ['$scope', '$sanitize', 'AuthFactory', function($scope, $sanitize, AuthFactory) {

  $scope.login = function() {
    AuthFactory.login($scope.userInfos);
  };
}]);


