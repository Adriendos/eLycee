app.controller('SinglePostCtrl',
  ['$scope','ENTITY', 'DataAccess', '$routeParams',
	function($scope, ENTITY, DataAccess, $routeParams) {
      DataAccess.getDataById(ENTITY.post, $routeParams.id).then(
          function(post) {
              console.log(post);
            $scope.post = post;
          }
      );
}]);