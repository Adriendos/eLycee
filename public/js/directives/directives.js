app.directive('spinner', ['$rootScope', '$http', function($rootScope, $http) {
	return {
		link: function(scope, element, attrs) {
			scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

            scope.$watch(scope.isLoading, function (v)
            {
                if(v){
                    $(element).fadeIn('slow');
                }else{
                    $(element).fadeOut('slow');
                }
            });
		}
	}
}]);
