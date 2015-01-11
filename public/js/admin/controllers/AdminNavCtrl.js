app.controller('AdminNavCtrl', ['$scope', 
	function($scope) {
		$('.ui.dropdown').dropdown();
		$('#user-btn').dropdown({
            action: 'nothing'
        });
	}]);