app.controller('ProceedQcmController', [ '$scope', function($scope) {
    $scope.step = 1; //Initialize step to questions

    $scope.calculateScore = function() {
        $scope.step = 2;
        $scope.$digest();
    }
}]);