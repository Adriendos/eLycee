app.controller('AuthenticationController', ['$scope', 'SessionService', function($scope, SessionService) {
 
  $scope.login = function() {
    SessionService.login($scope.userInfos);
  };
}]);