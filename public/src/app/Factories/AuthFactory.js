// [TODO = implement sanitize to clean user inputs ]
// app.factory('AuthFactory', ['$http', '$rootScope', '$sanitize', function($http, $rootScope, $sanitize) {
app.factory('AuthFactory', ['$http', '$rootScope', '$sanitize', 'CONFIG', function($http, $rootScope, $sanitize, CONFIG) {

  var userInfos,
  urlAuth = CONFIG.BASE_API_URL + '/auth',
  AuthFactory = {};

  AuthFactory.login = function(userInfos) {

    // __treatment userInfos + add token
    // postInfos = this.sanitizeCredentialsAndAddCsrf(userInfos);
    
    var request = { // __request users
      method: 'POST', 
      url: urlAuth + '/login', 
      data: userInfos 
    };

    return $http(request).success(
      function(data, status, headers, config) {
        $rootScope.notify('Vous vous etes correctement identifié.','success');
        // __ stock user in local_storage
      }).error(
      function(data, status, headers, config) {
        $rootScope.notify('Erreur d\' identifiants, veuillez réessayer.','error');
      });
  };

  AuthFactory.sanitizeCredentialsAndAddCsrf = function(userInfos) {
    // get csrf token and inject it

    $http.get(urlAuth + '/token').success(
      function(data, status, headers, config) {
        return {
          username : $sanitize( userInfos.username ),
          password : $sanitize( userInfos.password ),
          _token   : data
        };
      }).error(
      function(data, status, headers, config) {
        $rootScope.notify('Erreur token','error');
        return {
          username : $sanitize( userInfos.username ),
          password : $sanitize( userInfos.password ),
          _token   : data
        };
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