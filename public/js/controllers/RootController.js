app.controller('RootController', ['$scope', '$location', 'SessionService', 'localStorageService', '$rootScope', '$http', 'CONFIG',
  function($scope, $location, SessionService, localStorageService, $rootScope, $http, CONFIG) {
  	$scope.showConnectModal = function() {
  		$('#connexionPopUp').modal('show');
  	};

    $scope.showAdminSidebar = function() {
      $('.bottom.sidebar').first().sidebar('toggle');
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
    
}]);  