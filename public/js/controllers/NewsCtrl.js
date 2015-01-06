app.controller('NewsCtrl', ['$scope', 'ENTITY', 'DataAccess',
function($scope, ENTITY, DataAccess) {

    $scope.posts;
    $scope.modal = [];
    $scope.currentPage = 1;
    $scope.entity = ENTITY.post;

    DataAccess.getAllData(ENTITY.post).then(
        function(posts) {
            angular.forEach(posts, function (post) {
                post.id = parseInt(post.id); //We parse the post.id so that we can sort the table
            });
            $scope.allPosts = posts;
            $scope.posts = DataAccess.getPage($scope.allPosts, 1);
            $scope.nbPages = DataAccess.getNbPage(posts);
        }
    );
}]);