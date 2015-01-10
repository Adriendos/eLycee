app.controller('HomeCtrl',['$scope', 'DataAccess', 'ENTITY',
    function($scope, DataAccess, ENTITY) {

        DataAccess.getAllData(ENTITY.post).then(
            function(posts) {
                var allPosts = _.filter(posts, function(post) { return post.status == 'published'});



                $scope.firstPost = allPosts.shift();
                $scope.posts = allPosts;
                console.info('first', $scope.firstPost);
            }
        );

    $(document).ready(function(){
        $('.ui.dropdown').dropdown();
        
    });
}]);