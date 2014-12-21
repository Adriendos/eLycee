app.controller('NewsController', ['PostsFactory', '$scope', function(PostsFactory, $scope) {
  PostsFactory.getPosts(4).then(function(posts) {
    $scope.posts = posts;
  });
}]);