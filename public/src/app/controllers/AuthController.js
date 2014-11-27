app.factory('auth', function($http) {

  var userInfos,
  urlBase = 'api/v1/auth',
  auth    = {};

  auth.login = function(userInfos) {
    console.log(userInfos);
    var request = {
      method: 'POST', 
      url: urlBase+'/login', 
      data: userInfos 
      // headers: { 'Content-Type' : 'application/x-www-form-urlencoded' }
    };

    return $http(request).success(
      function(data, status, headers, config) {
        console.log(data);
      }).error(
      function(data, status, headers, config) {
        console.log(data);
      });
  };

  return auth;
});

app.controller('ConnexionController', ['$scope', 'auth', function($scope, auth) {

  $scope.login = function() {

    auth.login($scope.userInfos);z
  };

}]);


