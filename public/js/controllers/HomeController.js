app.controller('HomeController',['PostsFactory', '$scope', function(PostsFactory, $scope) {
    var self = this;

    PostsFactory.getPosts(10).then(function(posts) {
      $scope.posts = posts;
    });

    $(document).ready(function(){
        $('.ui.dropdown').dropdown();
    });
}]);