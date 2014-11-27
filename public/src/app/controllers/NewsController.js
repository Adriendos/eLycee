app.controller('NewsController', ['$http', '$location', '$scope', function($http, $location, $scope) {
  $http.get('api/v1/posts').
    success(function(data, status, headers, config) {
      $scope.allPosts = data;
      console.log(data);
    }).
    error(function(data, status, headers, config) {
      console.info('error => '+ status);
      console.log(config);
    });
}]);