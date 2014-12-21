app.controller('NewsController', ['PostsFactory', '$scope', function(PostsFactory, $scope) {
  PostsFactory.getAllPosts().then(function(posts) {
    $scope.posts = posts;
  });
}]);