app.controller('AdminQcmController',
    ['$scope', 'PostsFactory', 'FileUploader',
        function($scope, PostsFactory, FileUploader) {

            $scope.posts;
            $scope.modal = [];

            // Getting all posts
            PostsFactory.getAllPosts().then(function(posts) {
                angular.forEach(posts, function (post) {
                    post.id = parseInt(post.id); //We parse the post.id so that we can sort the table
                });
                $scope.posts = posts;
            });

            // Variable for table sorting
            $scope.sort = {
                column: 'id',
                descending: false
            };

            // Check a post status
            $scope.publicationState = function(post) {
                if(post.status == 'published') {
                    return 'unlock blue';
                }
                return 'lock red';
            }

            // Function used to sort the table by clicking headers
            $scope.changeSorting = function($event, column) {
                var sort = $scope.sort;
                var th = $($event.currentTarget);
                if (sort.column == column) {
                    sort.descending = !sort.descending;
                    if(th.hasClass('ascending')) {
                        th.removeClass('ascending').addClass('descending');
                    } else {
                        th.removeClass('descending').addClass('ascending');
                    }
                } else {
                    $('th').removeClass('descending').removeClass('ascending');
                    $($event.currentTarget).addClass('ascending');
                    sort.column = column;
                    sort.descending = false;
                }
            };
;




        }]);