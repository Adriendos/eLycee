app.controller('HomeController',['postsFactory', '$scope', 'growl', function(postsFactory, $scope, growl) {
    $scope.posts;

    getAllPosts();

    function getAllPosts() {
      postsFactory.getAllPosts()
        .success(function (posts) {
            $scope.posts = posts;
        })
        .error(function (error) {   
            $scope.notify('test notifications, remettre bonne url dans factory','error');
            $scope.status = 'Unable to load post data: ' + error.message;
        });
    }
}]);