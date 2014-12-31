app.controller('NewsController', ['$scope','posts', function($scope, posts) {
  $scope.posts = posts;
}]);