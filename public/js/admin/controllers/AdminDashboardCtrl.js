app.controller('AdminDashboardCtrl',
    ['$rootScope', '$scope', 'DataAccess', 'ENTITY', '$filter',
        function($rootScope, $scope, DataAccess, ENTITY, $filter) {

            $scope.newsFeed = [];

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
