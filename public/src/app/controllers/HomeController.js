app.controller('HomeController',['postsFactory', '$scope', 'growl', function(postsFactory, $scope, growl) {
    $scope.posts;

    getAllPosts();

    function getAllPosts() {
      postsFactory.getAllPosts()
        .success(function (posts) {
            $scope.posts = posts;
        })
        .error(function (error) {   
            $scope.notify('La requête vers le serveur a échoué... Réessayez.','error');
            $scope.status = 'Unable to load post data: ' + error.message;
        });
    }
}]);