app.controller('HomeCtrl',['$scope', 'DataAccess', 'ENTITY',
    function($scope, DataAccess, ENTITY) {

        DataAccess.getAllData(ENTITY.post).then(
            function(posts) {
               $scope.posts = posts;
            }
        );

    $(document).ready(function(){
        $('.ui.dropdown').dropdown();
    });
}]);