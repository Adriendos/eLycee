app.controller('AdminCtrl', ['$scope', 'AuthFactory',
	function($scope, AuthFactory) {
		$('.ui.modal').modal();
		$('.ui.dropdown').dropdown();
		// $('#user-btn').dropdown({
		// 	onChange: function(val, html) {
		// 		console.info('cal', val);
		// 		console.info('html ', html);
		// 	}
		// });
	}]);