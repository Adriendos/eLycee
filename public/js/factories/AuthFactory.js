app.factory('AuthFactory', 
  ['$http', '$rootScope', '$sanitize', '$location', '$resource', 'localStorageService', 
  function($http, $rootScope, $sanitize, $location, $resource, localStorageService) {

    var userInfos,
    urlAuth = 'api/v1/auth',
    AuthFactory = {};

    AuthFactory.login = function(userInfos) {
      $http.get(urlAuth + '/csrfToken').then(function(response) { // sanitize + token
        var request = { // __request users
          method : 'POST', 
          url    : urlAuth + '/token', 
          data   : {
            username : $sanitize( userInfos.username ),
            password : $sanitize( userInfos.password ),
            _token   : response.data
          } 
        };

        return $http(request)
          .success( function(data, status, headers, config) {
            $rootScope.notify('Vous vous etes correctement identifié.','success');
            localStorageService.set('credentials', data);
            $location.path('/admin');
            // __ redirect user to appropriate role page
          })
          .error( function(data, status, headers, config) {
            $rootScope.notify('Erreur d\' identifiants, veuillez réessayer.','error');
          });
      });
    };

    AuthFactory.logout = function() {
      $http.get(urlAuth + '/logout').then(function(response) {
        $rootScope.notify('Vous vous etes correctement deconnecté.','success');
        return AuthFactory.redirectNotMember();
      });
    };

    // check if user has right
    AuthFactory.checkSession = function() {
      var credLocalStorage = localStorageService.get('credentials');
      if(!credLocalStorage) {
        $rootScope.notify('Veuillez vous connecter à l\' aide de vos infos', 'error');
        return AuthFactory.redirectNotMember();      
      }

      var sessionToken = credLocalStorage.token;
      var request = {
        method: "GET",
        url: urlAuth + '/token', 
        params: {auth_token: sessionToken}
      };
      $http(request)
          .success( function(data, status, headers, config) {
            return;
          })
          .error( function(data, status, headers, config) {
            return AuthFactory.redirectNotMember();  
          });
    };

    // private method
    AuthFactory.redirectNotMember = function() {
      $location.path('/');
      localStorageService.clearAll();
    };

    return AuthFactory;
}]);