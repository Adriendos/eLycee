
app.controller('HomeController',['PostsFactory', '$scope', function(PostsFactory, $scope) {
  PostsFactory.getPosts(10).then(function(posts) {
    $scope.posts = posts;
  });
}]);