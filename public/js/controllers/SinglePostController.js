app.controller('PostController', 
  ['$scope', 'PostsFactory',
	function($scope, PostsFactory) {
    $scope.post = PostsFactory.getAllPosts();//replace par get by id
}]);