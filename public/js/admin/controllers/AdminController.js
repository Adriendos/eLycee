app.controller('AdminController', ['$scope', 'AuthFactory', 
	function($scope, AuthFactory) {
		console.log('AuthFactory');
	 	$scope.logout = function(){
	 		AuthFactory.logout();
	 		console.log('AuthFactory');
	 	};	
}]);