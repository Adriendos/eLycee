app.factory('AuthFactory', ['$http', '$rootScope', '$sanitize', '$location', '$resource', 'localStorageService', 
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
        $location.path('/');
      });
    };

    // check if user has right
    AuthFactory.checkUser = function() {
      
    };

    return AuthFactory;
}]);

app.factory('postsFactory', ['$http', '$resource', function($http, $resource) {
  return $resource(
        "api/v1/posts/:id",
        {id: "@id" },
        {
          query: {method: 'GET', isArray: true},
          get: {method: 'GET', params:{id:'@id'}, isArray: true},
          save: {method: 'POST', isArray: true}
        }
    );
}]);