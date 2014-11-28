app.directive('spinner', ['$rootScope', '$http', function($rootScope, $http) {
	return {
		link: function(scope, element, attrs) {
			$(element).hide();
			console.log('show spinner');

			$rootScope.$on('$routeChangeStart', function() {
				$(element).fadeIn();
				console.log('show spinner');
			});

			$rootScope.$on('$routeChangeSuccess', function() {
				$(element).fadeOut('slow');
				console.log('hide spinner');
			});

			scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

            scope.$watch(scope.isLoading, function (v)
            {
                if(v){
                    $(element).fadeIn();
                }else{
                    $(element).fadeOut('slow');
                }
            });
		}
	}
}]);
