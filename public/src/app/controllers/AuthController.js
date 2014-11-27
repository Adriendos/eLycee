app.controller('ConnexionController', ['$scope', 'auth', function($scope, auth) {

  $scope.login = function() {
    auth.login($scope.userInfos);
  };

}]);


