app.controller('AdminController', ['$scope', 'AuthFactory', 
	function($scope, AuthFactory) {
		// check user rights
		AuthFactory.checkSession();
}]);