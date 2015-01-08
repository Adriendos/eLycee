app.controller('SinglePostCtrl',
  ['$scope','ENTITY', 'DataAccess', '$routeParams',
	function($scope, ENTITY, DataAccess, $routeParams) {
      DataAccess.getDataById(ENTITY.post, $routeParams.id).then(
          function(post) {

            DataAccess.getDataById(ENTITY.user, post.id).then(function(author) {
                $scope.author = author;
            });

            DataAccess.getAllData(ENTITY.comment, post.id).then(
                function(comments) {
                    $scope.post = post;
                    $scope.post.comments = comments;
                });
          }
      );
}]);