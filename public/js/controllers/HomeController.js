app.controller('HomeController',['postsFactory', '$scope', function(postsFactory, $scope) {
    $scope.posts = postsFactory.getAllPosts();
}]);