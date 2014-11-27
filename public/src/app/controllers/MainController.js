app.controller('MainController', ['$scope', '$location', function($scope, $location) {
	$scope.showConnectModal = function() {
		$('#connexionPopUp').modal('show');
	};
  $scope.isActive = function (viewLocation) { 
    return viewLocation === $location.path();
  };

  $scope.isAdmin = function() {
  	return ($location.path() == '/admin' || $location.path() == '/admin/*');
  }
}]);