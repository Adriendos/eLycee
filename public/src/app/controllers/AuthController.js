app.controller('AuthController', ['$scope', 'AuthFactory', function($scope, AuthFactory) {
 
  $scope.authenticate = function() {

  	console.log($scope.userInfos);
  	console.log(AuthFactory.sanitizeCredentialsAndAddCsrf($scope.userInfos));

    AuthFactory.login(AuthFactory.sanitizeCredentialsAndAddCsrf($scope.userInfos));
  };

}]);


