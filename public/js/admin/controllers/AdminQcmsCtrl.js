app.controller('AdminQcmsCtrl',
    ['$rootScope', '$scope', 'DataAccess', 'ENTITY', 'FileUploader', 'Utils',
        function($rootScope, $scope, DataAccess, ENTITY, FileUploader, Utils) {

            $scope.qcms;
            $scope.allQcms;
            $scope.modal = [];
            $scope.currentPage = 1;
            $scope.entity = ENTITY.qcm;
            $scope.currentQcm= {};


            $('.ui.modal').modal();
            init();
            function init() {
                DataAccess.getAllData(ENTITY.qcm).then(
                    function (qcms) {
                        angular.forEach(qcms, function (qcm) {
                            qcm.id = parseInt(qcm.id); //We parse the post.id so that we can sort the table
                        });
                        $scope.allQcms = qcms;
                        $scope.qcms = DataAccess.getPage($scope.allQcms, 1);
                        $scope.nbPages = DataAccess.getNbPage(qcms);
                    }
                );
            }

            // Variable for table sorting
            $scope.sort = {
                column: 'created_at',
                descending: true
            };

            // Check a post status
            $scope.publicationState = function(post) {
                if(post.status == 'published') {
                    return 'unlock blue';
                }
                return 'lock red';
            };

            // Function used to sort the table by clicking headers
            $scope.changeSorting = function($event, column) {

                var sort = $scope.sort;
                var th = $($event.currentTarget);

                if (sort.column == column) {
                    sort.descending = !sort.descending;
                    if(th.hasClass('ascending')) {
                        th.removeClass('ascending').addClass('descending');
                        $scope.allQcms = Utils.sortDescending($scope.allQcms, column);
                    } else {
                        th.removeClass('descending').addClass('ascending');
                        $scope.allQcms = Utils.sortAscending($scope.allQcms, column);
                    }
                } else {
                    $('th').removeClass('descending').removeClass('ascending');
                    $($event.currentTarget).addClass('ascending');
                    sort.column = column;
                    sort.descending = false;
                    $scope.allQcms = Utils.sortAscending($scope.allQcms, column);
                }
                $scope.qcms = DataAccess.getPage($scope.allQcms, 1);


            };

            $scope.getLevel = function(level) {
                if( level == 'first_class') {
                    return 'Permiere';
                } else {
                    return 'Terminale';
                }
            };

            $scope.deleteQcm = function() {
                DataAccess.delete(ENTITY.qcm, $scope.currentQcm.id).then(function() {
                    init();
                });
            };

            $scope.openDeleteQcmModal = function(qcm) {
                $scope.currentQcm = qcm;
                $('#deleteQcmModal').modal('show');
            };
        }]);