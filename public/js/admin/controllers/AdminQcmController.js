app.controller('AdminQcmController',
    ['$scope', 'QcmsFactory', 'FileUploader',
        function($scope, QcmsFactory, FileUploader) {

            $scope.qcms;
            $scope.modal = [];

            // Getting all qcms
            QcmsFactory.getAllQcms().then(function(qcms) {
                console.log(qcms);
                $scope.qcms = qcms;
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

            $scope.getLevel = function(level) {
                if( level == 'first_class') {
                    return 'Permiere';
                } else {
                    return 'Terminale';
                }
            }

        }]);