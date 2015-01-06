app.controller('SinglePostCtrl',
  ['$scope','ENTITY', 'DataAccess', '$routeParams','tweetsWidgetService',
	function($scope, ENTITY, DataAccess, $routeParams, tweetsWidgetService) {

      DataAccess.getDataById(ENTITY.post, $routeParams.id).then(
          function(post) {
            $scope.post = post;
          }
      );
      tweetsWidgetService.destroyAllWidgets();
      tweetsWidgetService.loadAllWidgets();
}]);