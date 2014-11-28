// [TODO = implement sanitize to clean user inputs ]
// app.factory('AuthFactory', ['$http', '$rootScope', '$sanitize', function($http, $rootScope, $sanitize) {
app.factory('AuthFactory', ['$http', '$rootScope', function($http, $rootScope) {

  var userInfos,
  urlBase = 'api/v1/auth',
  AuthFactory = {};

  AuthFactory.login = function(userInfos) {
    
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
        console.log("ca a planté");     
        // console.log(headers);
      });
  };

  AuthFactory.sanitizeCredentialsAndAddCsrf = function(userInfos) {

  };

  // __ [TODO]
  AuthFactory.logout = function() {

  };

  // __ [TODO]
  AuthFactory.checkUser = function() {
    
  }

  return AuthFactory;
}]);