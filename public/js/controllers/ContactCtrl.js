app.controller('ContactCtrl', 
    ['$scope','$http', 'CONFIG',
    function($scope,$http, CONFIG) {

    var apiUrl = CONFIG.apiUrl;

	$scope.master = {}; // juste pour des test de recuperation de données
	
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
        
        if (contactform.$valid){
            $http({

                method  : 'POST',
                url     : apiUrl + 'contact', // url api LARAVEL
                params    : $scope.contact,  // données à envoyer
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
            
            }).success(function(data){

                console.log(data);
                
                if (data.success){
                    $scope.submitButtonDisabled = true;
                    $scope.resultMessage = data.message;
                    $scope.result='ui segment inverted green';
                
                }else{
                
                    $scope.submitButtonDisabled = false;
                    $scope.resultMessage = data.message;
                    $scope.result='ui segment inverted red';
                }
            });

        }else{
    
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = 'Erreur :( Verifier toutes les infos.';
            $scope.result='ui segment inverted red';
        }
    }
}]);

