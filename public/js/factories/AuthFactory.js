// [TODO = implement sanitize to clean user inputs ]
app.factory('AuthFactory', ['$http', '$rootScope', '$sanitize', '$location',
  function($http, $rootScope, $sanitize, $location) {

    var userInfos,
    urlAuth = 'api/v1/auth',
    AuthFactory = {};

    AuthFactory.login = function(userInfos) {
      $http.get(urlAuth + '/token1').then(function(response) { // sanitize + token
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
            // __ [TODO] == stock user in local_storage

            // __ redirect user to appropriate role page
          })
          .error( function(data, status, headers, config) {
            $rootScope.notify('Erreur d\' identifiants, veuillez réessayer.','error');
            console.log(data);
          });
      });
    };

    AuthFactory.logout = function() {
      $http.get(urlAuth + '/logout').then(function(response) {
        $rootScope.notify('Vous vous etes correctement deconnecté.','success');
        console.log(response);
      });
    };

    // __ [TODO]
    AuthFactory.checkUser = function() {
      
    };

    return AuthFactory;
}]);