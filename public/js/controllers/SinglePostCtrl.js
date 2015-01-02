app.controller('SinglePostCtrl',
  ['$scope','ENTITY', 'DataAccess', '$routeParams',
	function($scope, ENTITY, DataAccess, $routeParams) {

      DataAccess.getDataById(ENTITY.post, $routeParams.id).then(
          function(post) {
            $scope.post = post;
          }
      );
}]);