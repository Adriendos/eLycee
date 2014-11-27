app.controller('MainController', ['$scope', '$location', 'growl', function($scope, $location, growl) {
	$scope.showConnectModal = function() {
		$('#connexionPopUp').modal('show');
	};

  $scope.showSidebar = function() {
    $('.left.vertical.sidebar').first().sidebar('attach events', '.launch.button', 'show');
  };
	
  $scope.isActive = function (viewLocation) { 
    return viewLocation === $location.path();
  };

  $scope.isAdmin = function() {
  	return ($location.path() == '/admin' || $location.path() == '/admin/*');
  };

  $scope.notify = function(message, level) {
    switch(level) {
      case 'error':
        growl.error(message, {title: message});
      break;

      case 'success':
        growl.success(message, {title: message});
      break;

      case 'info':
        growl.info(message, {title: message});
      break;

      case 'warning':
        growl.warning(message, {title: message});
      break;

      default:
        growl.info(message, {title: message});
      ;
    }
  };
}]);