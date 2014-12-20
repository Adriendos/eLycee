app.controller('NewsController', ['postsFactory', '$scope', function(postsFactory, $scope) {
  $scope.posts;

    getAllPosts();

    function getAllPosts() {
        postsFactory.query().$promise.then(
          //success
          function(results) {
            $scope.posts = results[0];
          },
          //error
          function(err) {
            console.error(err);
          }
        );
    }
}]);