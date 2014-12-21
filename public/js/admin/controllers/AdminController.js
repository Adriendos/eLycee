app.controller('AdminController', ['$scope', 'AuthFactory', 
	function($scope, AuthFactory) {
		// check user rights
		$scope.checkAuthorization();
		$('.ui.modal').modal();
}]);