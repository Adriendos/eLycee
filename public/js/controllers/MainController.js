app.controller('MainController', ['$scope', '$location', 'AuthFactory',  
  function($scope, $location, growl, AuthFactory) {
  	$scope.showConnectModal = function() {
  		$('#connexionPopUp').modal('show');
  	};

    $scope.showAdminSidebar = function() {
      $('.left.vertical.sidebar').first().sidebar('attach events', '.launch.button', 'show');
    };
  	
    $scope.isActive = function (viewLocation) { 
      return viewLocation === $location.path();
    };

    $scope.isAdmin = function() {
    	return ($location.path() == '/admin' || $location.path() == '/admin/*');
    };

    $scope.logout = function(){
      AuthFactory.logout();
    };  
}]);