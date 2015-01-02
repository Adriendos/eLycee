app.controller('NewsCtrl', ['$scope', 'ENTITY', 'DataAccess',
function($scope, ENTITY, DataAccess) {
    DataAccess.getAllData(ENTITY.post).then(
        function(posts) {
          $scope.posts = posts;
        }
    );
}]);