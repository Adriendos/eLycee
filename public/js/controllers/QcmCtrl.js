app.controller('QcmCtrl',['$scope', 'ENTITY', 'DataAccess', 'SessionService',
    function($scope, ENTITY, DataAccess, SessionService) {
    var self = this;
    var allQcms = {};
    var allScores = {};

    $scope.$watch(function(){
        return SessionService.SESS_INIT;
    }, function (newValue) {
        if(SessionService.SESS_INIT == true) {
            DataAccess.getAllData(ENTITY.qcm).then(
                function(qcms) {
                    allQcms = qcms;
                    $scope.user =  SessionService.getUser();
                    var classQcms = _.filter(allQcms, function(item){ return item.class_level == $scope.user.role });
                    $scope.availableQcms = [];
                    $scope.unavailableQcms = [];
                    DataAccess.getAllData(ENTITY.score).then(
                        function(scores) {
                            var averageScore = 0;
                            allScores = scores;
                            var userScores = _.filter(allScores, function(score){ return score.user_id == $scope.user.id });
                            if(userScores.length > 0) {
                                console.log('User has scores !');
                                console.log(userScores);
                                var totalScore = 0;
                                var nbScores = 0;
                                angular.forEach(userScores, function(score){
                                    totalScore= totalScore + score.score;
                                    nbScores ++;
                                });
                                averageScore = totalScore/nbScores;
                            }

                            console.log(averageScore);

                            $scope.averageScore = averageScore;
                            angular.forEach(classQcms, function(qcm) {
                                var score =_.find(scores, function(score){ return score.user_id == $scope.user.id && score.qcm_id == qcm.id ;});
                                if(score) {
                                    //unavailable qcm
                                    qcm.score = score.score;
                                    $scope.unavailableQcms.push(qcm);
                                } else {
                                    //available qcm
                                    $scope.availableQcms.push(qcm);
                                }
                            });
                            $('.loading').removeClass('loading');
                        }
                    );

                }
            );
        }
    });


    $scope.chartObject = {
        "type": "PieChart",
        "displayed": true,
        "data": {
            "cols": [
                {
                    "id": "month",
                    "label": "Month",
                    "type": "string",
                    "p": {}
                },
                {
                    "id": "laptop-id",
                    "label": "Laptop",
                    "type": "number",
                    "p": {}
                },
                {
                    "id": "desktop-id",
                    "label": "Desktop",
                    "type": "number",
                    "p": {}
                },
                {
                    "id": "server-id",
                    "label": "Server",
                    "type": "number",
                    "p": {}
                },
                {
                    "id": "cost-id",
                    "label": "Shipping",
                    "type": "number"
                }
            ],
            "rows": [
                {
                    "c": [
                        {
                            "v": "Bonnes réponses"
                        },
                        {
                            "v": 19,
                            "f": "42 items"
                        }
                    ]
                },
                {
                    "c": [
                        {
                            "v": "Mauvaises réponses"
                        },
                        {
                            "v": 13
                        }
                    ]
                }
            ]
        },
        "options": {
            "title": "Taux de réussite",
            "isStacked": "true",
            "fill": 20,
            "displayExactValues": true,
            "vAxis": {
                "title": "Sales unit",
                "gridlines": {
                    "count": 10
                }
            },
            "hAxis": {
                "title": "Date"
            }
        },
        "formatters": {}
    }

}]);