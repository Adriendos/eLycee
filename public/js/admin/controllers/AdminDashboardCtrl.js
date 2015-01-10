app.controller('AdminDashboardCtrl',
    ['$rootScope', '$scope', 'DataAccess', 'ENTITY', '$filter',
        function($rootScope, $scope, DataAccess, ENTITY, $filter) {

            $scope.newsFeed = [];

            //for (var i = 0; i < resources.length; i++) {
            //    _getDatasAndSetNumber(resources[i]);
            //};
            //
            //
            ////
            /////**
            //// * private methods
            //// **/
            ////var newsFeed;
            ////function _getDatasAndSetNumber(resourceName) { // set datas dynamicly
            ////    DataAccess.getAllData(resourceName).then( function(data) {
            ////        $scope[resourceName] = data;
            ////
            ////        var nameNumber = resourceName + 'Number';
            ////        $scope[nameNumber] = Object.keys(data).length - 2; // prop promises
            ////        if(resourceName == 'users') return;
            ////        var tenFirsts = _.first(data, 10);
            ////        newsFeed = _.union($scope.newsFeed, tenFirsts);
            ////        newsFeed.sort(function (a, b) {
            ////            //Parsing timeStamps to dates
            ////            if (new Date(a.updated_at) > new Date(b.updated_at)) return -1;
            ////            if (new Date(a.updated_at) < new Date(b.updated_at)) return 1;
            ////            return 0;
            ////        });
            ////        $scope.newsFeed = newsFeed;
            ////    });
            ////};

            var feed = [];
            DataAccess.getAllData(ENTITY.user).then(function(users) {
                $scope.users = users;
                $scope.usersNumber = Object.keys(users).length - 2; // prop promises

                DataAccess.getAllData(ENTITY.post).then(function(posts) {
                    $scope.posts = posts;
                    $scope.postsNumber = Object.keys(posts).length - 2; // prop promises
                    var tenFirsts = _.first(posts, 10);
                    feed = _.union(feed, tenFirsts);

                    DataAccess.getAllData(ENTITY.qcm).then(function(qcms) {
                        $scope.qcms = qcms;
                        $scope.qcmsNumber = Object.keys(qcms).length - 2; // prop promises
                        tenFirsts = _.first(qcms, 10);
                        feed = _.union(feed, tenFirsts);

                        DataAccess.getAllData(ENTITY.score).then(function(scores) {
                            $scope.scores = scores;
                            $scope.scoresNumber = Object.keys(scores).length - 2; // prop promises
                            tenFirsts = _.first(scores, 10);
                            feed = _.union(feed, tenFirsts);

                            initNewsFeed(feed);
                        });
                    });
                });
            });

            function initNewsFeed(feed) {
                _.each(feed, function(feed) {
                    if(feed.qcm_id) {
                        console.log('score');
                        feed.type = 'score';
                    } else {
                        if(!feed.excerpt) {
                            console.log('qcm');
                            feed.type = 'qcm';
                        } else {
                            console.log('post');
                            feed.type = 'post';
                        }
                    }
                });
                $scope.newsFeed = feed;
            };

        }]);