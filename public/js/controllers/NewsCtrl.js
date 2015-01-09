app.controller('NewsCtrl', ['$scope', 'ENTITY', 'DataAccess',
function($scope, ENTITY, DataAccess) {

    $scope.posts;
    $scope.modal = [];
    $scope.currentPage = 1;
    $scope.entity = ENTITY.post;

    DataAccess.getAllData(ENTITY.post).then(
        function(posts) {
            $scope.allPosts = _.filter(posts, function(post) { return post.status == 'published'});
            $scope.posts = DataAccess.getPage($scope.allPosts, 1);
            $scope.nbPages = DataAccess.getNbPage(posts);
            
            // console.info('date', new Date($scope.posts[0].created_at).getTime());
            // console.info('type date', typeof new Date($scope.posts[0].created_at).toISOString());
        }
    );
}]);