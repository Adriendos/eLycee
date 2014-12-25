app.controller('HomeController',['PostsFactory', '$scope', '$rootScope', function(PostsFactory, $scope, $rootScope) {
    PostsFactory.getPosts(10).then(function(posts) {
      $scope.posts = posts;
    });
}]);