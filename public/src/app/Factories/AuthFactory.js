app.factory('AuthFactory', ['$http', function($http) {

  var userInfos,
  urlBase     = 'api/v1/auth',
  AuthFactory = {};

  AuthFactory.login = function(userInfos) {
    // console.parse(userInfos);
    var request = {
      method: 'POST', 
      url: urlBase+'/login', 
      data: userInfos 
    };
    // debugger();
    return $http(request).success(
      function(data, status, headers, config) {
        // __ [TODO]
        // response = user obj
      }).error(
      function(data, status, headers, config) {
        console.log('erreur d\' identifiants')
        // console.log(headers);
      });
  };

  // __ [TODO]
  AuthFactory.logout = function() {

  };

  // __ [TODO]
  AuthFactory.checkUser = function() {
    
  }

  return AuthFactory;
}]);