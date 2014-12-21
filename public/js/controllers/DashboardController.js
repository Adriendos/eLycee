app.controller('DashboardController',['PostsFactory', '$scope', function(PostsFactory, $scope) {
 	 // check user rights
	$scope.checkAuthorization();
	$('.ui.modal').modal();
  PostsFactory.getAllPosts().then(function(posts) {
  	console.log(postArray.length());
    $scope.nbPosts = posts.size(); // marche po :(
  });
}]);