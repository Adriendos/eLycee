app.controller('PostController', ['$scope', 'AuthFactory', 'postsFactory',
	function($scope, AuthFactory, postsFactory) {
		$scope.posts;
		postsFactory.resource.query().$promise.then(
            //success
            function(results) {
              // console.log(results);
              $scope.posts = results[0];
              console.log(results[0]);
            },
            //error
            function(err) {
              console.error(err);
            }
        );
		
		// check user rights
		AuthFactory.checkSession();
		$('.ui.modal').modal();
}]);