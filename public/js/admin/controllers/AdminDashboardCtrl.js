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
           var newsFeed;
           function _getDatasAndSetNumber(resourceName) { // set datas dynamicly
               DataAccess.getAllData(resourceName).then( function(data) {
                   $scope[resourceName] = data;

                   var nameNumber = resourceName + 'Number';
                   $scope[nameNumber] = Object.keys(data).length - 2; // prop promises
                   if(resourceName == 'users') return;
                   var tenFirsts = _.first(data, 10);
                   newsFeed = _.union($scope.newsFeed, tenFirsts);
                   newsFeed.sort(function (a, b) {
                       //Parsing timeStamps to dates
                       if (new Date(a.updated_at) > new Date(b.updated_at)) return -1;
                       if (new Date(a.updated_at) < new Date(b.updated_at)) return 1;
                       return 0;
                   });
                   $scope.newsFeed = newsFeed;
               });
           };



       }]);