app.controller('DashboardController',['PostsFactory', '$scope', function(PostsFactory, $scope) {
	$('.ui.modal').modal();
  PostsFactory.getAllPosts().then(function(posts) {
  	// console.log(postArray.length());
   //  $scope.nbPosts = posts.size(); // marche po :(
  });
}]);