app.controller('ConnexionController', ['$scope', 'AuthFactory', function($scope, AuthFactory) {

  $scope.login = function() {
    AuthFactory.login($scope.userInfos);
  };
}]);


