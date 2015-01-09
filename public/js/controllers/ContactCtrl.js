app.controller('ContactCtrl', 
    ['$scope','$http', '$sanitize', 'CONFIG',
    function($scope, $http, $sanitize, CONFIG) {

    var apiUrl = CONFIG.apiUrl;

	$scope.master = {}; // juste pour des test de recuperation de données
	$scope.specialField = '';
	$scope.result = 'hidden';
    $scope.resultMessage;
    $scope.contact; //formData pour stocker tous les elements du formulaire
    $scope.submitButtonDisabled = false;
    $scope.submitted = false;


	$scope.$on('mapInitialized', function(event, map) {
	// TODO : do some nasty stuffs here ;)
	});


	$scope.resetMessage = function() {
		$scope.contact = {};
	};	

    $scope.resetMessage();

    $scope.submit = function(contactform) { 
        
        $scope.submitted = true;
        $scope.submitButtonDisabled = true;
        if($scope.specialField == '') {
            if (contactform.$valid) {
                $http({
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    url: apiUrl + 'contact', // url api LARAVEL
                    data: $scope.contact // données à envoyer -> utiliser $sanitize()

                }).success(function (data) {

                    console.log(data);

                    if (data.success) {
                        $scope.submitButtonDisabled = true;
                        $scope.resultMessage = data.message;
                        $scope.result = 'ui segment inverted green';

                    } else {

                        $scope.submitButtonDisabled = false;
                        $scope.resultMessage = data.message;
                        $scope.result = 'ui segment inverted red';
                    }
                });

            } else {

                $scope.submitButtonDisabled = false;
                $scope.resultMessage = 'Erreur! Verifier toutes les infos.';
                $scope.result = 'ui segment inverted red';
            }
        }
    }
}]);

