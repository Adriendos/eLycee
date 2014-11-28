app.controller('AuthController', ['$scope', 'AuthFactory', function($scope, AuthFactory) {
 
  $scope.authenticate = function() {

  	$sanitize($scope.userInfos.username);
  	$sanitize($scope.userInfos.password);
  	$scope.userInfos._token = '(sthdkl,dqmlsdqmq)';
  	console.log($scope.userInfos);

    // AuthFactory.login($scope.userInfos);
  };
}]);


