app.controller('MainController', ['$scope', '$location', 'AuthFactory',  
  function($scope, $location, AuthFactory) {
  	$scope.showConnectModal = function() {
  		$('#connexionPopUp').modal('show');
  	};

    $scope.showAdminSidebar = function() {
      $('.left.vertical.sidebar').first().sidebar('toggle');
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