app.controller('AdminController', ['$scope', 'AuthFactory', 
	function($scope, AuthFactory) {
		// @@@@ [todo]
		AuthFactory.checkSession();
}]);