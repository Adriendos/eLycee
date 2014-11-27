app.directive('spinner', ['$rootScope', function($rootScope) {
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
		}
	}
}]);