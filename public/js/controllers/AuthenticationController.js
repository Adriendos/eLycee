app.controller('AuthenticationController', ['$scope', 'SessionService', function($scope, SessionService) {
  $('.ui.checkbox')
      .checkbox()
  ;

  $scope.login = function() {
    if($('#rememberme').hasClass('checked')) {
      $scope.userInfos.rememberme = true;
    }
    SessionService.login($scope.userInfos);
  };
}]);