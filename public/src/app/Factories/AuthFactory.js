app.factory('AuthFactory', ['$http', '$rootScope', function($http, $rootScope) {

  var userInfos,
  urlBase = 'api/v1/auth',
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
        $rootScope.notify('Erreur d\' identifiants, veuillez réessayer.','error');
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