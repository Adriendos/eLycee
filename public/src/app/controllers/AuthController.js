app.factory('auth', function($http) {

  var userInfos,
  urlBase = 'api/v1/auth',
  auth    = {};

  auth.login = function(userInfos) {

    $http.post(urlBase+'/login', userInfos).
      success(function(data, status, headers, config) {
        console.log(data);
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
  };

  return auth;
});

app.controller('ConnexionController', ['$scope', 'auth', function($scope, auth) {

  $scope.login = function() {
    auth.login($scope.user);
  };

}]);


