app.controller('AdminCtrl', ['$scope', 'AuthFactory',
	function($scope, AuthFactory) {
		$('.ui.modal').modal();
		$('.ui.dropdown').dropdown({
          action: 'nothing'
        });
	}]);