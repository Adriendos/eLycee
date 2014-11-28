app.controller('AuthController', ['$scope', 'AuthFactory', function($scope, AuthFactory) {
 
  $scope.authenticate = function() {

  	console.log($scope.userInfos);

    AuthFactory.login($scope.userInfos);
  };
}]);


