app.controller('HomeController',['PostsFactory', 'DataAccess' , '$scope', function(PostsFactory, DataAccess, $scope) {
    var self = this;

    PostsFactory.getPosts(10).then(function(posts) {
      $scope.posts = posts;
    });

    $(document).ready(function(){
        $('.ui.dropdown').dropdown();
    });
}]);