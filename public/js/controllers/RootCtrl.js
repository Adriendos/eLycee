app.controller('RootCtrl', ['$scope', '$location', 'SessionService', 'DataAccess', 'ENTITY','$rootScope',
  function($scope, $location, SessionService, DataAccess, ENTITY, $rootScope) {
    $('.ui.dropdown').dropdown();

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
      if(SessionService.SESS_INIT && SessionService.getUser().role == 'first_class') {
        return "Première";
      } else {
        if (SessionService.SESS_INIT) {
          return "Terminale";
        } else {
          return '';
        }
      }
    };

    $scope.getUser = function() {
      return SessionService.getUser();
    }

}]);