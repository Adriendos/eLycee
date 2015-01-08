app.controller('SinglePostCtrl',
  ['$scope','ENTITY', 'DataAccess', '$routeParams',
	function($scope, ENTITY, DataAccess, $routeParams) {
        $(document).ready(function(){
            $('.ui.dropdown').dropdown();
        });

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

        $scope.reloadComments = function() {
            DataAccess.getAllData(ENTITY.comment, $scope.post.id).then(
                function(comments) {
                    $scope.post.comments = comments;
                });
        };
}]);