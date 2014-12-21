app.controller('RootController', ['$scope', '$location', 'AuthFactory',  
  function($scope, $location, AuthFactory) {
  	$scope.showConnectModal = function() {
  		$('#connexionPopUp').modal('show');
  	};

    $scope.showAdminSidebar = function() {
      $('.bottom.horizontal.sidebar').first().sidebar('toggle');
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
}]);