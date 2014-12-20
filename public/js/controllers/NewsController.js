app.controller('NewsController', ['$http', '$location', '$scope', function($http, $location, $scope) {
  $scope.posts;

    getAllPosts();

    function getAllPosts() {
      postsFactory.query().success(function (posts) {
            $scope.posts = posts;
        })
        .error(function (error) {   
            $scope.notify('La requête vers le serveur a échoué... Réessayez.','error');
            $scope.status = 'Unable to load post data: ' + error.message;
        });;
      postsFactory.getAllPosts()
        
    }
}]);