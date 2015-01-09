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
                console.log(qcm);

                //DataAccess.getAllData(ENTITY.question, qcm.id).then(
                //    function(questions) {
                //        _.each(questions, function(question) {
                //            DataAccess.getAllData(ENTITY.answer, question.id).then(
                //                function(answers) {
                //                    console.log(answers);
                //                    question.answers = answers;
                //                }
                //            );
                //        })
                //        $scope.qcm.questions = questions;
                //        $('.loading').removeClass('loading');
                //        console.log($scope.qcm);
                //    }
                //)

            }
        );


}]);