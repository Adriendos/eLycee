app.controller('AdminDashboardCtrl',
    ['$rootScope', '$scope', 'DataAccess', 'ENTITY', '$filter',
        function($rootScope, $scope, DataAccess, ENTITY, $filter) {
        	
            /**
             * init vars
             **/
            var resources = [ // app resources
                ENTITY.user, ENTITY.post, ENTITY.qcm, ENTITY.score
            ];

            $scope.newsFeed = [];

            for (var i = 0; i < resources.length; i++) {
                _getDatasAndSetNumber(resources[i]);
            };

            /**
             * private methods
             **/
            function _getDatasAndSetNumber(resourceName) { // set datas dynamicly
                DataAccess.getAllData(resourceName).then( function(data) {
                    $scope[resourceName] = data;

                    var nameNumber = resourceName + 'Number';
                    $scope[nameNumber] = Object.keys(data).length - 2; // prop promises
                    if(resourceName == 'users') return;
                    var tenFirsts = _.first(data, 10);
                    $scope.newsFeed = _.union($scope.newsFeed, tenFirsts);
                    $scope.newsFeed.sort(function (a, b) {
                        //Parsing timeStamps to dates
                        var t = a.updated_at.split(/[- :]/);
                        var t2 = b.updated_at.split(/[- :]/);
                        var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
                        console.log(d);

                        var d2 = new Date(t2[0], t2[1]-1, t2[2], t2[3], t2[4], t2[5]);
                        console.log(d2);

                        if (d < d2) return 1;
                        if (d2 < d) return -1;
                        return 0;
                    });
                });
            };
        }]);