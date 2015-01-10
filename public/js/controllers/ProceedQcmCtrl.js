app.controller('ProceedQcmCtrl', [ '$scope', '$routeParams', 'DataAccess', 'ENTITY', 'SessionService', '$rootScope',
    function($scope, $routeParams, DataAccess, ENTITY, SessionService, $rootScope) {
        $scope.step = 1; //Initialize step to questions
        $scope.qcm;

        $scope.calculateScore = function() {
            var score = 0;
            var correctAnswers = 0;
            angular.forEach($scope.qcm.questions, function(question){
                angular.forEach(question.answers, function(answer) {
                    if(answer.status == 1) {
                        correctAnswers ++;
                       if($('#answer'+answer.id).hasClass('checked')) {
                           score++;
                       }
                    } else {
                        if($('#answer'+answer.id).hasClass('checked')) {
                            score--;
                        }
                    }
                });
            });
            if($scope.score < 0) $scope.score = 0;
            $scope.score = Math.round((score/correctAnswers)*100);
            DataAccess.create(ENTITY.score, { score: $scope.score, user_id: SessionService.getUser().id, qcm_id:$scope.qcm.id}).then(function(data) {
                $scope.step = 2;
                $rootScope.$emit('completeQcm');
            });
        };

        DataAccess.getDataById(ENTITY.qcm, $routeParams.id).then(
            function(qcm) {
                $scope.qcm = qcm;
                $('.loading').removeClass('loading');
                $scope.$on('onRepeatLast', function() {
                    angular.forEach($scope.qcm.questions, function(question){
                        angular.forEach(question.answers, function(answer) {
                            $('#answer'+answer.id).checkbox();
                        });
                    });
                });
            }
        );




}]);