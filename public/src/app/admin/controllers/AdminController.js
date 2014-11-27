app.controller('AdminController',['$scope', function($scope) {
 	$scope.showSidebar = function() {
 		console.log('pigeon');
		$('.left.vertical.sidebar').first().sidebar('attach events', '.launch.button', 'show');
	};
}]);