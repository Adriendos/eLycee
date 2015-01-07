app.controller('ProceedQcmCtrl', [ '$scope', '$routeParams', 'DataAccess', 'ENTITY',
    function($scope, $routeParams, DataAccess, ENTITY) {
        $scope.step = 1; //Initialize step to questions
        $scope.qcm;

        $scope.calculateScore = function() {
            $scope.step = 2;
            $scope.$digest();
        };

        DataAccess.getDataById(ENTITY.qcm, $routeParams.id).then(
            function(qcm) {
                $scope.qcm = qcm;

                DataAccess.getAllData(ENTITY.question, qcm.id).then(
                    function(questions) {
                        console.log('yesss',questions);
                    }
                )

            }
        );


}]);