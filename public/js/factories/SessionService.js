app.factory('SessionService',
  ['$http', '$rootScope', '$sanitize', '$location', '$resource', 'localStorageService', 'csrfTokenService', 'CONFIG','$q',
  function($http, $rootScope, $sanitize, $location, $resource, localStorageService, csrfTokenService, CONFIG, $q) {
    //SINGLETON
    var userInfos,
    urlAuth = CONFIG.urlAuth,
    SessionService = {};
    
    //SESSION GLOBAL
    var SESS = {};
    SESS.logged = false;

    //TODO : Check token and initialize session

     
    SessionService.login = function(userInfos) {
      console.log('Login requested !'+userInfos);
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
            $rootScope.notify('Bonjour '+data.user.username+' !', 'info');
            localStorageService.set('credentials', data.token);
            SESS.user = data.user;
            SESS.logged = true;
            if(SESS.user.role.toLowerCase()=="teacher"){
              $location.path('/admin');
            }
            return;
            
          })
          .error( function(data, status, headers, config) {
            $rootScope.notify('Erreur d\' identifiants, veuillez réessayer.', 'error');
          });
        });
    };

    SessionService.getUser = function(){
      return SESS.user;
    };

    SessionService.isLoggedUser = function() {
      return SESS.logged;
    }

    SessionService.isUserAdmin = function() {
      if(SESS.logged && SESS.user.role.toLowerCase() == "teacher") {
        return true;
      } 
      return false;
    }

    //ERASE SESSION VARIABLE
    SessionService.logout = function() {
      console.log('logout');
      var token = localStorageService.get('credentials');
      var request = {
        method: "POST",
        url: urlAuth + '/logout', 
        params: {
          auth_token: token,
          _method: 'DELETE'
        }
      };
      $http(request).then(function(response) {
        SESS = {};
        SESS.logged = false;
        localStorageService.clearAll();
        return redirectNotMember();
      });
    };

    //A refaire
    function checkToken() {
      var token = localStorageService.get('credentials');
      console.log(token);
      var user = null;
      if(!token) {
        return user;      
      }

      var request = {
        method: "GET",
        url: CONFIG.urlAuth + '/checkSession', 
        params: {auth_token: token}
      };
      return $http(request)
        .success( function(data, status, headers, config) {
          console.log('successfully checked token');
        })
        .error( function(data, status, headers, config) {$
          localStorageService.clearAll();
        });
    };

    // private
    function redirectNotMember() {
      SESS = {};
      $location.path('/');
    };

    return SessionService;
}]);