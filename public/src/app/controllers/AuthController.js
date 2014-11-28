// app.controller('AuthController', ['$scope', 'AuthFactory', '$sanitize', function($scope, AuthFactory, $sanitize) {
app.controller('AuthController', ['$scope', '$sanitize', 'AuthFactory', function($scope, $sanitize, AuthFactory) {
 
  $scope.authenticate = function() {

  	$sanitize($scope.userInfos.username);
  	$sanitize($scope.userInfos.password);
  	$scope.userInfos._token = '(sthdkl,dqmlsdqmq)';
  	console.log($scope.userInfos);

    // AuthFactory.login($scope.userInfos);
  };
}]);


