app.controller('HomeController',['postsFactory', '$scope', function(postsFactory, $scope) {
    postsFactory.resource.query().$promise.then(
            //success
            function(results) {
              // console.log(results);
              $scope.posts = results[0];
            },
            //error
            function(err) {
              console.error(err);
            }
          );;
}]);