app.controller('HomeCtrl',['$scope', 'DataAccess', 'ENTITY','tweetsWidgetService',
    function($scope, DataAccess, ENTITY, tweetsWidgetService) {

        DataAccess.getAllData(ENTITY.post).then(
            function(posts) {
               $scope.posts = posts;
            }
        );

        tweetsWidgetService.destroyAllWidgets();
        tweetsWidgetService.loadAllWidgets();

    $(document).ready(function(){
        $('.ui.dropdown').dropdown();
    });
}]);