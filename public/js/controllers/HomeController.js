app.controller('HomeController',['postsFactory', '$scope', function(postsFactory, $scope) {
    $scope.posts;

    getAllPosts();

    function getAllPosts() {
      postsFactory.query(
        function(posts) {
            $scope.posts = posts;
        },
        function(error) {   
            $scope.notify('La requête vers le serveur a échoué... Réessayez.','error');
            $scope.status = 'Unable to load post data: ' + error.message;
        }
      );
    }
}]);