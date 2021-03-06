app.controller('SinglePostCtrl',
  ['$scope','ENTITY', 'DataAccess', '$routeParams',
	function($scope, ENTITY, DataAccess, $routeParams) {
      $('.ui.dropdown').dropdown();
      DataAccess.getDataById(ENTITY.post, $routeParams.id).then(
          function(post) {

            DataAccess.getDataById(ENTITY.user, post.user_id).then(function(author) {
                $scope.author = author;
            });

            DataAccess.getAllNestedData(ENTITY.comment, post.id).then(
                function(comments) {
                    $scope.post = post;
                    $scope.post.comments = comments;
                });
          }
      );

        $scope.reloadComments = function() {
            DataAccess.getAllNestedData(ENTITY.comment, $scope.post.id).then(
                function(comments) {
                    $scope.post.comments = comments;
                });
        };

        $scope.buildLink = function(id) {
            return 'http://elycee.creativecode.fr/#/post/'+id;
        }
}]);