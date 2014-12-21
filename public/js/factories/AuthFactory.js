app.factory('AuthFactory', 
  ['$http', '$rootScope', '$sanitize', '$location', '$resource', 'localStorageService', 'csrfTokenService', 'CONFIG',
  function($http, $rootScope, $sanitize, $location, $resource, localStorageService, csrfTokenService, CONFIG) {

    var userInfos,
    urlAuth = CONFIG.urlAuth,
    AuthFactory = {};

    AuthFactory.login = function(userInfos) {
      csrfTokenService.get().then(function(csrfToken) {
        var request = { // __request users
          method : 'POST', 
          url    : urlAuth + '/login', 
          data   : {
            username : $sanitize( userInfos.username ),
            password : $sanitize( userInfos.password ),
            _token   : csrfToken
          } 
        };
        return $http(request)
          .success( function(data, status, headers, config) {
            $rootScope.notify('Vous vous etes correctement identifié.', 'success');
            localStorageService.set('credentials', data);
            $location.path('/admin');
          })
          .error( function(data, status, headers, config) {
            $rootScope.notify('Erreur d\' identifiants, veuillez réessayer.', 'error');
          });
        });
    };

    AuthFactory.logout = function() {
      var credLocalStorage = localStorageService.get('credentials'),
      sessionToken         = credLocalStorage.token,
      request              = {
        method: "POST",
        url: urlAuth + '/logout', 
        params: {
          auth_token: sessionToken,
          _method: 'DELETE'
        }
      };
      $http(request).then(function(response) {
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
        url: urlAuth + '/checkSession', 
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