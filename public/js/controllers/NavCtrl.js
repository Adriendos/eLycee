app.controller('NavCtrl', ['$scope', 'DataAccess', 'ENTITY', 'SessionService', '$rootScope',
    function($scope, DataAccess, ENTITY, SessionService, $rootScope){
        $('.ui.dropdown').dropdown();
        $('#user-btn').dropdown({
            action: 'nothing'
        });

        init();
        function init() {
            $scope.$watch(function(){
                return SessionService.SESS_INIT;
            }, function (newValue) {
                if (newValue == true) {
                    DataAccess.getAllData(ENTITY.qcm).then(
                        function (qcms) {
                            var allQcms = qcms;
                            var userRole = SessionService.getUser().role;
                            var userId = SessionService.getUser().id;
                            var classQcms = _.filter(allQcms, function (item) {
                                return item.class_level == userRole
                            });
                            DataAccess.getAllData(ENTITY.score).then(
                                function (scores) {
                                    var userScores = _.filter(scores, function (item) {
                                        return item.user_id == userId
                                    });
                                    $('.loading').toggleClass('loading');
                                    $scope.userPendingsQcms = classQcms.length - userScores.length;
                                }
                            );

                        }
                    );
                }
            });
        }

        $rootScope.$on('completeQcm', function() {
            init();
        });

    }
]);
