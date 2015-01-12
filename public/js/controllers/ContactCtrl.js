app.controller('ContactCtrl', 
    ['$rootScope', '$scope','$http', '$sanitize', 'CONFIG', '$timeout',
    function($rootScope, $scope, $http, $sanitize, CONFIG, $timeout) {
        $('.ui.dropdown').dropdown();
        var apiUrl = CONFIG.apiUrl;

    	$scope.specialField = '';
        $scope.contact = {};
        $scope.result = 'hidden';
        $scope.resultMessage;
        $scope.isSending = false;

    	$scope.resetMessage = function() {
    		$scope.contact = {};
    	};	

        $scope.submit = function() { 
            if( $scope.specialField != '') return;
            $scope.isSending = true;

            $sanitize($scope.contact.firstname);
            $sanitize($scope.contact.lastname);
            $sanitize($scope.contact.email);
            $sanitize($scope.contact.object);
            $sanitize($scope.contact.formMessage);

            console.info('info log', $scope.contact);

            $http({
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                url: apiUrl + 'contact', // url api LARAVEL
                data: $scope.contact 
            }).success(function (result) {
                $scope.hasAnswer = true;
                $scope.isSending = false;
                $scope.returnMessage = 'Merci ' + $scope.contact.firstname;
            });
        };

        var flip = function() {
            var effects = ['flip up', 'flip right', 'flip down', 'flip left'];
            var rand = Math.floor((Math.random() * 3) + 1);
            $('.shape').shape();
            $('.shape').shape(effects[rand]).end();
            $timeout(flip, 2000);
        };

        $timeout(flip, 3000);



        //var flip = function() {
        //
        //    $timeout(flip, 3000);
        //}

        //$timeout(flip, 3000);

    }]);

