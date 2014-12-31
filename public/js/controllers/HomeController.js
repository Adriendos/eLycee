app.controller('HomeController',['$scope', 'posts',
    function($scope, posts) {
    var self = this;


    $scope.posts = posts;

    $(document).ready(function(){
        $('.ui.dropdown').dropdown();
    });
}]);