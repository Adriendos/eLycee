app.controller('RootCtrl', ['$scope', '$location', 'SessionService',
  function($scope, $location, SessionService) {
    $scope.showConnectModal = function() {
  		$('#connexionPopUp').modal('show');
      $('.ui.checkbox').checkbox('check');
  	};

    $scope.showAdminSidebar = function() {
      $('.bottom.sidebar').sidebar('toggle');
    };
  	
    $scope.isActive = function (viewLocation) { 
      return viewLocation === $location.path();
    };

    $scope.isAdmin = function() {
      if($location.path().indexOf('/admin') >= 0) {
        return true;
      } else {
        return false; 
      }
    };

    $scope.logout = function(){
      SessionService.logout();
    };

    $scope.go = function (path) {
      $location.path(path);
    };

    $scope.checkUserProfile = function() {
      return user.profile;
    };

    $scope.isLoggedUser = function() {
      return SessionService.isLoggedUser();
    };

    $scope.isUserAdmin = function() {
     return SessionService.isUserAdmin();
    };

    $scope.isUserStudent = function() {
      return SessionService.isUserStudent();
    };

    $scope.getUserClass= function() {
      if(SessionService.getUser().role == 'first_class') {
        return "1ere"
      } else {
        return "Terminale"
      }
    };

    $scope.getUser = function() {
      return SessionService.getUser();
    }

}]);