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
        }
    );
}]);