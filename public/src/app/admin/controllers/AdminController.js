app.controller('AdminController', function($scope) {
  $http.get('api/v1/posts').
  success(function(data, status, headers, config) {
    $scope.allPosts = data;
    console.log(data);
  }).
  error(function(data, status, headers, config) {
    console.info('error => '+ status);
    console.log(config);
  });
});