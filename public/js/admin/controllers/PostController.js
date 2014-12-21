app.controller('PostController', ['$scope', 'AuthFactory', 'postsFactory',
	function($scope, AuthFactory, postsFactory) {
		console.log(postsFactory);
		// check user rights
		AuthFactory.checkSession();
		$('.ui.modal').modal();
}]);