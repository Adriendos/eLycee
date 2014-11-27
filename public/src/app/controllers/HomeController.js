app.controller('HomeController',['postsFactory', '$scope', function(postsFactory, $scope) {
    $scope.posts;

    getAllPosts();

    function getAllPosts() {
      postsFactory.getAllPosts()
        .success(function (posts) {
            $scope.posts = posts;
        })
        .error(function (error) {
            $scope.status = 'Unable to load post data: ' + error.message;
        });
    }
}]);