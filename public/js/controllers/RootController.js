app.controller('RootController', ['$scope', '$location', 'AuthFactory', 'localStorageService', '$rootScope', '$http', 'CONFIG',
  function($scope, $location, AuthFactory, localStorageService, $rootScope, $http, CONFIG) {
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
      AuthFactory.logout();
    };  

    $scope.go = function (path) {
      $location.path(path);
    };

    $scope.checkUserProfile = function() {
      return user.profile;
    };

    $scope.isLoggedUser = function() {
      if(getCredentials() != null) {
        return true;
      } else {
        return false;
      }
    };

    $scope.isUserAdmin = function() {
        var credLocalStorage = getCredentials();
        if(credLocalStorage && (credLocalStorage.user.role.toLowerCase() == "teacher")) {
          return true;
        }
        return false;
    };

    function getCredentials() {
      return localStorageService.get('credentials');
    }

    $scope.checkAuthorization = function() {
      if(!$scope.isUserAdmin()) {
         $rootScope.notify("Vous n'avez pas accès à cette section.", 'error');
          return AuthFactory.redirectNotMember(); 
      }
      return;
    }

    function checkSession() {
      var credLocalStorage = getCredentials();
      if(!credLocalStorage) {
        return false;      
      }

      var sessionToken = credLocalStorage.token;
      var request = {
        method: "GET",
        url: CONFIG.urlAuth + '/checkSession', 
        params: {auth_token: sessionToken}
      };
      var success= true;
      $http(request)
        .success( function(data, status, headers, config) {
         success = true;
        })
        .error( function(data, status, headers, config) {
          success =  false;
        });
        return success;
    };

}]);  