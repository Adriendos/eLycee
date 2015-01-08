app.controller('AuthenticationCtrl', ['$scope', 'SessionService', function($scope, SessionService) {
  $scope.login = function() {
    if($('#rememberme').hasClass('checked')) {
      $scope.userInfos.rememberme = true;
    }
    SessionService.login($scope.userInfos);
  };
}]);