app.controller('ContactCtrl', 
    ['$rootScope', '$scope','$http', '$sanitize', 'CONFIG',
    function($rootScope, $scope, $http, $sanitize, CONFIG) {

    var apiUrl = CONFIG.apiUrl;

	$scope.master = {}; // juste pour des test de recuperation de données
	$scope.specialField = '';
	$scope.result = 'hidden';
    $scope.resultMessage;
    // $scope.contact; //formData pour stocker tous les elements du formulaireulaire

	$scope.$on('mapInitialized', function(event, map) {
	// TODO : do some nasty stuffs here ;)
	});


	$scope.resetMessage = function() {
		$scope.contact = {};
	};	

    $scope.resetMessage();

    $scope.submit = function() { 
        if( $scope.specialField != '') return;

        $sanitize($scope.contact.firstname);
        $sanitize($scope.contact.lastname);
        $sanitize($scope.contact.email);
        $sanitize($scope.contact.object);
        $sanitize($scope.contact.formMessage);

        console.info('contact', $scope.contact);

        $http({
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            url: apiUrl + 'contact', // url api LARAVEL
            data: $scope.contact 
        }).success(function (result) {
            $scope.hasAnswer = true;
            $scope.returnMessage = 'Merci ' + $scope.contact.firstname;
        });
    }
}]);

