app.factory('AuthFactory', function($http) {

  var userInfos,
  urlBase = 'api/v1/auth',
  auth    = {};

  auth.login = function(userInfos) {
    var request = {
      method: 'POST', 
      url: urlBase+'/login', 
      data: userInfos 
    };

    return $http(request)
    .success(
      function(data, status, headers, config) {
        // __ [TODO]
        // response = user obj
      })
    .error(
      function(data, status, headers, config) {
        console.log(headers);
      });
  };

  // __ [TODO]
  auth.logout = function() {

  };

  // __ [TODO]
  auth.checkUser = function() {
    
  }

  return auth;
});