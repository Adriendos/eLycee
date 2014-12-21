app.controller('PostController', ['$scope', 'AuthFactory', 'PostsFactory',
	function($scope, AuthFactory, PostsFactory) {
		$scope.posts;
		PostsFactory.getAllPosts().then(function(posts) {
      $scope.posts = posts;
    });
		
		// check user rights
		AuthFactory.checkSession();
		$('.ui.modal').modal();
}]);